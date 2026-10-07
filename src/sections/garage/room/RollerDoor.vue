<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect } from "vue";
import { shutterBump, shutterPaint } from "../surfaces";

/**
 * The roller shutter across the garage opening, tagged with the MOOD wordmark.
 * `open` runs 0 (down) to 1 (rolled up): the curtain shortens from the bottom
 * into the drum while its slats scroll, so it reads as rolling, not sliding.
 * Emits `open` when clicked.
 */
const { open, width, height, z } = defineProps<{
  open: number;
  width: number;
  height: number;
  /** The plane of the opening. */
  z: number;
}>();
const emit = defineEmits<{ open: [] }>();

const SLATS = 28;
const bump = shutterBump(SLATS);
const paint = shutterPaint();
onBeforeUnmount(() => {
  bump.dispose();
  paint.dispose();
});

/** What's left of the curtain, never quite zero so the bottom bar stays in the drum. */
const visible = computed(() => Math.max(0.001, 1 - open));
watchEffect(() => {
  // Show only the bottom of the painting as it rolls up; the rest is on the drum.
  for (const texture of [bump, paint]) texture.repeat.y = visible.value;
});

function onPointerEnter() {
  document.body.style.cursor = "pointer";
}
function onPointerLeave() {
  document.body.style.cursor = "";
}
onBeforeUnmount(onPointerLeave);
</script>

<template>
  <TresGroup :position="[0, 0, z]">
    <!-- Curtain: its top edge stays at the drum, its bottom rises. -->
    <TresMesh
      :position="[0, height - (height * visible) / 2, 0]"
      :scale="[1, visible, 1]"
      @click="emit('open')"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    >
      <TresPlaneGeometry :args="[width, height]" />
      <TresMeshStandardMaterial
        :map="paint"
        color="#ffffff"
        :bump-map="bump"
        :bump-scale="3"
        :metalness="0.65"
        :roughness="0.45"
      />
    </TresMesh>
    <!-- Bottom bar. -->
    <TresMesh :position="[0, height * (1 - visible) + 0.04, 0.03]">
      <TresBoxGeometry :args="[width, 0.08, 0.08]" />
      <TresMeshStandardMaterial color="#1b1820" :metalness="0.8" :roughness="0.35" />
    </TresMesh>
    <!-- Drum, behind the header; it fattens a little as the curtain wraps around it. -->
    <TresMesh
      :position="[0, height + 0.25, -0.35]"
      :rotation="[0, 0, Math.PI / 2]"
      :scale="[1 + open * 0.35, 1, 1 + open * 0.35]"
    >
      <TresCylinderGeometry :args="[0.3, 0.3, width + 0.2, 32]" />
      <TresMeshStandardMaterial color="#2c2833" :metalness="0.7" :roughness="0.4" />
    </TresMesh>
  </TresGroup>
</template>
