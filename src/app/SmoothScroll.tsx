import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

/** Inertial page scrolling; native scrolling when the visitor prefers reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -88 }, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
