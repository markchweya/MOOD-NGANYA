<script setup lang="ts">
import { Html } from "@tresjs/cientos";
import { useLoop } from "@tresjs/core";
import { AnimatePresence, motion } from "motion-v";
import { ref } from "vue";
import { busHotspots } from "@/content/garage";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { faceAnchor, facesCamera, type Vec3 } from "./busGeometry";

/**
 * Numbered dots pinned to the bus. Each is an HTML button anchored to its 3D
 * point, shown only while its face is turned towards the camera, so the dots
 * on the far side never float through the bus. The picked one shows its name.
 */
const { selected } = defineProps<{ selected: number | null }>();
const emit = defineEmits<{ select: [index: number] }>();

const spots = busHotspots.map((spot) => ({
  ...spot,
  anchor: faceAnchor(spot.face, spot.x, spot.y),
}));
const visible = ref(spots.map(() => false));

const { onBeforeRender } = useLoop();
onBeforeRender(({ camera }) => {
  const eye = camera.value?.position;
  if (!eye) return;
  const at: Vec3 = [eye.x, eye.y, eye.z];
  spots.forEach((spot, i) => {
    const next = facesCamera(spot.anchor, at);
    // Only touch reactive state when something changes, not every frame.
    if (visible.value[i] !== next) visible.value[i] = next;
  });
});
</script>

<template>
  <TresGroup>
    <Html
      v-for="(spot, i) in spots"
      :key="spot.title"
      :position="spot.anchor.position"
      center
      :z-index-range="[30, 0]"
      wrapper-class="garage-hotspot"
    >
      <AnimatePresence>
        <motion.div
          v-if="visible[i]"
          class="relative"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :exit="{ scale: 0, opacity: 0 }"
          :transition="{ ...spring, delay: (i % 8) * 0.03 }"
        >
          <button
            type="button"
            :aria-label="`${spot.title}. ${spot.text}`"
            :aria-pressed="selected === i"
            :class="
              cn(
                'relative grid size-7 place-items-center rounded-full border-2 font-sans text-xs font-bold shadow-lg transition-[transform,background-color] hover:scale-125',
                selected === i
                  ? 'border-atmos-white bg-tail-red text-atmos-white'
                  : 'border-ink bg-smiley text-ink',
              )
            "
            data-cursor="hover"
            @click="emit('select', i)"
          >
            <span
              v-if="selected !== i"
              aria-hidden="true"
              class="absolute inset-0 animate-ping rounded-full border-2 border-smiley opacity-60"
            />
            {{ i + 1 }}
          </button>
          <AnimatePresence>
            <motion.span
              v-if="selected === i"
              aria-hidden="true"
              class="pointer-events-none absolute top-1/2 left-[calc(100%+10px)] -translate-y-1/2 rounded-full border-2 border-ink bg-atmos-white px-3 py-1 font-display text-xs whitespace-nowrap text-ink shadow-[3px_3px_0_var(--color-ink)]"
              :initial="{ opacity: 0, x: -8 }"
              :animate="{ opacity: 1, x: 0 }"
              :exit="{ opacity: 0, x: -8 }"
            >
              {{ spot.title }}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </Html>
  </TresGroup>
</template>
