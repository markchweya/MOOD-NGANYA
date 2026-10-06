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

/** A highlighted word inside a heading, underlined by a stroke that paints itself in. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block text-accent">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.3em] left-0 h-[0.16em] w-full overflow-visible"
      >
        <motion.path
          d="M2 7 C 50 4, 100 10, 150 6 S 190 5, 198 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}
