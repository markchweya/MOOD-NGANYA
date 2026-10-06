<script setup lang="ts">
import { DISPLAY_FONT, INK } from "./tokens";
/** The motto along the bottom of the windshield banner. */
</script>

<template>
  <svg viewBox="0 0 320 64" aria-hidden="true">
    <rect
      x="3"
      y="3"
      width="314"
      height="58"
      rx="10"
      :fill="INK"
      stroke="var(--color-drip-lilac)"
      stroke-width="4"
    />
    <text
      x="160"
      y="42"
      text-anchor="middle"
      :font-family="DISPLAY_FONT"
      font-size="25"
      fill="var(--color-atmos-white)"
      textLength="282"
      lengthAdjust="spacingAndGlyphs"
    >
      NO RISK, NO STORY
    </text>
  </svg>
</template>
