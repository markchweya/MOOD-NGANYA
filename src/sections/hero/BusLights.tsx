import { motion } from "motion/react";

interface Lamp {
  /** Centre as a percentage of the cutout. */
  x: number;
  y: number;
  /** Size as a percentage of the cutout width. */
  w: number;
  h: number;
  colour: string;
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
const LAMPS: readonly Lamp[] = [
  ...BEACON_ROW,
  { x: 50, y: 53, w: 46, h: 4, colour: "var(--color-led-ice)", delay: 0.4 },
  { x: 22, y: 72, w: 20, h: 7, colour: "var(--color-led-ice)", delay: 0.1 },
  { x: 78, y: 72, w: 20, h: 7, colour: "var(--color-led-ice)", delay: 0.1 },
  { x: 49, y: 94, w: 22, h: 4, colour: "var(--color-tail-red)", delay: 0.6 },
  { x: 19, y: 84, w: 8, h: 8, colour: "var(--color-smiley)", delay: 0.8 },
  { x: 81, y: 84, w: 8, h: 8, colour: "var(--color-smiley)", delay: 0.8 },
];

/**
 * Night mode: soft light blooms over the bus's real lamps, pulsing slightly
 * out of step like a running light show. Purely decorative.
 */
export function BusLights() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-screen">
      {LAMPS.map((lamp, i) => (
        <motion.span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
          style={{
            left: `${String(lamp.x)}%`,
            top: `${String(lamp.y)}%`,
            width: `${String(lamp.w)}%`,
            height: `${String(lamp.h)}%`,
            background: lamp.colour,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.45, 0.95, 0.45] }}
          transition={{ duration: 1.6, delay: lamp.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
