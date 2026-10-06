<script setup lang="ts">
import { motion } from "motion-v";
import { easeOut } from "@/lib/motion";

/** Each word of a line drops in after the one before. */
const { text, index } = defineProps<{ text: string; index: number }>();

const words = text.split(" ");
const word = {
  hidden: { opacity: 0, y: 24, rotate: -6 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: easeOut } },
};
</script>

<template>
  <motion.p
    initial="hidden"
    while-in-view="show"
    :in-view-options="{ once: true, amount: 0.8 }"
    :transition="{ staggerChildren: 0.06, delayChildren: index * 0.15 }"
    class="font-hand text-3xl leading-tight md:text-5xl"
    :style="{ rotate: index % 2 ? 1.5 : -1.5 }"
  >
    <motion.span
      v-for="(w, i) in words"
      :key="`${w}-${String(i)}`"
      :variants="word"
      class="mr-[0.25em] inline-block"
    >
      {{ w }}
    </motion.span>
  </motion.p>
</template>
