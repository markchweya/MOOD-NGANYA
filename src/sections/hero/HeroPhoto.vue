<script setup lang="ts">
import { motion, type MotionValue } from "motion-v";
import { useTheme } from "@/composables/useTheme";
import { cutouts } from "@/content/cutouts";
import { easeOut } from "@/lib/motion";
import BusLights from "./BusLights.vue";

/**
 * Just the matatu, cut out of its photo, standing on a soft glow with a floor
 * shadow. At night it dims and its lamps light up.
 */
const { y, scale } = defineProps<{
  y: MotionValue<string>;
  scale: MotionValue<number>;
}>();

const { theme } = useTheme();
/** The crisp head-on cutout: every mirror, lamp and bumper part intact. */
const bus = cutouts.frontCrisp;
</script>

<template>
  <motion.div
    :style="{ y, scale }"
    class="pointer-events-none absolute inset-x-0 top-[8svh] flex h-[29svh] justify-center px-6 md:inset-y-0 md:top-0 md:right-[2%] md:left-auto md:h-auto md:w-[52%] md:items-center md:px-0"
  >
    <div class="relative flex h-full max-w-full items-end md:h-[78svh]">
      <div
        aria-hidden="true"
        class="absolute inset-[8%] -z-10 rounded-full bg-mood-purple/35 blur-[90px] dark:bg-neon-pink/30"
      />
      <div
        aria-hidden="true"
        class="absolute -bottom-[3%] left-1/2 h-[7%] w-[86%] -translate-x-1/2 rounded-[100%] bg-ink/45 blur-xl dark:bg-black/70"
      />
      <motion.img
        :src="bus.src"
        :srcset="bus.srcSet"
        sizes="(min-width: 768px) 50vw, 90vw"
        :width="bus.width"
        :height="bus.height"
        :alt="bus.alt"
        fetchpriority="high"
        :initial="{ opacity: 0, y: 30, scale: 0.96 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.9, ease: easeOut }"
        class="relative h-full max-w-full object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)] transition-[filter] duration-700 dark:brightness-[0.62] dark:saturate-[1.35]"
      />
      <BusLights v-if="theme === 'dark'" />
    </div>
  </motion.div>
</template>
