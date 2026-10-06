import { motion, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useEntranceProgress } from "./useEntranceProgress";

const COLS = 8;
const ROWS = 5;
const BLOCKS = COLS * ROWS;
/** Share of the progress each block spends shrinking away. */
const BLOCK_SPAN = 0.32;

interface Block {
  key: number;
  row: number;
  col: number;
  start: number;
}

// Build from the ground up: bottom row first, sweeping left to right with a slight stagger.
const blocks: Block[] = Array.from({ length: BLOCKS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const order = (ROWS - 1 - row) * COLS + col;
  return { key: i, row, col, start: (order / BLOCKS) * (1 - BLOCK_SPAN) };
});

function CoverBlock({ block, progress }: { block: Block; progress: MotionValue<number> }) {
  const range = [block.start, block.start + BLOCK_SPAN];
  const scale = useTransform(progress, range, [1.02, 0]);
  const rotate = useTransform(progress, range, [0, block.col % 2 ? 45 : -45]);
  return (
    <motion.span
      style={{
        scale,
        rotate,
        left: `${String((block.col / COLS) * 100)}%`,
        top: `${String((block.row / ROWS) * 100)}%`,
        width: `${String(100 / COLS)}%`,
        height: `${String(100 / ROWS)}%`,
      }}
      className="absolute bg-bg outline outline-1 outline-mood-purple/30"
    />
  );
}

function ConstructMotion({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const scale = useTransform(progress, [0, 1], [0.94, 1]);
  return (
    <motion.div style={{ scale }} className="relative">
      {children}
      <div aria-hidden className="pointer-events-none absolute -inset-px z-10">
        {blocks.map((block) => (
          <CoverBlock key={block.key} block={block} progress={progress} />
        ))}
      </div>
    </motion.div>
  );
}

/**
 * The content is assembled block by block, from the bottom row up, as it
 * scrolls into view, like something being constructed.
 */
export function Construct({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useEntranceProgress(ref, 0.3);

  return (
    <div ref={ref} className={cn(className)}>
      {progress ? <ConstructMotion progress={progress}>{children}</ConstructMotion> : children}
    </div>
  );
}
