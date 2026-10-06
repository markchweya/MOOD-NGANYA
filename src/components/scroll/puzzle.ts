import type { MotionValue } from "motion-v";
import type { InjectionKey, Ref } from "vue";

export interface PuzzleState {
  progress: MotionValue<number>;
  reduced: Ref<boolean>;
}

/** Shares a board's scroll progress with the pieces inside it. */
export const puzzleKey: InjectionKey<PuzzleState> = Symbol("puzzle");

/** Deterministic pseudo-random in [-1, 1] so the scatter is stable across renders. */
export function scatter(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}
