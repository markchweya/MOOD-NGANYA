<script setup lang="ts">
import { motion } from "motion-v";
import Smiley from "@/components/brand/Smiley.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import JoinSides from "@/components/scroll/JoinSides.vue";
import Highlight from "@/components/ui/Highlight.vue";
import IconButton from "@/components/ui/IconButton.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { manifesto, socials } from "@/content/brand";
import WordByWord from "./WordByWord.vue";

const lines = manifesto.slice(0, 3);
</script>

<template>
  <section
    id="family"
    aria-labelledby="family-title"
    class="relative mx-auto max-w-4xl px-5 py-28 text-center md:py-40"
  >
    <motion.div
      :initial="{ scale: 0, rotate: -40 }"
      :while-in-view="{ scale: 1, rotate: 0 }"
      :in-view-options="{ once: true }"
      :transition="{ type: 'spring', stiffness: 260, damping: 12 }"
      class="mx-auto mb-8 w-24"
    >
      <Smiley variant="dead" class="h-auto w-full" />
    </motion.div>
    <SectionHeading id="family-title" eyebrow="The Mood Family" align="center">
      <JoinSides inline class="inline-flex flex-wrap justify-center gap-x-[0.28em]">
        <template #left>Too rare to be</template>
        <template #right><Highlight>compared</Highlight>.</template>
      </JoinSides>
    </SectionHeading>
    <div class="grid gap-4">
      <WordByWord v-for="(line, i) in lines" :key="line" :text="line" :index="i" />
    </div>
    <div class="mt-12 flex justify-center gap-3">
      <IconButton
        v-for="social in socials"
        :key="social.href"
        :href="social.href"
        external
        :label="`${social.label} · ${social.handle}`"
        tone="primary"
        size="lg"
      >
        <InstagramIcon />
      </IconButton>
    </div>
  </section>
</template>
