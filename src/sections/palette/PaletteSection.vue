<script setup lang="ts">
import Highlight from "@/components/ui/Highlight.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import BusStudio from "./bus/BusStudio.vue";
</script>

<template>
  <section
    id="colours"
    aria-labelledby="colours-title"
    class="overflow-x-clip bg-bg-raised py-24 md:py-32"
  >
    <div class="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeading
        id="colours-title"
        eyebrow="The palette"
        lede="Measured straight off the matatu. Spin the bus, tap a dot, and see exactly where each colour lives."
      >
        Every colour, <Highlight>to the detail</Highlight>.
      </SectionHeading>
      <BusStudio />
    </div>
  </section>
</template>
