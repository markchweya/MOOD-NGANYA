#!/usr/bin/env python3
"""Build the 3D bus's side textures from MOOD's real paintwork.

The three-quarter photo shows one side of the cab (the door with its violet
clouds) and the front of the saloon (Lady Liberty, the NODE RUNNER key and the
art windows). Both are unwarped to real-world scale with a perspective
transform. No photo shows the rest of the saloon, so it is continued in the
same paint: soft-edged crops of the real airbrushed door clouds, with the
photographed art windows repeated along the window line.

Two textures come out, one per side, both with readable lettering:
  side-left.webp   the photographed side, exactly as shot (nose on the right)
  side-right.webp  the far side, cab mirrored, saloon art kept the right way round

Usage: scripts/build-side-livery.py
Needs: python3 with opencv-python and numpy.
"""

from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src/assets/photos/mood-front.webp"
OUT_DIR = ROOT / "src/assets/livery"

# Must match BUS in src/sections/garage/busGeometry.ts.
LENGTH_M = 7.4
BODY_BOTTOM_M = 0.45
ROOF_M = 3.0
PX_PER_M = 280

WIDTH = round(LENGTH_M * PX_PER_M)
HEIGHT = round((ROOF_M - BODY_BOTTOM_M) * PX_PER_M)

CAB_M = 1.75
REAR_AXLE_FROM_NOSE_M = 5.7
SALOON_PHOTO_M = 1.8
CAB_TOP_M, CAB_BOTTOM_M = 2.78, 0.7
WINDOW_TOP_M, WINDOW_BOTTOM_M = 3.0, 2.3


def rows(top_m: float, bottom_m: float) -> slice:
    """Texture rows between two heights above the ground (row 0 is the roof)."""
    return slice(round((ROOF_M - top_m) * PX_PER_M), round((ROOF_M - bottom_m) * PX_PER_M))


def metres(m: float) -> int:
    return round(m * PX_PER_M)


def unwarp(photo, quad, width, height):
    """Map a quadrilateral (TL, TR, BR, BL) in the photo onto a width x height rectangle."""
    target = np.float32([[0, 0], [width, 0], [width, height], [0, height]])
    matrix = cv2.getPerspectiveTransform(np.float32(quad), target)
    return cv2.warpPerspective(photo, matrix, (width, height), flags=cv2.INTER_LANCZOS4)


def photographed_parts(photo):
    """The cab side and saloon front, unwarped, nose on the right as in the photo."""
    cab = unwarp(
        photo,
        [(330, 1030), (735, 1010), (745, 2240), (325, 2240)],
        metres(CAB_M),
        metres(CAB_TOP_M - CAB_BOTTOM_M),
    )
    # The smiley wing mirror stands off the door in the photo, over the glass.
    # The 3D front cutout already carries it, so paint the door glass back in:
    # inside the mirror's box, everything above the window sill (a diagonal
    # on this door) becomes the glass's own colour; the paint below is kept.
    h, w = cab.shape[:2]
    glass = np.median(cab[int(h * 0.1) : int(h * 0.25), int(w * 0.2) : int(w * 0.4)].reshape(-1, 3), axis=0)
    ys, xs = np.mgrid[0:h, 0:w]
    u, v = xs / w, ys / h
    sill = 0.33 + (u - 0.14) * 0.27
    inside = (u <= 0.89) & (v >= 0.04) & (v < sill)
    weight = np.clip((u - 0.5) / 0.08, 0, 1) * inside
    cab[:] = (glass * weight[..., None] + cab * (1 - weight[..., None])).astype(np.uint8)

    saloon = unwarp(
        photo,
        [(0, 690), (330, 712), (330, 2262), (0, 2320)],
        metres(SALOON_PHOTO_M),
        HEIGHT,
    )
    return cab, saloon


def cloud_paint(cab, width, height, seed):
    """Continue the real airbrushed clouds: soft-edged crops of the cab door, stamped at random."""
    h, w = cab.shape[:2]
    # Below the window, clear of the door handle and the wheel arch.
    source = cab[int(h * 0.5) : int(h * 0.75), int(w * 0.2) : int(w * 0.95)].astype(np.float32)
    # The body's own purple shows between the clouds; take it from the door,
    # just below the window sill, where there is no cloud paint.
    base = np.median(cab[int(h * 0.44) : int(h * 0.49), int(w * 0.15) : int(w * 0.45)].reshape(-1, 3), axis=0)

    rng = np.random.default_rng(seed)
    canvas = np.empty((height, width, 3), np.float32)
    canvas[:] = base
    sh, sw = source.shape[:2]
    for _ in range(int(width * height / 7000)):
        ch, cw = int(rng.uniform(0.55, 0.95) * sh), int(rng.uniform(0.35, 0.7) * sw)
        y, x = rng.integers(0, sh - ch + 1), rng.integers(0, sw - cw + 1)
        stamp = source[y : y + ch, x : x + cw]
        if rng.random() < 0.5:
            stamp = stamp[:, ::-1]
        scale = rng.uniform(1.0, 1.8)
        stamp = cv2.resize(stamp, (int(cw * scale), int(ch * scale)), interpolation=cv2.INTER_CUBIC)
        sh2, sw2 = stamp.shape[:2]
        # A soft elliptical mask, so stamps melt into each other.
        yy, xx = np.mgrid[0:sh2, 0:sw2].astype(np.float32)
        alpha = (np.clip(1 - np.hypot((xx / sw2 - 0.5) * 2, (yy / sh2 - 0.5) * 2), 0, 1) ** 0.7)[..., None]
        top, left = rng.integers(-sh2 // 3, height - sh2 // 2), rng.integers(-sw2 // 3, width - sw2 // 2)
        y0, x0 = max(top, 0), max(left, 0)
        y1, x1 = min(top + sh2, height), min(left + sw2, width)
        if y1 <= y0 or x1 <= x0:
            continue
        piece = stamp[y0 - top : y1 - top, x0 - left : x1 - left]
        a = alpha[y0 - top : y1 - top, x0 - left : x1 - left]
        canvas[y0:y1, x0:x1] = piece * a + canvas[y0:y1, x0:x1] * (1 - a)
    return np.clip(canvas, 0, 255).astype(np.uint8)


def feather_into(dst, src, x, fade_left=True, blend=36):
    """Paste src at column x, cross-fading one edge into what is already there."""
    width = src.shape[1]
    alpha = np.ones((1, width, 1), np.float32)
    ramp = np.linspace(0, 1, blend, dtype=np.float32)
    if fade_left:
        alpha[0, :blend, 0] = ramp
    else:
        alpha[0, -blend:, 0] = ramp[::-1]
    region = dst[:, x : x + width].astype(np.float32)
    dst[:, x : x + width] = (src.astype(np.float32) * alpha + region * (1 - alpha)).astype(np.uint8)


def build(cab, saloon, nose_on_left: bool, seed: int):
    """One side panel. Laid out nose-on-left; flipped at the end for the other orientation."""
    side = cloud_paint(cab, WIDTH, HEIGHT, seed)

    # Cab at the nose. Its nose edge is on the right in the photo, so turn it
    # round for the nose-on-left layout (the cab carries no lettering).
    cab_layout = cv2.flip(cab, 1)
    purple = np.median(cab[5:25].reshape(-1, 3), axis=0).astype(np.uint8)
    side[rows(ROOF_M, CAB_TOP_M), : metres(CAB_M)] = purple
    side[rows(CAB_TOP_M, CAB_BOTTOM_M), : metres(CAB_M)] = cab_layout

    # Saloon front straight behind the cab. On the photographed side it must be
    # mirrored into this layout (and is mirrored back by the final flip, so it
    # ends up exactly as shot); on the far side it is kept as shot so its
    # lettering reads.
    saloon_layout = cv2.flip(saloon, 1) if not nose_on_left else saloon
    feather_into(side, saloon_layout, metres(CAB_M), fade_left=False)

    # The photographed art windows, repeated down the rest of the window line.
    windows = saloon_layout[rows(WINDOW_TOP_M, WINDOW_BOTTOM_M)]
    x = metres(CAB_M + SALOON_PHOTO_M)
    while x < WIDTH:
        width = min(windows.shape[1], WIDTH - x)
        side[rows(WINDOW_TOP_M, WINDOW_BOTTOM_M), x : x + width] = windows[:, :width]
        x += width

    # The rear wheel arch: no photo shows it, so it is the real front arch
    # (dark well with its purple lip), moved back to the rear axle.
    h, w = cab_layout.shape[:2]
    arch = cab_layout[int(h * 0.66) :, int(w * 0.42) :]
    arch_rows = rows(CAB_TOP_M - (CAB_TOP_M - CAB_BOTTOM_M) * 0.66, CAB_BOTTOM_M)
    centre = metres(REAR_AXLE_FROM_NOSE_M)
    x0 = centre - arch.shape[1] // 2
    yy, xx = np.mgrid[0 : arch.shape[0], 0 : arch.shape[1]].astype(np.float32)
    edge = np.minimum.reduce([xx, arch.shape[1] - 1 - xx, yy * 1.5]) / 40
    alpha = np.clip(edge, 0, 1)[..., None]
    region = side[arch_rows, x0 : x0 + arch.shape[1]].astype(np.float32)
    side[arch_rows, x0 : x0 + arch.shape[1]] = (arch * alpha + region * (1 - alpha)).astype(np.uint8)

    # Dark sill, as on the real body.
    sill = rows(BODY_BOTTOM_M + 0.12, BODY_BOTTOM_M)
    side[sill] = (side[sill] * 0.35).astype(np.uint8)

    return side if nose_on_left else cv2.flip(side, 1)


def main():
    photo = cv2.imread(str(SOURCE), cv2.IMREAD_COLOR)
    if photo is None:
        raise SystemExit(f"cannot read {SOURCE}")
    cab, saloon = photographed_parts(photo)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, nose_on_left, seed in (("side-left", False, 33), ("side-right", True, 34)):
        path = OUT_DIR / f"{name}.webp"
        cv2.imwrite(str(path), build(cab, saloon, nose_on_left, seed), [cv2.IMWRITE_WEBP_QUALITY, 88])
        print(f"wrote {path.relative_to(ROOT)} ({WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    main()
