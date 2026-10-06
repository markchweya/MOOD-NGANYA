import { motion, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useEntranceProgress } from "./useEntranceProgress";

interface JoinSidesProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  /** Render spans instead of divs, for use inside headings and other phrasing content. */
  inline?: boolean;
}

function Half({
  progress,
  from,
  inline,
  children,
}: {
  progress: MotionValue<number>;
  from: "left" | "right";
  inline: boolean;
  children: ReactNode;
}) {
  const sign = from === "left" ? -1 : 1;
  const x = useTransform(progress, [0, 1], [`${String(sign * 60)}vw`, "0vw"]);
  const rotate = useTransform(progress, [0, 0.8, 1], [sign * 8, sign * -1.5, 0]);
  const opacity = useTransform(progress, [0, 0.5], [0, 1]);
  const Tag = inline ? motion.span : motion.div;
  return (
    <Tag style={{ x, rotate, opacity }} className={inline ? "inline-block" : "min-w-0"}>
      {children}
    </Tag>
  );
}

/**
 * Two halves slide in from opposite edges and lock together, with a slight
 * overshoot in rotation as they meet.
 */
export function JoinSides({ left, right, className, inline = false }: JoinSidesProps) {
  // Typed for both wrapper tags so the same ref fits either.
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);
  const Wrapper = inline ? "span" : "div";
  const progress = useEntranceProgress(ref, 0.4);

  return (
    <Wrapper ref={ref} className={cn("overflow-x-clip", className)}>
      {progress ? (
        <>
          <Half progress={progress} from="left" inline={inline}>
            {left}
          </Half>
          <Half progress={progress} from="right" inline={inline}>
            {right}
          </Half>
        </>
      ) : (
        <>
          <Wrapper className={inline ? undefined : "min-w-0"}>{left}</Wrapper>
          <Wrapper className={inline ? undefined : "min-w-0"}>{right}</Wrapper>
        </>
      )}
    </Wrapper>
  );
}
