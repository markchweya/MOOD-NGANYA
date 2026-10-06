import { useReducedMotion, useScroll, useSpring, type MotionValue } from "motion/react";
import type { RefObject } from "react";

/**
 * 0 → 1 as an element travels from the bottom of the viewport to `endAt`
 * (a fraction of the viewport height from the top). Scroll-linked, so the
 * entrance plays forward and back with the scrollbar. Smoothed with a spring.
 *
 * Returns `null` for reduced-motion visitors so callers render the final state.
 */
export function useEntranceProgress(
  ref: RefObject<HTMLElement | null>,
  endAt = 0.35,
): MotionValue<number> | null {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `start ${endAt}` as const],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.0005 });
  return reduceMotion ? null : smooth;
}
