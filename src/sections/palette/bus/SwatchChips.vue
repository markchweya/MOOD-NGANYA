<script setup lang="ts">
import { motion } from "motion-v";
import PuzzleBoard from "@/components/scroll/PuzzleBoard.vue";
import PuzzlePiece from "@/components/scroll/PuzzlePiece.vue";
import type { PaletteGroup, Swatch } from "@/content/types";
import { spring } from "@/lib/motion";

/** Every measured colour as a round chip, grouped; they assemble like puzzle pieces. */
const { groups, selected } = defineProps<{
  groups: readonly PaletteGroup[];
  selected: Swatch | null;
}>();
const emit = defineEmits<{ select: [swatch: Swatch] }>();
</script>

<template>
  <PuzzleBoard class="grid gap-5">
    <div v-for="(group, groupIndex) in groups" :key="group.name">
      <p class="mb-2 font-display text-[0.7rem] tracking-[0.2em] text-fg-muted uppercase">
        {{ group.name }}
      </p>
      <ul class="flex flex-wrap gap-2.5">
        <li v-for="(swatch, i) in group.swatches" :key="swatch.hex">
          <PuzzlePiece :index="groupIndex * 10 + i">
            <button
              type="button"
              :aria-label="`${swatch.name}, ${swatch.hex}`"
              :aria-pressed="selected?.hex === swatch.hex"
              :title="swatch.name"
              class="relative grid size-11 place-items-center rounded-full transition-transform hover:scale-110"
              @click="emit('select', swatch)"
            >
              <motion.span
                v-if="selected?.hex === swatch.hex"
                layout-id="chip-ring"
                :transition="spring"
                class="absolute -inset-1 rounded-full border-[3px] border-accent"
              />
              <span
                class="size-full rounded-full border-[3px] border-ink"
                :style="{ background: swatch.hex }"
              />
            </button>
          </PuzzlePiece>
        </li>
      </ul>
    </div>
  </PuzzleBoard>
</template>
