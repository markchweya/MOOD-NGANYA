import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { fadeUp, stagger } from "@/lib/motion";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Eyebrow, title and lede that rise in one after another. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.header
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={cn(
        "mb-12 max-w-3xl md:mb-16",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <motion.p
        variants={fadeUp}
        className="mb-4 font-display text-xs tracking-[0.25em] text-accent uppercase"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className="text-4xl leading-[1.02] text-balance md:text-6xl"
      >
        {title}
      </motion.h2>
      {lede && (
        <motion.p variants={fadeUp} className="mt-5 max-w-[58ch] text-lg text-pretty text-fg-muted">
          {lede}
        </motion.p>
      )}
    </motion.header>
  );
}

/** A highlighted word inside a heading. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
