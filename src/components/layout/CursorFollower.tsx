import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const INTERACTIVE = "a, button, [role='tab'], [role='img'][aria-label], [data-cursor='hover']";

/**
 * Replaces the system pointer on mouse and trackpad: a mustard dot that tracks
 * exactly, and a ring that trails on a spring, swells over anything clickable
 * and squeezes on press. Touch devices and reduced-motion visitors keep the
 * native cursor.
 */
export function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = finePointer && !reduceMotion;
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setHovering(event.target instanceof Element && event.target.closest(INTERACTIVE) !== null);
    };
    const onDown = () => {
      setPressed(true);
    };
    const onUp = () => {
      setPressed(false);
    };
    const onLeave = () => {
      setVisible(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[99]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0">
        <motion.div
          animate={{
            scale: pressed ? 0.75 : hovering ? 1.8 : 1,
            opacity: hovering ? 0.5 : 0.9,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="-mt-5 -ml-5 size-10 rounded-full border-2 border-smiley"
        />
      </motion.div>
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <motion.div
          animate={{ scale: pressed ? 0.6 : hovering ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="-mt-1.5 -ml-1.5 size-3 rounded-full bg-smiley shadow-[0_0_0_2px_var(--color-ink)]"
        />
      </motion.div>
    </div>
  );
}
