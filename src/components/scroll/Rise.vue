<script setup lang="ts">
import { motion, useTransform } from "motion-v";
import { computed, ref } from "vue";
import { useEntranceProgress } from "@/composables/useEntranceProgress";

/** The content comes up like a sheet being lifted into place, tilting flat as it lands. */
const anchor = ref<HTMLElement | null>(null);
const { progress, reduced } = useEntranceProgress(anchor, 0.45);

const y = useTransform(progress, [0, 1], [160, 0]);
const scale = useTransform(progress, [0, 1], [0.9, 1]);
const rotateX = useTransform(progress, [0, 1], [18, 0]);
const borderRadius = useTransform(progress, [0, 1], [64, 32]);
const opacity = useTransform(progress, [0, 0.4], [0, 1]);

const style = computed(() =>
  reduced.value
    ? {}
    : {
        y,
        scale,
        rotateX,
        borderRadius,
        opacity,
        transformPerspective: 1200,
        transformOrigin: "50% 100%",
      },
);
</script>

<template>
  <div ref="anchor">
    <motion.div :style="style" class="will-change-transform">
      <slot />
    </motion.div>
  </div>
</template>
