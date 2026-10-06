import { motion, useTransform, type MotionValue } from "motion/react";
import { useContext, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PuzzleContext } from "./puzzleContext";
import { useEntranceProgress } from "./useEntranceProgress";

/** Deterministic pseudo-random in [-1, 1] so the scatter is stable across renders. */
function scatter(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/** Holds puzzle pieces; their assembly is driven by this board's scroll position. */
export function PuzzleBoard({ children, className }: { children: ReactNode; className?: string }) {
  const boardRef = useRef<HTMLDivElement>(null);
  const progress = useEntranceProgress(boardRef, 0.4);

  return (
    <PuzzleContext value={{ progress }}>
      <div ref={boardRef} className={className}>
        {children}
      </div>
    </PuzzleContext>
  );
}

function PieceMotion({
  index,
  progress,
  children,
  className,
}: {
  index: number;
  progress: MotionValue<number>;
  children: ReactNode;
  className?: string;
}) {
  // Each piece lands at a slightly different moment, from its own direction.
  const start = Math.abs(scatter(index + 7)) * 0.35;
  const range = [start, start + 0.6];
  const x = useTransform(progress, range, [scatter(index + 1) * 260, 0]);
  const y = useTransform(progress, range, [scatter(index + 2) * 200 + 120, 0]);
  const rotate = useTransform(progress, range, [scatter(index + 3) * 40, 0]);
  const scale = useTransform(progress, range, [0.7, 1]);
  const opacity = useTransform(progress, [start, start + 0.25], [0, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/** A piece that flies in from a scattered position and snaps into its slot. */
export function PuzzlePiece({
  index,
  children,
  className,
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const board = useContext(PuzzleContext);
  if (!board?.progress) return <div className={className}>{children}</div>;

  return (
    <PieceMotion index={index} progress={board.progress} {...(className ? { className } : {})}>
      {children}
    </PieceMotion>
  );
}
