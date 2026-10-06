<script setup lang="ts">
import { motion } from "motion-v";
import { computed } from "vue";
import { cn } from "@/lib/cn";
import { popIn, stagger } from "@/lib/motion";
import Smiley from "./Smiley.vue";

/** MOOD spelled the way the mirror tags spell it: the O's are the nganya's drippy smileys. */
const {
  animated,
  waiting,
  class: className,
} = defineProps<{
  /** Play the slap-on entrance. */
  animated?: boolean;
  /** With `animated`, hold the entrance while this is true (e.g. behind the intro). */
  waiting?: boolean;
  class?: string;
}>();

const container = computed(() =>
  animated
    ? { variants: stagger(0.09, 0.15), initial: "hidden", animate: waiting ? "hidden" : "show" }
    : {},
);
const piece = computed(() => (animated ? { variants: popIn } : {}));
</script>

<template>
  <motion.span
    role="img"
    aria-label="MOOD"
    :class="cn('inline-flex items-center leading-none whitespace-nowrap text-sticker', className)"
    v-bind="container"
  >
    <motion.span aria-hidden="true" class="inline-block" v-bind="piece">M</motion.span>
    <motion.span
      aria-hidden="true"
      class="mx-[0.02em] inline-block w-[0.86em] drop-sticker"
      v-bind="piece"
    >
      <Smiley variant="dead" class="h-auto w-full -translate-y-[0.04em]" />
    </motion.span>
    <motion.span
      aria-hidden="true"
      class="mx-[0.02em] inline-block w-[0.86em] drop-sticker"
      v-bind="piece"
    >
      <Smiley variant="melting" class="h-auto w-full -translate-y-[0.04em]" />
    </motion.span>
    <motion.span aria-hidden="true" class="inline-block" v-bind="piece">D</motion.span>
  </motion.span>
</template>
