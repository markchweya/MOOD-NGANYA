<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { Shuffle } from "lucide-vue-next";
import { motion } from "motion-v";
import { computed, ref, shallowRef } from "vue";
import { stickerRegistry } from "@/components/brand/stickers/registry";
import IconButton from "@/components/ui/IconButton.vue";
import { stickerWall } from "@/content/stickers";
import type { StickerPlacement } from "@/content/types";

/** Mood's stickers on a side-panel background. Drag them anywhere; shuffle re-slaps them. */

/** Wall width the layout in content/stickers.ts was designed for. */
const DESIGN_WIDTH = 1000;

const BACKGROUND = `radial-gradient(30% 40% at 18% 70%, var(--color-cloud-violet) 0 60%, transparent 61%),
  radial-gradient(22% 30% at 30% 55%, var(--color-cloud-violet) 0 60%, transparent 61%),
  radial-gradient(26% 34% at 82% 28%, color-mix(in srgb, var(--color-cloud-violet) 85%, var(--color-mood-purple)) 0 60%, transparent 61%),
  linear-gradient(160deg, var(--color-purple-glow), var(--color-mood-purple) 45%, var(--color-purple-night))`;

function shuffled(placements: readonly StickerPlacement[]): StickerPlacement[] {
  return placements.map((p) => ({
    ...p,
    x: Math.round(Math.random() * 80),
    y: Math.round(Math.random() * 80),
    rotate: Math.round(Math.random() * 30 - 15),
  }));
}

const wall = ref<HTMLDivElement | null>(null);
const { width } = useElementSize(wall, undefined, { box: "border-box" });
const scale = computed(() =>
  width.value ? Math.max(0.45, Math.min(1, width.value / DESIGN_WIDTH)) : 1,
);
const layout = shallowRef<readonly StickerPlacement[]>(stickerWall);
const round = ref(0);
const top = ref<number | null>(null);

const stickers = computed(() =>
  layout.value.map((placement, i) => {
    const art = stickerRegistry[placement.sticker];
    const w = placement.width * scale.value;
    return {
      key: `${String(round.value)}-${String(i)}`,
      placement,
      art,
      style: {
        left: `${String(placement.x)}%`,
        top: `${String(placement.y)}%`,
        width: `${String(w)}px`,
        height: `${String(w / art.aspect)}px`,
        zIndex: top.value === i ? 20 : 1,
      },
    };
  }),
);

function shuffle() {
  layout.value = shuffled(stickerWall);
  round.value += 1;
}
</script>

<template>
  <div
    ref="wall"
    class="relative h-[560px] touch-none overflow-hidden rounded-[32px] border-4 border-ink shadow-[12px_12px_0_var(--color-purple-night)] md:h-[640px]"
    :style="{ background: BACKGROUND }"
  >
    <motion.div
      v-for="(sticker, i) in stickers"
      :key="sticker.key"
      role="img"
      :aria-label="sticker.placement.label"
      drag
      :drag-constraints="wall ?? false"
      :drag-elastic="0.15"
      drag-momentum
      :initial="{ scale: 0, rotate: sticker.placement.rotate - 30, opacity: 0 }"
      :animate="{ scale: 1, rotate: sticker.placement.rotate, opacity: 1 }"
      :transition="{ type: 'spring', stiffness: 380, damping: 15, delay: i * 0.04 }"
      :while-hover="{ scale: 1.05 }"
      :while-drag="{
        scale: 1.12,
        rotate: 0,
        filter: 'drop-shadow(10px 18px 14px rgb(0 0 0 / 0.45))',
      }"
      class="absolute cursor-grab drop-shadow-[3px_6px_6px_rgb(0_0_0/0.4)] active:cursor-grabbing"
      :style="sticker.style"
      @drag-start="top = i"
    >
      <component
        :is="sticker.art.component"
        v-bind="sticker.art.props"
        class="pointer-events-none size-full"
      />
    </motion.div>
    <div class="absolute right-4 bottom-4 z-30">
      <IconButton
        label="Shuffle the stickers"
        tooltip="top"
        size="lg"
        tone="primary"
        @click="shuffle"
      >
        <Shuffle />
      </IconButton>
    </div>
  </div>
</template>
