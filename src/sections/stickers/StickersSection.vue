<script setup lang="ts">
import Rise from "@/components/scroll/Rise.vue";
import Highlight from "@/components/ui/Highlight.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import StickerWall from "./StickerWall.vue";
</script>

<template>
  <section
    id="stickers"
    aria-labelledby="stickers-title"
    class="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
  >
    <SectionHeading
      id="stickers-title"
      eyebrow="Sticker wall"
      lede="Every sticker on Mood, redrawn. Drag them around and make your own panel."
    >
      Slap it <Highlight>on the panel</Highlight>.
    </SectionHeading>
    <Rise>
      <StickerWall />
    </Rise>
  </section>
</template>
