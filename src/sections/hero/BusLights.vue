<script setup lang="ts">
import { motion } from "motion-v";
import { FRONT_LAMPS } from "@/components/brand/busLamps";

/**
 * Night mode: soft light blooms over the bus's real lamps, pulsing slightly
 * out of step like a running light show. Purely decorative.
 */
const pct = (n: number) => `${String(n)}%`;
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 mix-blend-screen">
    <motion.span
      v-for="(lamp, i) in FRONT_LAMPS"
      :key="i"
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
      :style="{
        left: pct(lamp.x),
        top: pct(lamp.y),
        width: pct(lamp.w),
        height: pct(lamp.h),
        background: lamp.colour,
      }"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: [0.45, 0.95, 0.45] }"
      :transition="{ duration: 1.6, delay: lamp.delay, repeat: Infinity, ease: 'easeInOut' }"
    />
  </div>
</template>
