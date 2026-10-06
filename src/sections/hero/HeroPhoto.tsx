import { AnimatePresence, motion, type MotionValue } from "motion/react";
import { photos } from "@/content/photos";
import { useTheme } from "@/features/theme/useTheme";

interface HeroPhotoProps {
  y: MotionValue<string>;
  scale: MotionValue<number>;
}

/**
 * Mood by night in dark mode, by day in light mode. The photo crossfades with
 * the theme and drifts slower than the page for depth.
 */
export function HeroPhoto({ y, scale }: HeroPhotoProps) {
  const { theme } = useTheme();
  const photo = theme === "dark" ? photos.night : photos.fullSun;

  return (
    <motion.div
      style={{ y, scale }}
      className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_40%,transparent_78%)] md:left-[44%] md:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={photo.id}
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          fetchPriority="high"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 size-full object-cover object-[50%_35%]"
        />
      </AnimatePresence>
    </motion.div>
  );
}
