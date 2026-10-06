import { createContext } from "react";
import type { MotionValue } from "motion/react";

export interface PuzzleState {
  /** Board progress, or null when motion is reduced. */
  progress: MotionValue<number> | null;
}

export const PuzzleContext = createContext<PuzzleState | null>(null);
