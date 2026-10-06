import { motion } from "motion/react";
import { Smiley } from "@/components/brand/Smiley";
import { FirstClassSticker } from "@/components/brand/stickers/FirstClassSticker";
import { TryMeSticker } from "@/components/brand/stickers/TryMeSticker";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface FloatingProps {
  className: string;
  delay: number;
  rotate: number;
  children: ReactNode;
}

/** Pops in, bobs gently, and can be flung around before springing back. */
function Floating({ className, delay, rotate, children }: FloatingProps) {
  return (
    <motion.div
      className={cn("absolute cursor-grab active:cursor-grabbing", className)}
      initial={{ opacity: 0, scale: 0.3, rotate: rotate - 25 }}
      animate={{ opacity: 1, scale: 1, rotate, y: [0, -10, 0] }}
      transition={{
        opacity: { delay, duration: 0.3 },
        scale: { delay, type: "spring", stiffness: 420, damping: 14 },
        rotate: { delay, type: "spring", stiffness: 200, damping: 12 },
        y: { delay: delay + 0.6, duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      drag
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 300, bounceDamping: 14 }}
      whileDrag={{ scale: 1.12, rotate: 0 }}
      whileHover={{ scale: 1.06 }}
    >
      {children}
    </motion.div>
  );
}

/** Stickers from the nganya scattered over the hero photo. Decorative. */
export function HeroStickers() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block [&>*]:pointer-events-auto"
    >
      <Floating className="right-[6%] bottom-[18%] w-60 drop-shadow-xl" delay={1.4} rotate={-8}>
        <TryMeSticker className="h-auto w-full" />
      </Floating>
      <Floating className="top-[22%] right-[30%] w-28 drop-shadow-xl" delay={1.6} rotate={12}>
        <FirstClassSticker className="h-auto w-full" />
      </Floating>
      <Floating className="top-[14%] right-[8%] w-20 drop-shadow-xl" delay={1.8} rotate={14}>
        <Smiley variant="dead" className="h-auto w-full" />
      </Floating>
    </div>
  );
}
