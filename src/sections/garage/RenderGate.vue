<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import { watch } from "vue";

/** Pauses the render loop while the garage is off screen, so it costs nothing there. */
const { active } = defineProps<{ active: boolean }>();

const loop = useLoop();
watch(
  () => active,
  (on) => {
    if (on) loop.start();
    else loop.stop();
  },
  { immediate: true },
);
</script>

<template>
  <slot />
</template>
