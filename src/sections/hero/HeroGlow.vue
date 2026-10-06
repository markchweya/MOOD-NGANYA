<script setup lang="ts">
import { motion } from "motion-v";
/** Night-only bloom echoing the windshield neon: two soft lights that breathe. */
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden dark:block"
  >
    <motion.div
      class="absolute top-[10%] right-[8%] size-[42vmax] rounded-full bg-neon-pink/25 blur-[120px]"
      :animate="{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }"
      :transition="{ duration: 6, repeat: Infinity, ease: 'easeInOut' }"
    />
    <motion.div
      class="absolute bottom-[-10%] left-[-5%] size-[38vmax] rounded-full bg-led-violet/30 blur-[120px]"
      :animate="{ opacity: [1, 0.5, 1], scale: [1.05, 1, 1.05] }"
      :transition="{ duration: 8, repeat: Infinity, ease: 'easeInOut' }"
    />
  </div>
</template>
