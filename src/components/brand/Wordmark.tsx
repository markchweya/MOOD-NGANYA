import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { popIn, stagger } from "@/lib/motion";
import { Smiley } from "./Smiley";

interface WordmarkProps {
  className?: string;
  /** Play the slap-on entrance. */
  animated?: boolean;
}

/**
 * MOOD spelled the way the mirror tags spell it: the O's are the nganya's drippy smileys.
 */
export function Wordmark({ className, animated = false }: WordmarkProps) {
  const motionProps = animated
    ? { variants: stagger(0.09, 0.15), initial: "hidden", animate: "show" }
    : {};
  const piece = animated ? { variants: popIn } : {};

  return (
    <motion.span
      role="img"
      aria-label="MOOD"
      className={cn(
        "inline-flex items-center leading-none whitespace-nowrap text-sticker",
        className,
      )}
      {...motionProps}
    >
      <motion.span aria-hidden className="inline-block" {...piece}>
        M
      </motion.span>
      <motion.span
        aria-hidden
        className="mx-[0.02em] inline-block w-[0.86em] drop-sticker"
        {...piece}
      >
        <Smiley variant="dead" className="h-auto w-full -translate-y-[0.04em]" />
      </motion.span>
      <motion.span
        aria-hidden
        className="mx-[0.02em] inline-block w-[0.86em] drop-sticker"
        {...piece}
      >
        <Smiley variant="melting" className="h-auto w-full -translate-y-[0.04em]" />
      </motion.span>
      <motion.span aria-hidden className="inline-block" {...piece}>
        D
      </motion.span>
    </motion.span>
  );
}
