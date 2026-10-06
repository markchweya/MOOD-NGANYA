<script setup lang="ts">
import { motion, useScroll, useSpring } from "motion-v";

/** Hairline along the top of the viewport that fills as the page is read. */
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
</script>

<template>
  <motion.div
    aria-hidden="true"
    :style="{ scaleX }"
    class="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-mood-purple via-neon-pink to-smiley"
  />
</template>
