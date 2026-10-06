<script setup lang="ts">
import { computed } from "vue";
import { DISPLAY_FONT, INK } from "./tokens";

/** The personalised MOOD number plate. Front plates are white, rear plates yellow. */
const { side = "front" } = defineProps<{ side?: "front" | "rear" }>();
const fill = computed(() =>
  side === "front" ? "var(--color-atmos-white)" : "var(--color-plate-yellow)",
);
</script>

<template>
  <svg viewBox="0 0 280 80" aria-hidden="true">
    <rect x="3" y="3" width="274" height="74" rx="9" :fill="fill" :stroke="INK" stroke-width="5" />
    <!-- Kenyan flag -->
    <svg x="14" y="18" width="24" height="16" viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#000" />
      <rect y="6" width="30" height="8" fill="#fff" />
      <rect y="7.2" width="30" height="5.6" fill="#bb0000" />
      <rect y="14" width="30" height="6" fill="#006600" />
      <ellipse cx="15" cy="10" rx="3" ry="8" fill="#bb0000" stroke="#fff" stroke-width=".8" />
    </svg>
    <text
      x="158"
      y="60"
      text-anchor="middle"
      :font-family="DISPLAY_FONT"
      font-size="46"
      :fill="INK"
      letter-spacing="4"
    >
      MOOD
    </text>
  </svg>
</template>
