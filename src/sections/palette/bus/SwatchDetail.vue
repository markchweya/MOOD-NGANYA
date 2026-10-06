<script setup lang="ts">
import { Copy } from "lucide-vue-next";
import { AnimatePresence, motion } from "motion-v";
import { computed } from "vue";
import IconButton from "@/components/ui/IconButton.vue";
import { useToast } from "@/composables/useToast";
import { chipUrl } from "@/content/palette";
import type { Swatch } from "@/content/types";
import { copyText } from "@/lib/clipboard";
import { easeOut } from "@/lib/motion";

/** The picked colour: a big swatch, the photo crop it came from, and a copy button. */
const { swatch } = defineProps<{ swatch: Swatch }>();

const { show } = useToast();
const chip = computed(() => chipUrl(swatch.chip));

async function copy() {
  const ok = await copyText(swatch.hex);
  show(ok ? `Copied ${swatch.hex}` : swatch.hex, swatch.hex);
}
</script>

<template>
  <div
    aria-live="polite"
    class="relative min-h-[17rem] overflow-hidden rounded-[2rem] border-[3px] border-ink bg-surface"
  >
    <AnimatePresence mode="wait" :initial="false">
      <motion.div
        :key="swatch.hex"
        :initial="{ opacity: 0, y: 20, scale: 0.97 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: -12 }"
        :transition="{ duration: 0.35, ease: easeOut }"
      >
        <div class="relative h-32 border-b-[3px] border-ink" :style="{ background: swatch.hex }">
          <motion.img
            v-if="chip"
            :src="chip"
            alt=""
            :initial="{ scale: 0.4, rotate: -20 }"
            :animate="{ scale: 1, rotate: 0 }"
            :transition="{ type: 'spring', stiffness: 300, damping: 16, delay: 0.1 }"
            class="absolute right-5 -bottom-9 size-20 rounded-full border-4 border-atmos-white object-cover outline-2 outline-ink"
          />
        </div>
        <div class="flex items-end justify-between gap-4 p-6 pt-8">
          <div>
            <h3 class="text-2xl">{{ swatch.name }}</h3>
            <p class="mt-1 font-mono text-lg font-bold tracking-wide">{{ swatch.hex }}</p>
            <p class="mt-2 text-fg-muted">{{ swatch.where }}</p>
            <p class="mt-2 text-xs text-fg-muted/80">Measured: {{ swatch.measuredFrom }}</p>
          </div>
          <IconButton :label="`Copy ${swatch.hex}`" tone="primary" @click="copy">
            <Copy />
          </IconButton>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
