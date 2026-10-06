<script setup lang="ts">
import { motion, useTransform } from "motion-v";
import { computed, ref } from "vue";
import { useEntranceProgress } from "@/composables/useEntranceProgress";

/**
 * The content is assembled block by block, from the bottom row up, as it
 * scrolls into view, like something being constructed.
 */
const COLS = 8;
const ROWS = 5;
const BLOCKS = COLS * ROWS;
/** Share of the progress each block spends shrinking away. */
const BLOCK_SPAN = 0.32;

const anchor = ref<HTMLElement | null>(null);
const { progress, reduced } = useEntranceProgress(anchor, 0.3);

// Build from the ground up: bottom row first, sweeping left to right with a slight stagger.
const blocks = Array.from({ length: BLOCKS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const order = (ROWS - 1 - row) * COLS + col;
  const start = (order / BLOCKS) * (1 - BLOCK_SPAN);
  const range = [start, start + BLOCK_SPAN];
  return {
    key: i,
    style: {
      scale: useTransform(progress, range, [1.02, 0]),
      rotate: useTransform(progress, range, [0, col % 2 ? 45 : -45]),
      left: `${String((col / COLS) * 100)}%`,
      top: `${String((row / ROWS) * 100)}%`,
      width: `${String(100 / COLS)}%`,
      height: `${String(100 / ROWS)}%`,
    },
  };
});

const scale = useTransform(progress, [0, 1], [0.94, 1]);
const wrapStyle = computed(() => (reduced.value ? {} : { scale }));
</script>

<template>
  <div ref="anchor">
    <motion.div :style="wrapStyle" class="relative">
      <slot />
      <div v-if="!reduced" aria-hidden="true" class="pointer-events-none absolute -inset-px z-10">
        <motion.span
          v-for="block in blocks"
          :key="block.key"
          :style="block.style"
          class="absolute border border-smiley/40 bg-bg bg-[repeating-linear-gradient(135deg,transparent_0_14px,color-mix(in_srgb,var(--color-smiley)_14%,transparent)_14px_22px)]"
        />
      </div>
    </motion.div>
  </div>
</template>
