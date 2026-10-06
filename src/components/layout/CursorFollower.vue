<script setup lang="ts">
import { useEventListener, useMediaQuery } from "@vueuse/core";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion-v";
import { computed, ref, watchEffect } from "vue";

/**
 * Replaces the system pointer on mouse and trackpad: a mustard dot that tracks
 * exactly, and a ring that trails on a spring, swells over anything clickable
 * and squeezes on press. Touch devices and reduced-motion visitors keep the
 * native cursor.
 */
const INTERACTIVE = "a, button, [role='tab'], [role='img'][aria-label], [data-cursor='hover']";

const reduceMotion = useReducedMotion();
const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
const enabled = computed(() => finePointer.value && !reduceMotion.value);

const hovering = ref(false);
const pressed = ref(false);
const visible = ref(false);
const x = useMotionValue(-100);
const y = useMotionValue(-100);
const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

watchEffect((onCleanup) => {
  if (!enabled.value) return;
  const root = document.documentElement;
  root.classList.add("custom-cursor");
  onCleanup(() => {
    root.classList.remove("custom-cursor");
  });
});

useEventListener(
  window,
  "pointermove",
  (event: PointerEvent) => {
    if (!enabled.value) return;
    x.set(event.clientX);
    y.set(event.clientY);
    visible.value = true;
    hovering.value = event.target instanceof Element && event.target.closest(INTERACTIVE) !== null;
  },
  { passive: true },
);
useEventListener(window, "pointerdown", () => {
  pressed.value = true;
});
useEventListener(window, "pointerup", () => {
  pressed.value = false;
});
useEventListener(document, "pointerleave", () => {
  visible.value = false;
});
</script>

<template>
  <div
    v-if="enabled"
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 z-[99]"
    :style="{ opacity: visible ? 1 : 0 }"
  >
    <motion.div :style="{ x: ringX, y: ringY }" class="absolute top-0 left-0">
      <motion.div
        :animate="{ scale: pressed ? 0.75 : hovering ? 1.8 : 1, opacity: hovering ? 0.5 : 0.9 }"
        :transition="{ type: 'spring', stiffness: 320, damping: 22 }"
        class="-mt-5 -ml-5 size-10 rounded-full border-2 border-smiley"
      />
    </motion.div>
    <motion.div :style="{ x, y }" class="absolute top-0 left-0">
      <motion.div
        :animate="{ scale: pressed ? 0.6 : hovering ? 0 : 1 }"
        :transition="{ type: 'spring', stiffness: 500, damping: 28 }"
        class="-mt-1.5 -ml-1.5 size-3 rounded-full bg-smiley shadow-[0_0_0_2px_var(--color-ink)]"
      />
    </motion.div>
  </div>
</template>
