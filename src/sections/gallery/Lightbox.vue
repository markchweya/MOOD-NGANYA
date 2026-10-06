<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { motion } from "motion-v";
import IconButton from "@/components/ui/IconButton.vue";
import Modal from "@/components/ui/Modal.vue";
import type { Photo } from "@/content/types";

/** The photo grows out of its tile into a full-screen view. Arrow keys step through. */
const { photo } = defineProps<{ photo: Photo | null }>();
const emit = defineEmits<{ close: []; step: [direction: 1 | -1] }>();

useEventListener(window, "keydown", (event: KeyboardEvent) => {
  if (photo === null) return;
  if (event.key === "ArrowRight") emit("step", 1);
  if (event.key === "ArrowLeft") emit("step", -1);
});
</script>

<template>
  <Modal :open="photo !== null" :label="photo?.caption ?? 'Photo'" @close="emit('close')">
    <figure v-if="photo" class="flex flex-col items-center">
      <motion.img
        :layout-id="`photo-${photo.id}`"
        :src="photo.src"
        :alt="photo.alt"
        :width="photo.width"
        :height="photo.height"
        class="max-h-[80svh] w-auto rounded-3xl border-4 border-ink object-contain"
      />
      <motion.figcaption
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0, transition: { delay: 0.2 } }"
        class="mt-4 text-center text-atmos-white/80"
      >
        {{ photo.caption }}{{ photo.credit ? ` · 📸 ${photo.credit}` : "" }}
      </motion.figcaption>
      <div class="mt-4 flex gap-3">
        <IconButton label="Previous photo" tooltip="none" @click="emit('step', -1)">
          <ChevronLeft />
        </IconButton>
        <IconButton label="Next photo" tooltip="none" @click="emit('step', 1)">
          <ChevronRight />
        </IconButton>
      </div>
    </figure>
  </Modal>
</template>
