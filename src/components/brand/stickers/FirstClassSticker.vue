<script setup lang="ts">
import { DISPLAY_FONT, INK } from "./tokens";
/** The amber diamond sign hung off the grille. */
</script>

<template>
  <svg viewBox="0 0 150 150" aria-hidden="true">
    <g transform="rotate(45 75 75)">
      <rect
        x="27"
        y="27"
        width="96"
        height="96"
        rx="8"
        fill="var(--color-first-class)"
        :stroke="INK"
        stroke-width="5"
      />
      <rect
        x="34"
        y="34"
        width="82"
        height="82"
        rx="5"
        fill="none"
        :stroke="INK"
        stroke-width="2.5"
      />
    </g>
    <g
      :font-family="DISPLAY_FONT"
      font-size="21"
      :fill="INK"
      text-anchor="middle"
      transform="rotate(-20 75 75)"
    >
      <text x="75" y="72">FIRST</text>
      <text x="75" y="95">CLASS</text>
    </g>
  </svg>
</template>
