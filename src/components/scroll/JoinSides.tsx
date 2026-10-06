import { motion, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useEntranceProgress } from "./useEntranceProgress";

interface JoinSidesProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
}

function Half({
  progress,
  from,
  children,
}: {
  progress: MotionValue<number>;
  from: "left" | "right";
  children: ReactNode;
}) {
  const sign = from === "left" ? -1 : 1;
  const x = useTransform(progress, [0, 1], [`${String(sign * 60)}vw`, "0vw"]);
  const rotate = useTransform(progress, [0, 0.8, 1], [sign * 8, sign * -1.5, 0]);
  const opacity = useTransform(progress, [0, 0.5], [0, 1]);
  return (
    <motion.div style={{ x, rotate, opacity }} className="min-w-0">
      {children}
    </motion.div>
  );
}

/**
 * Two halves slide in from opposite edges and lock together, with a slight
 * overshoot in rotation as they meet.
 */
export function JoinSides({ left, right, className }: JoinSidesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useEntranceProgress(ref, 0.4);

  return (
    <div ref={ref} className={cn("overflow-x-clip", className)}>
      {progress ? (
        <>
          <Half progress={progress} from="left">
            {left}
          </Half>
          <Half progress={progress} from="right">
            {right}
          </Half>
        </>
      ) : (
        <>
          <div className="min-w-0">{left}</div>
          <div className="min-w-0">{right}</div>
        </>
      )}
    </div>
  );
}
