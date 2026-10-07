import { CanvasTexture, SRGBColorSpace, TextureLoader, type Texture } from "three";
import { C } from "./colours";

const loader = new TextureLoader();

/** Loads a photo as a colour texture, sharp at grazing angles. */
export async function loadPhoto(url: string, anisotropy = 8): Promise<Texture> {
  const texture = await loader.loadAsync(url);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = anisotropy;
  return texture;
}

let glow: CanvasTexture | null = null;

/** A soft white radial falloff; tinted per lamp and added on top, so bloom picks it up. */
export function glowTexture(): CanvasTexture {
  if (glow) return glow;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const falloff = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    falloff.addColorStop(0, "rgba(255,255,255,1)");
    falloff.addColorStop(0.35, "rgba(255,255,255,0.55)");
    falloff.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = falloff;
    ctx.fillRect(0, 0, size, size);
  }
  glow = new CanvasTexture(canvas);
  return glow;
}

const CSS_TO_HEX: Record<string, string> = {
  "var(--color-beacon-red)": C.beaconRed,
  "var(--color-beacon-purple)": C.beaconPurple,
  "var(--color-led-ice)": C.ledIce,
  "var(--color-tail-red)": C.tailRed,
  "var(--color-smiley)": C.smiley,
};

/** The hero's lamps are styled with CSS tokens; WebGL needs the literal colour. */
export function lampColour(css: string): string {
  return CSS_TO_HEX[css] ?? C.atmosWhite;
}
