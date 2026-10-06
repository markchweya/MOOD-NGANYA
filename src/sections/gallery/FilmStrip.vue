<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { motion, useMotionValue, useScroll, useTransform } from "motion-v";
import { ref, watchEffect } from "vue";
import { galleryOrder, photos } from "@/content/photos";
import type { PhotoId } from "@/content/types";
import PhotoTile from "./PhotoTile.vue";

/**
 * Desktop gallery: the section pins while vertical scroll slides the photos
 * sideways like a film strip, stopping exactly at the last photo.
 * The heading comes from the default slot.
 */
const emit = defineEmits<{ open: [id: PhotoId] }>();

const container = ref<HTMLDivElement | null>(null);
const viewport = ref<HTMLDivElement | null>(null);
const track = ref<HTMLUListElement | null>(null);
const borderBox = { box: "border-box" } as const;
const { width: trackWidth } = useElementSize(track, undefined, borderBox);
const { width: viewportWidth } = useElementSize(viewport, undefined, borderBox);
const distance = useMotionValue(0);
watchEffect(() => {
  distance.set(Math.max(0, trackWidth.value - viewportWidth.value));
});

const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
/** Slide between 5% and 95% of the pinned scroll, over exactly the overflow. */
const x = useTransform(() => {
  const p = Math.min(1, Math.max(0, (scrollYProgress.get() - 0.05) / 0.9));
  return -distance.get() * p;
});
</script>

<template>
  <div ref="container" class="relative h-[280vh]">
    <div
      ref="viewport"
      class="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pb-24"
    >
      <div class="mx-auto w-full max-w-6xl px-8"><slot /></div>
      <motion.ul
        ref="track"
        :style="{ x }"
        class="flex w-max gap-6 px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
      >
        <li v-for="id in galleryOrder" :key="id" class="aspect-[4/5] h-[min(56svh,36rem)] shrink-0">
          <PhotoTile :photo="photos[id]" class="h-full" @open="emit('open', id)" />
        </li>
      </motion.ul>
    </div>
  </div>
</template>
