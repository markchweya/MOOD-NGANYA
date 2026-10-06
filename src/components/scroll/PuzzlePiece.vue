<script setup lang="ts">
import { motion, useMotionValue, useTransform } from "motion-v";
import { computed, inject } from "vue";
import { puzzleKey, scatter } from "./puzzle";

/** A piece that flies in from a scattered position and snaps into its slot. */
const { index } = defineProps<{ index: number }>();

const board = inject(puzzleKey, null);
const progress = board?.progress ?? useMotionValue(1);

// Each piece lands at a slightly different moment, from its own direction.
const start = Math.abs(scatter(index + 7)) * 0.35;
const range = [start, start + 0.6];
const motionStyle = {
  x: useTransform(progress, range, [scatter(index + 1) * 260, 0]),
  y: useTransform(progress, range, [scatter(index + 2) * 200 + 120, 0]),
  rotate: useTransform(progress, range, [scatter(index + 3) * 40, 0]),
  scale: useTransform(progress, range, [0.7, 1]),
  opacity: useTransform(progress, [start, start + 0.25], [0, 1]),
};
const style = computed(() => (!board || board.reduced.value ? {} : motionStyle));
</script>

<template>
  <motion.div :style="style" class="will-change-transform">
    <slot />
  </motion.div>
</template>
