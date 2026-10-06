import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const INTERACTIVE = "a, button, [role='tab'], [role='img'][aria-label]";

/**
 * A mustard ring that trails the pointer and swells over anything clickable.
 * Mouse and trackpad only; the native cursor stays visible.
 */
export function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = finePointer && !reduceMotion;
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setActive(event.target instanceof Element && event.target.closest(INTERACTIVE) !== null);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed top-0 left-0 z-[99]"
    >
      <motion.div
        animate={active ? { scale: 1.9, opacity: 0.35 } : { scale: 1, opacity: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="-mt-4 -ml-4 size-8 rounded-full border-2 border-smiley bg-smiley/10 mix-blend-difference"
      />
    </motion.div>
  );
}
