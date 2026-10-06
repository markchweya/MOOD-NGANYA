<script setup lang="ts">
import { motion, useMotionValueEvent, useScroll } from "motion-v";
import { ref } from "vue";
import Wordmark from "@/components/brand/Wordmark.vue";
import { easeOut } from "@/lib/motion";
import ThemeToggle from "./ThemeToggle.vue";

/** Bare floating logo and theme toggle; they tuck away while scrolling down and return on scroll up. */
const { scrollY } = useScroll();
const hidden = ref(false);

useMotionValueEvent(scrollY, "change", (y) => {
  const previous = scrollY.getPrevious() ?? 0;
  hidden.value = y > previous && y > 240;
});
</script>

<template>
  <motion.header
    :animate="{ y: hidden ? '-120%' : '0%' }"
    :transition="{ duration: 0.35, ease: easeOut }"
    class="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-3 py-2">
      <a href="#top" aria-label="MOOD, back to top" class="rounded-full px-2 text-3xl">
        <Wordmark />
      </a>
      <ThemeToggle />
    </div>
  </motion.header>
</template>
