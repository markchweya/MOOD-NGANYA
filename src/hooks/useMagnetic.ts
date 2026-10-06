import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import type { PointerEvent } from "react";

interface Magnetic {
  x: MotionValue<number>;
  y: MotionValue<number>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

/** Pull an element a fraction of the way toward the pointer, springing back on leave. */
export function useMagnetic(strength = 0.3): Magnetic {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18 });

  return {
    x,
    y,
    onPointerMove: (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    onPointerLeave: () => {
      rawX.set(0);
      rawY.set(0);
    },
  };
}
