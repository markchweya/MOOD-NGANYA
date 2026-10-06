<script setup lang="ts">
import { motion } from "motion-v";
import type { Photo } from "@/content/types";
import { cn } from "@/lib/cn";

/** A photo card; its image morphs into the lightbox through a shared layout-id. */
const { photo, class: className } = defineProps<{ photo: Photo; class?: string }>();
const emit = defineEmits<{ open: [] }>();
</script>

<template>
  <button
    type="button"
    :aria-label="`View larger: ${photo.caption}`"
    :class="
      cn(
        'group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl border-4 border-ink',
        className,
      )
    "
    @click="emit('open')"
  >
    <motion.img
      :layout-id="`photo-${photo.id}`"
      :src="photo.src"
      :srcset="photo.srcSet"
      sizes="(min-width: 1024px) 30rem, (min-width: 768px) 33vw, 50vw"
      :alt="photo.alt"
      loading="lazy"
      class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
    <span
      class="absolute bottom-3 left-3 rounded-full border-2 border-ink bg-smiley px-3 py-1 text-xs font-bold text-ink"
    >
      {{ photo.caption }}{{ photo.credit ? ` · 📸 ${photo.credit}` : "" }}
    </span>
  </button>
</template>
