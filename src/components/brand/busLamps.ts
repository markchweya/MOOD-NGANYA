/** A lamp on the crisp head-on cutout. */
export interface Lamp {
  /** Centre as a percentage of the cutout. */
  x: number;
  y: number;
  /** Size as a percentage of the cutout width. */
  w: number;
  h: number;
  colour: string;
  /** Seconds before this lamp's pulse starts, so the bank runs like a light show. */
  delay: number;
}

const BEACON_ROW = Array.from({ length: 14 }, (_, i) => ({
  x: 21 + i * 4.4,
  y: 2,
  w: 3.6,
  h: 2.6,
  colour: i % 2 ? "var(--color-beacon-purple)" : "var(--color-beacon-red)",
  delay: (i % 4) * 0.25,
}));

/** Where Mood's lamps sit on the crisp head-on cutout. */
export const FRONT_LAMPS: readonly Lamp[] = [
  ...BEACON_ROW,
  { x: 50, y: 53, w: 46, h: 4, colour: "var(--color-led-ice)", delay: 0.4 },
  { x: 22, y: 72, w: 20, h: 7, colour: "var(--color-led-ice)", delay: 0.1 },
  { x: 78, y: 72, w: 20, h: 7, colour: "var(--color-led-ice)", delay: 0.1 },
  { x: 49, y: 94, w: 22, h: 4, colour: "var(--color-tail-red)", delay: 0.6 },
  { x: 19, y: 84, w: 8, h: 8, colour: "var(--color-smiley)", delay: 0.8 },
  { x: 81, y: 84, w: 8, h: 8, colour: "var(--color-smiley)", delay: 0.8 },
];
