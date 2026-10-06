<script setup lang="ts">
import { motion } from "motion-v";
import { cn } from "@/lib/cn";
import { fadeUp, stagger } from "@/lib/motion";

/**
 * Eyebrow, title and lede that rise in one after another.
 * The title comes from the default slot, so it can hold a `<Highlight>`.
 */
const {
  id,
  eyebrow,
  lede,
  align = "left",
  class: className,
} = defineProps<{
  id: string;
  eyebrow: string;
  lede?: string;
  align?: "left" | "center";
  class?: string;
}>();
</script>

<template>
  <motion.header
    :variants="stagger(0.1)"
    initial="hidden"
    while-in-view="show"
    :in-view-options="{ once: true, amount: 0.5 }"
    :class="cn('mb-12 max-w-3xl md:mb-16', align === 'center' && 'mx-auto text-center', className)"
  >
    <motion.p
      :variants="fadeUp"
      class="mb-4 font-display text-xs tracking-[0.25em] text-accent uppercase"
    >
      {{ eyebrow }}
    </motion.p>
    <motion.h2 :id="id" :variants="fadeUp" class="text-4xl leading-[1.02] text-balance md:text-6xl">
      <slot />
    </motion.h2>
    <motion.p
      v-if="lede"
      :variants="fadeUp"
      class="mt-5 max-w-[58ch] text-lg text-pretty text-fg-muted"
    >
      {{ lede }}
    </motion.p>
  </motion.header>
</template>
