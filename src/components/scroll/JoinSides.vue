<script setup lang="ts">
import { motion, useTransform } from "motion-v";
import { computed, ref } from "vue";
import { useEntranceProgress } from "@/composables/useEntranceProgress";

/**
 * Two halves (the `left` and `right` slots) slide in from opposite edges and
 * lock together, with a slight overshoot in rotation as they meet.
 */
const { inline, endAt = 0.4 } = defineProps<{
  /** Render spans instead of divs, for use inside headings and other phrasing content. */
  inline?: boolean;
  /** Where the halves lock together; see useEntranceProgress. */
  endAt?: number | "in-view";
}>();

const anchor = ref<HTMLElement | null>(null);
const { progress, reduced } = useEntranceProgress(anchor, endAt);

function side(sign: 1 | -1) {
  return {
    x: useTransform(progress, [0, 1], [`${String(sign * 60)}vw`, "0vw"]),
    rotate: useTransform(progress, [0, 0.8, 1], [sign * 8, sign * -1.5, 0]),
    opacity: useTransform(progress, [0, 0.5], [0, 1]),
  };
}
const leftMotion = side(-1);
const rightMotion = side(1);

const leftStyle = computed(() => (reduced.value ? {} : leftMotion));
const rightStyle = computed(() => (reduced.value ? {} : rightMotion));
const tag = computed(() => (inline ? motion.span : motion.div));
const halfClass = computed(() => (inline ? "inline-block" : "min-w-0"));
</script>

<template>
  <component :is="inline ? 'span' : 'div'" ref="anchor" class="overflow-x-clip">
    <component :is="tag" :style="leftStyle" :class="halfClass"><slot name="left" /></component>
    <component :is="tag" :style="rightStyle" :class="halfClass"><slot name="right" /></component>
  </component>
</template>
