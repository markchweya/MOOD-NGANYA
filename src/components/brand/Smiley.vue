<script setup lang="ts">
import { SMILEY_DEAD, SMILEY_FACE, SMILEY_MELTING } from "./smileyPaths";

/**
 * The drippy smiley as painted on Mood: mustard face, ink outline, melting drips.
 * - `dead`: X-X eyes, wavy grin and tongue out, as on the mirror housings.
 * - `melting`: eyes running down in streaks and a wide grin, as on the windshield.
 */
export type SmileyVariant = "dead" | "melting";

const { variant = "dead", title } = defineProps<{
  variant?: SmileyVariant;
  /** Accessible name. Without it the smiley is decorative. */
  title?: string;
}>();
</script>

<template>
  <svg
    viewBox="0 0 100 116"
    :role="title ? 'img' : undefined"
    :aria-label="title"
    :aria-hidden="title ? undefined : 'true'"
  >
    <path
      :d="SMILEY_FACE"
      fill="var(--color-smiley)"
      stroke="var(--color-ink)"
      stroke-width="3"
      stroke-linejoin="round"
    />
    <g stroke="var(--color-ink)" stroke-linecap="round" fill="none">
      <template v-if="variant === 'dead'">
        <path :d="SMILEY_DEAD.eyes" stroke-width="4.5" />
        <path :d="SMILEY_DEAD.grin" stroke-width="4.5" />
        <path
          :d="SMILEY_DEAD.tongue"
          fill="var(--color-atmos-white)"
          stroke-width="3"
          stroke-linejoin="round"
        />
      </template>
      <template v-else>
        <path :d="SMILEY_MELTING.eyes" fill="var(--color-ink)" stroke="none" />
        <path :d="SMILEY_MELTING.grin" stroke-width="5" />
        <path :d="SMILEY_MELTING.dimples" stroke-width="4" />
      </template>
    </g>
  </svg>
</template>
