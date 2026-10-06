<script setup lang="ts">
import type { Video } from "@/content/types";
import { publicUrl } from "@/lib/publicUrl";

/** H.264 first for hardware decoding everywhere, VP9 for builds without it. */
const { video } = defineProps<{ video: Video }>();
</script>

<template>
  <source :src="publicUrl(`${video.src}.mp4`)" type="video/mp4" />
  <source :src="publicUrl(`${video.src}.webm`)" type="video/webm" />
</template>
