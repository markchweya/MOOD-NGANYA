<script setup lang="ts">
import { Megaphone, Play, ScanEye } from "lucide-vue-next";
import { motion, useScroll, useTransform } from "motion-v";
import { ref } from "vue";
import Wordmark from "@/components/brand/Wordmark.vue";
import NoRiskSticker from "@/components/brand/stickers/NoRiskSticker.vue";
import IconButton from "@/components/ui/IconButton.vue";
import { useHorn } from "@/composables/useHorn";
import { brand } from "@/content/brand";
import { fadeUp, popIn, stagger } from "@/lib/motion";
import HeroGlow from "./HeroGlow.vue";
import HeroPhoto from "./HeroPhoto.vue";

const { waiting } = defineProps<{
  /** Hold the entrance while the intro curtain is still up. */
  waiting?: boolean;
}>();

const section = ref<HTMLElement | null>(null);
const hoot = useHorn();
const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
const copyVariants = stagger(0.12, 0.55);
</script>

<template>
  <section
    id="top"
    ref="section"
    aria-labelledby="hero-title"
    class="relative isolate min-h-svh overflow-hidden"
  >
    <HeroGlow />
    <HeroPhoto :y="photoY" :scale="photoScale" />
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_70%,color-mix(in_srgb,var(--color-mood-purple)_35%,transparent),transparent)]"
    />

    <motion.div
      :style="{ y: copyY, opacity: copyOpacity }"
      :variants="copyVariants"
      initial="hidden"
      :animate="waiting ? 'hidden' : 'show'"
      class="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pt-[39svh] pb-28 md:justify-center md:px-8 md:pt-24 md:pb-28"
    >
      <motion.p
        :variants="fadeUp"
        class="mb-5 font-display text-xs tracking-[0.3em] text-accent uppercase"
      >
        {{ brand.eyebrow }}
      </motion.p>
      <h1 id="hero-title" class="text-mega">
        <Wordmark animated :waiting="waiting" />
      </h1>
      <motion.div :variants="popIn" class="mt-6 w-[min(22rem,85%)] -rotate-2">
        <NoRiskSticker
          role="img"
          :aria-label="brand.tagline"
          aria-hidden="false"
          class="h-auto w-full drop-shadow-[4px_4px_0_var(--color-mood-purple)]"
        />
      </motion.div>
      <motion.p
        :variants="fadeUp"
        class="mt-5 max-w-[44ch] text-base text-pretty text-fg-muted md:mt-6 md:text-xl"
      >
        {{ brand.intro }}
      </motion.p>
      <motion.div :variants="fadeUp" class="mt-8 flex items-center gap-3">
        <IconButton href="#details" label="Spot the details" tone="primary" size="lg">
          <ScanEye />
        </IconButton>
        <IconButton href="#videos" label="Watch the videos" size="lg"><Play /></IconButton>
        <IconButton label="Hoot the horn" size="lg" @click="hoot"><Megaphone /></IconButton>
      </motion.div>
    </motion.div>
  </section>
</template>
