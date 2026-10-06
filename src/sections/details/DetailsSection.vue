<script setup lang="ts">
import Construct from "@/components/scroll/Construct.vue";
import Highlight from "@/components/ui/Highlight.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import Explorer from "./Explorer.vue";
</script>

<template>
  <section
    id="details"
    aria-labelledby="details-title"
    class="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
  >
    <SectionHeading
      id="details-title"
      eyebrow="Spot the details"
      lede="Pick an angle, then tap the numbers."
    >
      Every inch <Highlight>says something</Highlight>.
    </SectionHeading>
    <Construct>
      <Explorer />
    </Construct>
  </section>
</template>
