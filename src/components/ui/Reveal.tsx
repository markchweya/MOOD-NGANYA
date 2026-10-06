import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { fadeUp } from "@/lib/motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ variants = fadeUp, amount = 0.25, ...props }: RevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...props}
    />
  );
}
