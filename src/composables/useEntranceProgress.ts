import { useReducedMotion, useScroll, useSpring, type MotionValue } from "motion-v";
import type { Ref } from "vue";

/**
 * 0 → 1 as an element travels from the bottom of the viewport to `endAt`
 * (a fraction of the viewport height from the top), or until it is fully in
 * view with `"in-view"`, for elements near the page end that never get higher. Scroll-linked, so the
 * entrance plays forward and back with the scrollbar. Spring-smoothed.
 *
 * `reduced` is true for visitors who prefer reduced motion; render the final
 * state for them instead of reading `progress`.
 */
export function useEntranceProgress(
  target: Ref<HTMLElement | null | undefined>,
  endAt: number | "in-view" = 0.35,
): { progress: MotionValue<number>; reduced: Ref<boolean> } {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", endAt === "in-view" ? "end end" : (`start ${endAt}` as const)],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.0005 });
  return { progress, reduced };
}
