<script setup lang="ts">
import { motion } from "motion-v";
/** A highlighted word inside a heading, underlined by a stroke that paints itself in. */
</script>

<template>
  <span class="relative inline-block text-accent">
    <slot />
    <svg
      aria-hidden="true"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      class="absolute -bottom-[0.3em] left-0 h-[0.16em] w-full overflow-visible"
    >
      <motion.path
        d="M2 7 C 50 4, 100 10, 150 6 S 190 5, 198 6"
        fill="none"
        stroke="currentColor"
        stroke-width="5"
        stroke-linecap="round"
        :initial="{ pathLength: 0, opacity: 0 }"
        :while-in-view="{ pathLength: 1, opacity: 0.8 }"
        :in-view-options="{ once: true, amount: 1 }"
        :transition="{ duration: 0.9, delay: 0.5, ease: [0.65, 0, 0.35, 1] }"
      />
    </svg>
  </span>
</template>
