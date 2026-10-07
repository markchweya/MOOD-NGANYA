import { CanvasTexture, SRGBColorSpace } from "three";
import {
  SMILEY_DEAD,
  SMILEY_FACE,
  SMILEY_MELTING,
  SMILEY_VIEWBOX,
} from "@/components/brand/smileyPaths";
import { BUS } from "./busGeometry";
import { C } from "./colours";

/**
 * MOOD's side panels, painted on a canvas. No photo shows the whole side, so
 * this is the livery redrawn from the brand: purple body, violet clouds, the
 * drippy smileys, the wordmark and the windows, laid out on the real panel
 * dimensions so it lines up with the modelled glass, doors and wheels.
 */

const PX_PER_M = 280;
const WIDTH = Math.round(BUS.length * PX_PER_M);
const PANEL_HEIGHT = BUS.roof - BUS.bodyBottom;
const HEIGHT = Math.round(PANEL_HEIGHT * PX_PER_M);

/** Canvas y for a height above the ground. */
const yAt = (metres: number) => (BUS.roof - metres) * PX_PER_M;

/** A tiny seeded generator so the painting is identical on every load. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function drawSmiley(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  variant: "dead" | "melting",
  tilt = 0,
) {
  const scale = height / SMILEY_VIEWBOX.height;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  ctx.scale(scale, scale);
  ctx.translate(-SMILEY_VIEWBOX.width / 2, -SMILEY_VIEWBOX.height / 2);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  const face = new Path2D(SMILEY_FACE);
  ctx.fillStyle = C.smiley;
  ctx.fill(face);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 3;
  ctx.stroke(face);
  if (variant === "dead") {
    ctx.lineWidth = 4.5;
    ctx.stroke(new Path2D(SMILEY_DEAD.eyes));
    ctx.stroke(new Path2D(SMILEY_DEAD.grin));
    const tongue = new Path2D(SMILEY_DEAD.tongue);
    ctx.fillStyle = C.atmosWhite;
    ctx.fill(tongue);
    ctx.lineWidth = 3;
    ctx.stroke(tongue);
  } else {
    ctx.fillStyle = C.ink;
    ctx.fill(new Path2D(SMILEY_MELTING.eyes));
    ctx.lineWidth = 5;
    ctx.stroke(new Path2D(SMILEY_MELTING.grin));
    ctx.lineWidth = 4;
    ctx.stroke(new Path2D(SMILEY_MELTING.dimples));
  }
  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function paint(ctx: CanvasRenderingContext2D, noseOnLeft: boolean) {
  /** Canvas x for a distance back from the nose. */
  const xAt = (fromNose: number) =>
    noseOnLeft ? fromNose * PX_PER_M : WIDTH - fromNose * PX_PER_M;
  const span = (from: number, to: number) =>
    [Math.min(xAt(from), xAt(to)), Math.abs(xAt(to) - xAt(from))] as const;
  const random = seeded(33);

  // Body paint: brighter at the shoulder, deeper towards the sills.
  const body = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  body.addColorStop(0, C.purpleGlow);
  body.addColorStop(0.45, C.moodPurple);
  body.addColorStop(1, "#4d0f63");
  ctx.fillStyle = body;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Violet clouds airbrushed over the lower panels.
  ctx.fillStyle = C.cloudViolet;
  for (let cloud = 0; cloud < 7; cloud++) {
    const cx = random() * WIDTH;
    const cy = yAt(0.9 + random() * 0.8);
    for (let puff = 0; puff < 6; puff++) {
      ctx.globalAlpha = 0.55 + random() * 0.3;
      ctx.beginPath();
      ctx.arc(
        cx + (random() - 0.5) * 260,
        cy + (random() - 0.5) * 90,
        40 + random() * 70,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // Liberty-teal brush strokes towards the tail.
  ctx.strokeStyle = C.libertyTeal;
  ctx.lineCap = "round";
  for (let stroke = 0; stroke < 4; stroke++) {
    const x0 = xAt(5.4 + stroke * 0.35);
    ctx.lineWidth = 18 - stroke * 3;
    ctx.beginPath();
    ctx.moveTo(x0, yAt(0.7));
    ctx.bezierCurveTo(x0 + 60, yAt(1.2), x0 - 40, yAt(1.5), x0 + 30, yAt(1.9));
    ctx.stroke();
  }

  // Window band: tinted glass with the saloon's LED glow along the bottom.
  for (const [from, to] of BUS.windows.panes) {
    const [x, w] = span(from, to);
    const top = yAt(BUS.windows.top);
    const h = yAt(BUS.windows.bottom) - top;
    const glass = ctx.createLinearGradient(0, top, 0, top + h);
    glass.addColorStop(0, "#07040b");
    glass.addColorStop(0.75, "#140a1f");
    glass.addColorStop(1, C.ledViolet);
    ctx.fillStyle = glass;
    roundRect(ctx, x, top, w, h, 22);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#1b0d24";
    ctx.stroke();
  }

  // Lilac drips running off the window line.
  ctx.fillStyle = C.dripLilac;
  for (let drip = 0; drip < 18; drip++) {
    const x = random() * WIDTH;
    const width = 10 + random() * 8;
    const length = 14 + random() ** 2 * 80;
    const top = yAt(BUS.windows.bottom) + 4;
    ctx.beginPath();
    ctx.roundRect(x, top - 6, width, length, width / 2);
    ctx.arc(x + width / 2, top + length - 4, width * 0.75, 0, Math.PI * 2);
    ctx.fill();
  }

  // Door seams and handle.
  const [doorX, doorW] = span(BUS.door[0], BUS.door[1]);
  ctx.strokeStyle = "rgba(20, 6, 26, 0.85)";
  ctx.lineWidth = 5;
  roundRect(ctx, doorX, yAt(2.82), doorW, yAt(BUS.bodyBottom + 0.05) - yAt(2.82), 18);
  ctx.stroke();
  ctx.fillStyle = "#d9d4e3";
  roundRect(ctx, doorX + doorW / 2 - 40, yAt(1.4), 80, 14, 7);
  ctx.fill();

  // The wordmark between the axles: M, the two smileys, D. Laid out left to
  // right around its centre so it reads MOOD on both sides.
  const markHeight = 0.62 * PX_PER_M;
  const markY = yAt(1.35);
  const markCentre = xAt(3.86);
  const letters: [kind: "M" | "D" | "dead" | "melting", offset: number][] = [
    ["M", -0.86],
    ["dead", -0.26],
    ["melting", 0.29],
    ["D", 0.86],
  ];
  ctx.font = `${String(markHeight)}px Bungee, "Arial Black", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const [kind, offset] of letters) {
    const x = markCentre + offset * PX_PER_M;
    if (kind === "M" || kind === "D") {
      ctx.fillStyle = C.purpleNight;
      ctx.fillText(kind, x + 12, markY + 12);
      ctx.fillStyle = C.atmosWhite;
      ctx.fillText(kind, x, markY);
    } else {
      drawSmiley(ctx, x, markY + 10, markHeight * 1.25, kind);
    }
  }

  // The motto on a black strip above the wordmark.
  const motto = "NO RISK, NO STORY";
  ctx.font = `${String(0.16 * PX_PER_M)}px Bungee, "Arial Black", sans-serif`;
  const mottoWidth = ctx.measureText(motto).width + 50;
  const mottoX = markCentre - mottoWidth / 2;
  ctx.fillStyle = "#211c1b";
  roundRect(ctx, mottoX, yAt(1.92), mottoWidth, 0.24 * PX_PER_M, 14);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = C.dripLilac;
  ctx.stroke();
  ctx.fillStyle = C.atmosWhite;
  ctx.fillText(motto, markCentre, yAt(1.92) + 0.12 * PX_PER_M);

  // Hand lettering near the tail.
  ctx.font = `${String(0.2 * PX_PER_M)}px "Permanent Marker", cursive`;
  ctx.fillStyle = C.tailRed;
  ctx.save();
  ctx.translate(xAt(6.3), yAt(1.62));
  ctx.rotate(-0.08);
  ctx.fillText("School", 0, -40);
  ctx.fillText("kills Artists", 0, 20);
  ctx.restore();

  // A scatter of small dead smileys, the way the panels are tagged.
  for (const [fromNose, height, tilt] of [
    [0.75, 0.9, -0.2],
    [2.0, 1.75, 0.25],
    [5.95, 0.85, -0.15],
    [7.0, 1.6, 0.3],
  ] as const) {
    drawSmiley(ctx, xAt(fromNose), yAt(height), 0.34 * PX_PER_M, "dead", tilt);
  }

  // Wheel arches.
  ctx.fillStyle = "#0e0612";
  for (const axle of [BUS.wheel.frontAxle, BUS.wheel.rearAxle]) {
    ctx.beginPath();
    ctx.arc(
      xAt(BUS.length / 2 - axle),
      yAt(BUS.wheel.radius),
      (BUS.wheel.radius + 0.12) * PX_PER_M,
      Math.PI,
      0,
    );
    ctx.fill();
  }

  // Sill with a chrome strip.
  ctx.fillStyle = "#2a0838";
  ctx.fillRect(0, yAt(BUS.bodyBottom + 0.16), WIDTH, HEIGHT);
  ctx.fillStyle = "#d9d4e3";
  ctx.fillRect(0, yAt(BUS.bodyBottom + 0.17), WIDTH, 5);
}

/**
 * Paints the livery once the brand fonts are ready. `noseOnLeft` lays the
 * panel out for the side where the nose is on the viewer's left, so neither
 * side's lettering is mirrored.
 */
export async function createSideLivery(
  noseOnLeft: boolean,
  maxAnisotropy = 8,
): Promise<CanvasTexture> {
  await Promise.allSettled([
    document.fonts.load(`64px Bungee`),
    document.fonts.load(`64px "Permanent Marker"`),
  ]);
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (ctx) paint(ctx, noseOnLeft);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}
