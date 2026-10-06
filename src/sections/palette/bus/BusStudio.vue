<script setup lang="ts">
import { Hand, RotateCw } from "lucide-vue-next";
import { motion } from "motion-v";
import { shallowRef } from "vue";
import IconButton from "@/components/ui/IconButton.vue";
import { useTilt } from "@/composables/useTilt";
import { cutouts } from "@/content/cutouts";
import { palette } from "@/content/palette";
import type { Swatch } from "@/content/types";
import BusFaceView from "./BusFaceView.vue";
import { useBusRotation } from "./rotation";
import SwatchChips from "./SwatchChips.vue";
import SwatchDetail from "./SwatchDetail.vue";

/**
 * The palette on the bus itself: a front/back cutout pair in 3D. Drag or press
 * turn to spin it; tap a dot or a chip to read that colour.
 */
const swatches = palette.flatMap((group) => group.swatches);

const selected = shallowRef<Swatch | null>(swatches[0] ?? null);
const { rotateY, face, showFace, turn, dragHandlers } = useBusRotation();
const tilt = useTilt(6);

function select(swatch: Swatch) {
  selected.value = swatch;
  if (swatch.spot) showFace(swatch.spot.face);
}

function onPointerMove(event: PointerEvent) {
  dragHandlers.onPointermove(event);
  tilt.onPointerMove(event);
}
</script>

<template>
  <div class="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
    <div class="relative">
      <div
        aria-hidden="true"
        class="absolute inset-x-[10%] top-[12%] bottom-[18%] -z-10 rounded-full bg-mood-purple/30 blur-[90px] dark:bg-neon-pink/25"
      />
      <div
        class="relative mx-auto aspect-[1164/1251] w-full max-w-[34rem] cursor-grab touch-pan-y select-none [perspective:1400px] active:cursor-grabbing"
        data-cursor="hover"
        @pointerdown="dragHandlers.onPointerdown"
        @pointermove="onPointerMove"
        @pointerup="dragHandlers.onPointerup"
        @pointercancel="dragHandlers.onPointercancel"
        @pointerleave="tilt.onPointerLeave"
      >
        <motion.div
          :style="{ rotateY, rotateX: tilt.rotateX }"
          :animate="{ y: [0, -8, 0] }"
          :transition="{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }"
          class="absolute inset-0 [transform-style:preserve-3d]"
        >
          <BusFaceView
            face="front"
            :cutout="cutouts.frontCrisp"
            :swatches="swatches"
            :selected="selected"
            @select="select"
          />
          <BusFaceView
            face="back"
            :cutout="cutouts.back"
            :swatches="swatches"
            :selected="selected"
            @select="select"
          />
        </motion.div>
      </div>
      <div
        aria-hidden="true"
        class="mx-auto -mt-4 h-6 w-3/4 rounded-[100%] bg-ink/40 blur-xl dark:bg-black/70"
      />
      <div class="mt-4 flex items-center justify-center gap-3 text-sm text-fg-muted">
        <IconButton
          :label="face === 'front' ? 'Turn to the back' : 'Turn to the front'"
          tooltip="top"
          @click="turn"
        >
          <RotateCw />
        </IconButton>
        <span class="inline-flex items-center gap-1.5">
          <Hand class="size-4" aria-hidden="true" /> Drag to spin · tap a dot
        </span>
      </div>
    </div>

    <div class="grid gap-8">
      <SwatchDetail v-if="selected" :swatch="selected" />
      <SwatchChips :groups="palette" :selected="selected" @select="select" />
    </div>
  </div>
</template>
