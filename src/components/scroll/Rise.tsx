import { motion, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useEntranceProgress } from "./useEntranceProgress";

interface RiseProps {
  children: ReactNode;
  className?: string;
}

function RiseMotion({
  progress,
  children,
  className,
}: RiseProps & { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [160, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(progress, [0, 1], [18, 0]);
  const radius = useTransform(progress, [0, 1], [64, 32]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        scale,
        rotateX,
        borderRadius: radius,
        opacity,
        transformPerspective: 1200,
        transformOrigin: "50% 100%",
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/** The content comes up like a sheet being lifted into place, tilting flat as it lands. */
export function Rise({ children, className }: RiseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useEntranceProgress(ref, 0.45);

  return (
    <div ref={ref}>
      {progress ? (
        <RiseMotion progress={progress} {...(className ? { className } : {})}>
          {children}
        </RiseMotion>
      ) : (
        <div className={className}>{children}</div>
      )}
    </div>
  );
}
