import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { ThemeToggle } from "./ThemeToggle";

/** Floating header that tucks away while scrolling down and returns on scroll up. */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 240);
    setScrolled(y > 24);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <div
        data-scrolled={scrolled}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-transparent px-3 py-2 transition-[background-color,border-color,backdrop-filter] duration-500 data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/70 data-[scrolled=true]:backdrop-blur-xl"
      >
        <a href="#top" aria-label="MOOD, back to top" className="rounded-full px-2 text-3xl">
          <Wordmark />
        </a>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
