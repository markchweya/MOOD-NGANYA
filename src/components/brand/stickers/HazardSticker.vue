<script setup lang="ts">
import { INK } from "./tokens";
/** The yellow hazard triangle from the rear art. */
</script>

<template>
  <svg viewBox="0 0 120 108" aria-hidden="true">
    <path
      d="M60 6l54 94H6Z"
      fill="var(--color-smiley)"
      :stroke="INK"
      stroke-width="7"
      stroke-linejoin="round"
    />
    <path d="M66 34 48 66h14l-8 24 22-34H62Z" :fill="INK" />
  </svg>
</template>
