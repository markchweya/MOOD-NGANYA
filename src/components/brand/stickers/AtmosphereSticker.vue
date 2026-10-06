<script setup lang="ts">
import { DISPLAY_FONT, INK } from "./tokens";
/** The cracked white lettering across the tailgate. */
</script>

<template>
  <svg viewBox="0 0 440 90" aria-hidden="true">
    <text
      x="220"
      y="72"
      text-anchor="middle"
      :font-family="DISPLAY_FONT"
      font-size="66"
      fill="var(--color-atmos-white)"
      :stroke="INK"
      stroke-width="6"
      paint-order="stroke"
      textLength="420"
      lengthAdjust="spacingAndGlyphs"
    >
      ATMOSPHERE
    </text>
    <path
      d="M60 18l10 22-8 10 12 26M150 14l-6 24 10 8-8 30M250 16l8 20-10 14 6 28M340 18l-8 22 12 12-6 24"
      fill="none"
      :stroke="INK"
      stroke-width="2.5"
      stroke-linejoin="round"
    />
  </svg>
</template>
