import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { easeOut } from "@/lib/motion";
import { markIntroSeen } from "./intro";

const HOLD_MS = 1500;

/** Purple curtain: the wordmark slaps on, then the panel wipes up to reveal the hero. */
export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    markIntroSeen();
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, HOLD_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[95] grid place-items-center bg-purple-night"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: easeOut }}
        >
          <motion.div
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="text-[clamp(3.5rem,14vw,9rem)]"
          >
            <Wordmark animated />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
