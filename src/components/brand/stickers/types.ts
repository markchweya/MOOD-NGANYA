import type { SVGProps } from "react";

export type StickerProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox">;

/** Shared outline colour and font for every sticker. */
export const INK = "var(--color-ink)";
export const DISPLAY_FONT = "Bungee, Impact, sans-serif";
