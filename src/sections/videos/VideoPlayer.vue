<script setup lang="ts">
import { motion } from "motion-v";
import Modal from "@/components/ui/Modal.vue";
import type { Video } from "@/content/types";
import { publicUrl } from "@/lib/publicUrl";
import VideoSources from "./VideoSources.vue";

/** Full-screen player that grows out of the reel card and plays with sound. */
const { video } = defineProps<{ video: Video | null }>();
const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <Modal :open="video !== null" :label="video?.caption ?? 'Video'" @close="emit('close')">
    <motion.div
      v-if="video"
      :layout-id="`reel-${video.id}`"
      class="overflow-hidden rounded-[28px] border-4 border-ink bg-ink"
      :style="{ aspectRatio: `${video.width} / ${video.height}`, height: 'min(86svh, 900px)' }"
    >
      <!-- eslint-disable-next-line vuejs-accessibility/media-has-caption -- street ambience and music, no speech to caption -->
      <video
        :poster="publicUrl(video.poster)"
        autoplay
        controls
        playsinline
        class="size-full object-cover"
      >
        <VideoSources :video="video" />
      </video>
    </motion.div>
  </Modal>
</template>
