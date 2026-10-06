import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { PointerEvent } from "react";

interface Tilt {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  /** Radial highlight that follows the pointer, for a `background` layer. */
  glare: MotionValue<string>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

/** Tilt an element toward a mouse pointer by up to `maxDeg`, with a moving glare. */
export function useTilt(maxDeg = 10): Tilt {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 20 });
  const sy = useSpring(py, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(sy, [0, 1], [maxDeg, -maxDeg]);
  const rotateY = useTransform(sx, [0, 1], [-maxDeg, maxDeg]);
  const gx = useTransform(sx, (v) => `${String(v * 100)}%`);
  const gy = useTransform(sy, (v) => `${String(v * 100)}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.35), transparent 55%)`;

  return {
    rotateX,
    rotateY,
    glare,
    onPointerMove: (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width);
      py.set((event.clientY - rect.top) / rect.height);
    },
    onPointerLeave: () => {
      px.set(0.5);
      py.set(0.5);
    },
  };
}
