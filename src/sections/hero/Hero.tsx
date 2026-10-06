import { Megaphone, Play, ScanEye } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { NoRiskSticker } from "@/components/brand/stickers/NoRiskSticker";
import { IconButton } from "@/components/ui/IconButton";
import { brand } from "@/content/brand";
import { useHorn } from "@/hooks/useHorn";
import { fadeUp, popIn, stagger } from "@/lib/motion";
import { HeroGlow } from "./HeroGlow";
import { HeroPhoto } from "./HeroPhoto";

/** `ready` holds the entrance until the intro curtain has lifted. */
export function Hero({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const hoot = useHorn();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate min-h-svh overflow-hidden"
    >
      <HeroGlow />
      <HeroPhoto y={photoY} scale={photoScale} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_70%,color-mix(in_srgb,var(--color-mood-purple)_35%,transparent),transparent)]"
      />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        variants={stagger(0.12, 0.55)}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pt-[36svh] pb-32 md:justify-center md:px-8 md:pt-24 md:pb-28"
      >
        <motion.p
          variants={fadeUp}
          className="mb-5 font-display text-xs tracking-[0.3em] text-accent uppercase"
        >
          {brand.eyebrow}
        </motion.p>
        <h1 id="hero-title" className="text-mega">
          <Wordmark animated play={ready} />
        </h1>
        <motion.div variants={popIn} className="mt-6 w-[min(22rem,85%)] -rotate-2">
          <NoRiskSticker
            role="img"
            aria-label={brand.tagline}
            className="h-auto w-full drop-shadow-[4px_4px_0_var(--color-mood-purple)]"
          />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[44ch] text-lg text-pretty text-fg-muted md:text-xl"
        >
          {brand.intro}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
          <IconButton
            href="#details"
            label="Spot the details"
            tone="primary"
            size="lg"
            icon={<ScanEye />}
          />
          <IconButton href="#videos" label="Watch the videos" size="lg" icon={<Play />} />
          <IconButton onClick={hoot} label="Hoot the horn" size="lg" icon={<Megaphone />} />
        </motion.div>
      </motion.div>
    </section>
  );
}
