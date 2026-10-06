<script setup lang="ts">
import { provide, ref } from "vue";
import { useEntranceProgress } from "@/composables/useEntranceProgress";
import { puzzleKey } from "./puzzle";

/** Holds puzzle pieces; their assembly is driven by this board's scroll position. */
const anchor = ref<HTMLElement | null>(null);
provide(puzzleKey, useEntranceProgress(anchor, 0.4));
</script>

<template>
  <div ref="anchor"><slot /></div>
</template>
