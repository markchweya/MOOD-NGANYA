<script setup lang="ts">
import { DISPLAY_FONT } from "./tokens";
/** "Thou Shall Not TRY ME": gold and magenta with a white die-cut edge, a key and flowers. */
const GOLD = "var(--color-tryme-gold)";
const MAGENTA = "var(--color-tryme-magenta)";
</script>

<template>
  <svg viewBox="0 0 320 160" aria-hidden="true">
    <!-- die-cut edge + magenta border, with the raised arch for the script -->
    <path
      d="M14 62q0-14 16-16l74-2q14-36 56-38 42 2 56 38l74 2q16 2 16 16v74q0 16-16 16H30q-16 0-16-16Z"
      :fill="MAGENTA"
      stroke="var(--color-atmos-white)"
      stroke-width="10"
      stroke-linejoin="round"
    />
    <path
      d="M24 66q0-10 12-10l76-2q12-36 48-38 36 2 48 38l76 2q12 0 12 10v66q0 10-12 10H36q-12 0-12-10Z"
      :fill="GOLD"
    />

    <!-- key -->
    <circle cx="44" cy="80" r="10" fill="none" :stroke="MAGENTA" stroke-width="4" />
    <path
      d="M52 86l20 18m-8-7-6 6m12-1-6 6"
      :stroke="MAGENTA"
      stroke-width="4"
      stroke-linecap="round"
    />

    <!-- flowers -->
    <g :fill="MAGENTA">
      <circle cx="262" cy="84" r="10" />
      <circle cx="280" cy="98" r="10" />
      <circle cx="262" cy="112" r="10" />
      <circle cx="244" cy="98" r="10" />
    </g>
    <circle cx="262" cy="98" r="6" :fill="GOLD" />

    <text
      x="160"
      y="46"
      text-anchor="middle"
      font-family="'Permanent Marker', cursive"
      font-size="25"
      transform="rotate(-5 160 46)"
      :fill="GOLD"
      :stroke="MAGENTA"
      stroke-width="5"
      paint-order="stroke"
      stroke-linejoin="round"
    >
      Thou Shall Not
    </text>
    <text
      x="156"
      y="128"
      text-anchor="middle"
      :font-family="DISPLAY_FONT"
      font-size="56"
      letter-spacing="2"
      :fill="GOLD"
      :stroke="MAGENTA"
      stroke-width="10"
      stroke-linejoin="round"
      paint-order="stroke"
    >
      TRY ME
    </text>
  </svg>
</template>
