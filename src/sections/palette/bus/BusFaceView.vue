<script setup lang="ts">
import { motion } from "motion-v";
import { computed } from "vue";
import type { Cutout } from "@/content/cutouts";
import type { BusFace, Swatch } from "@/content/types";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

/** One side of the bus: the cutout with a pulsing dot on every colour that lives there. */
const { face, cutout, swatches, selected } = defineProps<{
  face: BusFace;
  cutout: Cutout;
  swatches: readonly Swatch[];
  selected: Swatch | null;
}>();
const emit = defineEmits<{ select: [swatch: Swatch] }>();

const here = computed(() =>
  swatches.flatMap((swatch) => (swatch.spot?.face === face ? [{ swatch, spot: swatch.spot }] : [])),
);
</script>

<template>
  <div
    class="absolute inset-0 [backface-visibility:hidden]"
    :style="{ transform: face === 'back' ? 'rotateY(180deg)' : undefined }"
  >
    <img
      :src="cutout.src"
      :srcset="cutout.srcSet"
      sizes="(min-width: 1024px) 34rem, 90vw"
      :width="cutout.width"
      :height="cutout.height"
      :alt="cutout.alt"
      draggable="false"
      class="size-full object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.4)] select-none"
    />
    <motion.button
      v-for="({ swatch, spot }, i) in here"
      :key="swatch.hex"
      type="button"
      :aria-label="`${swatch.name}, ${swatch.hex}`"
      :aria-pressed="selected?.hex === swatch.hex"
      :initial="{ scale: 0 }"
      :while-in-view="{ scale: 1 }"
      :in-view-options="{ once: true }"
      :transition="{ ...spring, delay: 0.3 + i * 0.05 }"
      :while-hover="{ scale: 1.25 }"
      :while-press="{ scale: 0.9 }"
      :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
      :class="
        cn(
          'absolute -mt-3.5 -ml-3.5 size-7 rounded-full border-[3px] shadow-lg transition-[border-color,box-shadow]',
          selected?.hex === swatch.hex
            ? 'z-10 border-atmos-white shadow-[0_0_0_3px_var(--color-ink),0_0_24px_4px_var(--glow)]'
            : 'border-atmos-white/90',
        )
      "
      @click="emit('select', swatch)"
    >
      <span class="absolute inset-0 rounded-full" :style="{ background: swatch.hex }" />
      <span
        v-if="selected?.hex !== swatch.hex"
        aria-hidden="true"
        class="absolute -inset-1 animate-ping rounded-full border-2 opacity-60"
        :style="{ borderColor: swatch.hex }"
      />
    </motion.button>
  </div>
</template>
