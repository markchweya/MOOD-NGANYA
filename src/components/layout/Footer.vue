<script setup lang="ts">
import NoRiskSticker from "@/components/brand/stickers/NoRiskSticker.vue";
import WindshieldSticker from "@/components/brand/stickers/WindshieldSticker.vue";
import JoinSides from "@/components/scroll/JoinSides.vue";
import Reveal from "@/components/ui/Reveal.vue";
import { photos } from "@/content/photos";

/** The windshield logo and motto slide in from opposite sides and meet in the middle. */
const credits = [...new Set(Object.values(photos).flatMap((p) => (p.credit ? [p.credit] : [])))];
const year = new Date().getFullYear();
</script>

<template>
  <footer class="overflow-x-clip border-t-4 border-mood-purple px-5 pt-16 pb-32 text-center">
    <JoinSides class="mx-auto grid max-w-md justify-items-center gap-5">
      <template #left>
        <WindshieldSticker
          role="img"
          aria-label="MOOD"
          aria-hidden="false"
          class="mx-auto h-auto w-72"
        />
      </template>
      <template #right>
        <NoRiskSticker class="mx-auto h-auto w-56" />
      </template>
    </JoinSides>
    <Reveal>
      <p class="mt-5 text-sm text-fg-muted">
        © {{ year }} MOOD · Photos: {{ credits.join(", ") }} · Nairobi 🇰🇪
      </p>
    </Reveal>
  </footer>
</template>
