<script setup lang="ts">
import Smiley from "../Smiley.vue";
/** The red warning triangle from the rear art, with a smiley inside. */
</script>

<template>
  <svg viewBox="0 0 120 108" aria-hidden="true">
    <path
      d="M60 6l54 94H6Z"
      fill="var(--color-atmos-white)"
      stroke="var(--color-tail-red)"
      stroke-width="11"
      stroke-linejoin="round"
    />
    <Smiley variant="dead" x="40" y="44" width="40" height="46" />
  </svg>
</template>
