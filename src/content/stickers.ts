import type { StickerPlacement } from "./types";

/** Starting layout of the sticker wall. Positions are percentages of the wall. */
export const stickerWall: readonly StickerPlacement[] = [
  { sticker: "windshield", label: "MOOD windshield logo", width: 330, x: 5, y: 7, rotate: -4 },
  { sticker: "no-risk", label: "No risk, no story", width: 300, x: 52, y: 6, rotate: 3 },
  { sticker: "try-me", label: "Thou Shall Not TRY ME", width: 280, x: 6, y: 45, rotate: -6 },
  { sticker: "first-class", label: "FIRST CLASS", width: 150, x: 76, y: 28, rotate: 0 },
  { sticker: "atmosphere", label: "ATMOSPHERE", width: 380, x: 38, y: 76, rotate: -2 },
  { sticker: "school", label: "School kills Artists", width: 170, x: 46, y: 34, rotate: -10 },
  { sticker: "plate-front", label: "Front MOOD plate", width: 190, x: 4, y: 83, rotate: 4 },
  { sticker: "plate-rear", label: "Rear MOOD plate", width: 190, x: 70, y: 60, rotate: -5 },
  { sticker: "hazard", label: "Hazard sign", width: 110, x: 37, y: 54, rotate: 8 },
  { sticker: "warning", label: "Warning sign", width: 110, x: 58, y: 47, rotate: -12 },
  { sticker: "smiley-dead", label: "Dead-eyed drippy smiley", width: 96, x: 86, y: 10, rotate: 10 },
  { sticker: "smiley-melting", label: "Melting smiley", width: 84, x: 30, y: 28, rotate: -12 },
  { sticker: "smiley-dead", label: "Dead-eyed drippy smiley", width: 70, x: 64, y: 26, rotate: -8 },
  { sticker: "smiley-melting", label: "Melting smiley", width: 64, x: 88, y: 80, rotate: 6 },
];
