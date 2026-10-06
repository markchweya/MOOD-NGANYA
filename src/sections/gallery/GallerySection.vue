<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { computed, ref } from "vue";
import Rise from "@/components/scroll/Rise.vue";
import Highlight from "@/components/ui/Highlight.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { galleryOrder, photos } from "@/content/photos";
import type { PhotoId } from "@/content/types";
import { cn } from "@/lib/cn";
import FilmStrip from "./FilmStrip.vue";
import Lightbox from "./Lightbox.vue";
import PhotoTile from "./PhotoTile.vue";

const openId = ref<PhotoId | null>(null);
const filmStrip = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
const openPhoto = computed(() => (openId.value ? photos[openId.value] : null));

function step(direction: 1 | -1) {
  const current = openId.value;
  if (!current) return;
  const index = galleryOrder.indexOf(current);
  const next = (index + direction + galleryOrder.length) % galleryOrder.length;
  openId.value = galleryOrder[next] ?? current;
}
</script>

<template>
  <section id="gallery" aria-labelledby="gallery-title" class="bg-bg-raised">
    <FilmStrip v-if="filmStrip" @open="openId = $event">
      <SectionHeading
        id="gallery-title"
        eyebrow="Gallery"
        lede="Keep scrolling. Tap any shot to see it full size."
        class="md:mb-10"
      >
        Catch the <Highlight>Mood</Highlight>.
      </SectionHeading>
    </FilmStrip>
    <div v-else class="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading id="gallery-title" eyebrow="Gallery" class="md:mb-10">
        Catch the <Highlight>Mood</Highlight>.
      </SectionHeading>
      <ul class="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
        <li
          v-for="(id, i) in galleryOrder"
          :key="id"
          :class="cn('md:col-span-2', i < 2 && 'col-span-2 md:col-span-3')"
        >
          <Rise>
            <PhotoTile :photo="photos[id]" class="aspect-[4/5]" @open="openId = id" />
          </Rise>
        </li>
      </ul>
    </div>
    <Lightbox :photo="openPhoto" @close="openId = null" @step="step" />
  </section>
</template>
