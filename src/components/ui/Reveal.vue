<script setup lang="ts">
import { motion } from "motion-v";
import { fadeUp } from "@/lib/motion";

/** Fades content up the first time it scrolls into view. */
const { amount = 0.25 } = defineProps<{
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
}>();
</script>

<template>
  <motion.div
    :variants="fadeUp"
    initial="hidden"
    while-in-view="show"
    :in-view-options="{ once: true, amount }"
  >
    <slot />
  </motion.div>
</template>
