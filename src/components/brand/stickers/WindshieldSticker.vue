<script setup lang="ts">
import Smiley from "../Smiley.vue";
import { DISPLAY_FONT, INK } from "./tokens";
/** The windshield banner logo: white MOOD with a purple 3D drop and a smiley. */
</script>

<template>
  <svg viewBox="0 0 380 140" aria-hidden="true">
    <g :font-family="DISPLAY_FONT" font-size="112" text-anchor="middle" stroke-linejoin="round">
      <text
        x="198"
        y="122"
        fill="var(--color-purple-night)"
        stroke="var(--color-purple-night)"
        stroke-width="14"
      >
        MOOD
      </text>
      <text
        x="194"
        y="118"
        fill="var(--color-mood-purple)"
        stroke="var(--color-mood-purple)"
        stroke-width="14"
      >
        MOOD
      </text>
      <text
        x="190"
        y="112"
        fill="var(--color-atmos-white)"
        :stroke="INK"
        stroke-width="7"
        paint-order="stroke"
      >
        MOOD
      </text>
    </g>
    <Smiley variant="dead" x="304" y="0" width="58" height="67" />
  </svg>
</template>
