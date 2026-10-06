import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { ThemeToggle } from "./ThemeToggle";

/** Bare floating logo and theme toggle; they tuck away while scrolling down and return on scroll up. */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 240);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2">
        <a href="#top" aria-label="MOOD, back to top" className="rounded-full px-2 text-3xl">
          <Wordmark />
        </a>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
