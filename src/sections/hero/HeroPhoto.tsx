import { AnimatePresence, motion, type MotionValue } from "motion/react";
import { cutouts } from "@/content/cutouts";
import { useTheme } from "@/features/theme/useTheme";

interface HeroPhotoProps {
  y: MotionValue<string>;
  scale: MotionValue<number>;
}

/**
 * Just the matatu, cut out of its photo, standing on a soft glow with a floor
 * shadow. Daylight shot in light mode, the crisp head-on shot at night.
 */
export function HeroPhoto({ y, scale }: HeroPhotoProps) {
  const { theme } = useTheme();
  const bus = theme === "dark" ? cutouts.frontCrisp : cutouts.frontSun;

  return (
    <motion.div
      style={{ y, scale }}
      className="pointer-events-none absolute inset-x-0 top-[9svh] flex h-[34svh] justify-center px-6 md:inset-y-0 md:top-0 md:right-[2%] md:left-auto md:h-auto md:w-[52%] md:items-center md:px-0"
    >
      <div className="relative flex h-full max-w-full items-end md:h-[78svh]">
        <div
          aria-hidden
          className="absolute inset-[8%] -z-10 rounded-full bg-mood-purple/35 blur-[90px] dark:bg-neon-pink/30"
        />
        <div
          aria-hidden
          className="absolute -bottom-[3%] left-1/2 h-[7%] w-[86%] -translate-x-1/2 rounded-[100%] bg-ink/45 blur-xl dark:bg-black/70"
        />
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={bus.src}
            src={bus.src}
            width={bus.width}
            height={bus.height}
            alt={bus.alt}
            fetchPriority="high"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full max-w-full object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]"
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
