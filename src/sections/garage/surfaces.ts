import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";
import {
  SMILEY_DEAD,
  SMILEY_FACE,
  SMILEY_MELTING,
  SMILEY_VIEWBOX,
} from "@/components/brand/smileyPaths";
import { C } from "./colours";

/**
 * The garage's surfaces, painted on canvases at load time: no image downloads,
 * and everything stays in the brand palette. Colour maps are sRGB; bump maps
 * stay linear.
 */

function canvas(width: number, height: number) {
  const element = document.createElement("canvas");
  element.width = width;
  element.height = height;
  const ctx = element.getContext("2d");
  if (!ctx) throw new Error("2D canvas unavailable");
  return { element, ctx };
}

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function texture(element: HTMLCanvasElement, colour: boolean, repeat: [number, number] = [1, 1]) {
  const result = new CanvasTexture(element);
  if (colour) result.colorSpace = SRGBColorSpace;
  result.wrapS = RepeatWrapping;
  result.wrapT = RepeatWrapping;
  result.repeat.set(...repeat);
  result.anisotropy = 8;
  return result;
}

/** Horizontal ribs of a roller shutter: a light/dark ramp per slat, tileable. */
export function shutterBump(slats = 28) {
  const { element, ctx } = canvas(16, 512);
  const slat = 512 / slats;
  for (let i = 0; i < slats; i++) {
    const ramp = ctx.createLinearGradient(0, i * slat, 0, (i + 1) * slat);
    ramp.addColorStop(0, "#202020");
    ramp.addColorStop(0.45, "#f0f0f0");
    ramp.addColorStop(0.9, "#808080");
    ramp.addColorStop(1, "#101010");
    ctx.fillStyle = ramp;
    ctx.fillRect(0, i * slat, 16, slat);
  }
  return texture(element, false);
}

function smiley(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, dead: boolean) {
  const s = h / SMILEY_VIEWBOX.height;
  ctx.save();
  ctx.translate(x - (SMILEY_VIEWBOX.width * s) / 2, y - h / 2);
  ctx.scale(s, s);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const face = new Path2D(SMILEY_FACE);
  ctx.fillStyle = C.smiley;
  ctx.fill(face);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 3;
  ctx.stroke(face);
  if (dead) {
    ctx.lineWidth = 4.5;
    ctx.stroke(new Path2D(SMILEY_DEAD.eyes));
    ctx.stroke(new Path2D(SMILEY_DEAD.grin));
    ctx.fillStyle = C.atmosWhite;
    ctx.fill(new Path2D(SMILEY_DEAD.tongue));
  } else {
    ctx.fillStyle = C.ink;
    ctx.fill(new Path2D(SMILEY_MELTING.eyes));
    ctx.lineWidth = 5;
    ctx.stroke(new Path2D(SMILEY_MELTING.grin));
  }
  ctx.restore();
}

/**
 * Paints now with whatever font is available and again once Bungee has
 * loaded, so a material can take the texture straight away.
 */
function withBrandFont(element: HTMLCanvasElement, draw: () => void) {
  const result = texture(element, true);
  const paint = () => {
    draw();
    result.needsUpdate = true;
  };
  paint();
  document.fonts.load("64px Bungee").then(paint, () => undefined);
  return result;
}

/** The shutter's paint: brushed steel tagged with the MOOD wordmark. */
export function shutterPaint() {
  const width = 2048;
  const height = 768;
  const { element, ctx } = canvas(width, height);
  return withBrandFont(element, () => {
    const random = seeded(7);

    const steel = ctx.createLinearGradient(0, 0, 0, height);
    steel.addColorStop(0, "#3b3742");
    steel.addColorStop(1, "#24212a");
    ctx.fillStyle = steel;
    ctx.fillRect(0, 0, width, height);
    // Grime and brushed streaks.
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(${random() > 0.5 ? "255,255,255" : "0,0,0"},${String(random() * 0.05)})`;
      ctx.fillRect(random() * width, random() * height, 40 + random() * 220, 1 + random() * 2);
    }

    // Spray-painted wordmark, slightly rotated, with overspray.
    ctx.save();
    ctx.translate(width / 2, height / 2 + 20);
    ctx.rotate(-0.04);
    const glyph = 300;
    ctx.font = `${String(glyph)}px Bungee, "Arial Black", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = C.neonPink;
    ctx.shadowBlur = 40;
    for (const [letter, x] of [
      ["M", -470],
      ["D", 470],
    ] as const) {
      ctx.fillStyle = C.purpleNight;
      ctx.fillText(letter, x + 18, 18);
      ctx.fillStyle = C.atmosWhite;
      ctx.fillText(letter, x, 0);
    }
    ctx.shadowBlur = 0;
    smiley(ctx, -165, 30, glyph * 1.15, true);
    smiley(ctx, 165, 30, glyph * 1.15, false);
    ctx.restore();

    // Paint drips under the tag.
    ctx.fillStyle = C.dripLilac;
    for (let i = 0; i < 14; i++) {
      const x = width * 0.2 + random() * width * 0.6;
      const length = 30 + random() ** 2 * 140;
      ctx.beginPath();
      ctx.roundRect(x, height * 0.74, 10, length, 5);
      ctx.fill();
    }
  });
}

/** Polished concrete: a mottled base with faint expansion joints, tiled across the floor. */
export function concrete() {
  const size = 512;
  const { element, ctx } = canvas(size, size);
  const random = seeded(19);
  ctx.fillStyle = "#3a3640";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 2600; i++) {
    const shade = 40 + random() * 30;
    ctx.fillStyle = `rgba(${String(shade)},${String(shade - 4)},${String(shade + 6)},0.35)`;
    ctx.beginPath();
    ctx.arc(random() * size, random() * size, 1 + random() * 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(10,8,14,0.55)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, size - 2, size - 2);
  return texture(element, true, [6, 6]);
}

/** Vertical ribs for the corrugated side walls. */
export function corrugated() {
  const { element, ctx } = canvas(256, 8);
  const ribs = 8;
  for (let i = 0; i < ribs; i++) {
    const ramp = ctx.createLinearGradient((i * 256) / ribs, 0, ((i + 1) * 256) / ribs, 0);
    ramp.addColorStop(0, "#111");
    ramp.addColorStop(0.5, "#eee");
    ramp.addColorStop(1, "#111");
    ctx.fillStyle = ramp;
    ctx.fillRect((i * 256) / ribs, 0, 256 / ribs, 8);
  }
  return texture(element, false, [6, 1]);
}

/**
 * The neon sign for the back wall: MOOD in glass tubes with the two smileys,
 * drawn as bright strokes on black. Shown additively, so only the tubes add light.
 */
export function neonSign() {
  const width = 2048;
  const height = 640;
  const { element, ctx } = canvas(width, height);
  return withBrandFont(element, () => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${String(360)}px Bungee, "Arial Black", sans-serif`;
    ctx.lineJoin = "round";

    const tube = (draw: () => void, colour: string) => {
      ctx.strokeStyle = colour;
      ctx.shadowColor = colour;
      for (const [line, blur] of [
        [26, 50],
        [12, 18],
      ] as const) {
        ctx.lineWidth = line;
        ctx.shadowBlur = blur;
        draw();
      }
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 5;
      ctx.shadowBlur = 0;
      draw();
    };

    tube(() => {
      ctx.strokeText("M", width / 2 - 640, height / 2);
      ctx.strokeText("D", width / 2 + 640, height / 2);
    }, C.neonPink);

    for (const [x, colour] of [
      [width / 2 - 215, C.smiley],
      [width / 2 + 215, C.smiley],
    ] as const) {
      tube(() => {
        ctx.save();
        const h = 400;
        const s = h / SMILEY_VIEWBOX.height;
        ctx.translate(x - (SMILEY_VIEWBOX.width * s) / 2, height / 2 - h / 2 + 30);
        ctx.scale(s, s);
        ctx.lineWidth /= s;
        ctx.stroke(new Path2D(SMILEY_FACE));
        ctx.stroke(new Path2D(x < width / 2 ? SMILEY_DEAD.eyes : SMILEY_MELTING.eyes));
        ctx.stroke(new Path2D(x < width / 2 ? SMILEY_DEAD.grin : SMILEY_MELTING.grin));
        ctx.restore();
      }, colour);
    }
  });
}
