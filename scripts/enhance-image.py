"""Upscale images 2x with EDSR super-resolution and give them an "OLED" grade.

    pip install opencv-contrib-python-headless pillow numpy
    curl -L -o EDSR_x2.pb https://github.com/Saafke/EDSR_Tensorflow/raw/master/models/EDSR_x2.pb
    EDSR_MODEL=EDSR_x2.pb python3 scripts/enhance-image.py src/assets/photos/new.webp

Edits files in place; transparency is preserved. Expect a few minutes per megapixel.
"""
import os
import sys
import time

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(os.environ.get("EDSR_MODEL", "EDSR_x2.pb"))
sr.setModel("edsr", 2)

def grade(rgb: Image.Image) -> Image.Image:
    """Deeper blacks, a gentle S-curve, +12% saturation and fine sharpening."""
    a = np.asarray(rgb).astype(np.float32) / 255
    a = np.clip((a - 0.03) / 0.97, 0, 1)            # lift the black point: deeper blacks
    a = a + 0.10 * (a - 0.5) * (1 - np.abs(2 * a - 1))  # gentle S-curve for contrast
    out = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))
    out = ImageEnhance.Color(out).enhance(1.12)
    return out.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2))

def upscale(src: str, dst: str, quality: int = 88) -> None:
    """Upscale `src` 2x, grade it and save it to `dst` as WebP."""
    t = time.time()
    im = Image.open(src)
    has_alpha = im.mode in ("RGBA", "LA")
    rgb = im.convert("RGB")
    up = Image.fromarray(cv2.cvtColor(sr.upsample(cv2.cvtColor(np.asarray(rgb), cv2.COLOR_RGB2BGR)), cv2.COLOR_BGR2RGB))
    up = grade(up)
    if has_alpha:
        alpha = im.getchannel("A").resize(up.size, Image.LANCZOS)
        up.putalpha(alpha)
    up.save(dst, "WEBP", quality=quality, method=6)
    print(f"{src} -> {up.size} in {time.time() - t:.0f}s", flush=True)

if __name__ == "__main__":
    for path in sys.argv[1:]:
        upscale(path, path)
