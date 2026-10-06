<script setup lang="ts">
import { motion } from "motion-v";
import { shallowRef } from "vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import JoinSides from "@/components/scroll/JoinSides.vue";
import Highlight from "@/components/ui/Highlight.vue";
import IconButton from "@/components/ui/IconButton.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { socials } from "@/content/brand";
import type { Video } from "@/content/types";
import { videos } from "@/content/videos";
import { stagger } from "@/lib/motion";
import ReelCard from "./ReelCard.vue";
import VideoPlayer from "./VideoPlayer.vue";

const instagram = socials[0];
const playing = shallowRef<Video | null>(null);
const reelVariants = stagger(0.12);
</script>

<template>
  <section
    id="videos"
    aria-labelledby="videos-title"
    class="relative mx-auto max-w-6xl px-5 pt-36 pb-24 md:px-8"
  >
    <JoinSides class="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
      <template #left>
        <div>
          <SectionHeading
            id="videos-title"
            eyebrow="Mood in motion"
            lede="Lights, art, bass and the people. Tap a clip to watch it with sound."
            class="mb-8 md:mb-8"
          >
            Photos don't do it <Highlight>justice</Highlight>.
          </SectionHeading>
          <IconButton
            v-if="instagram"
            :href="`${instagram.href}reels/`"
            external
            :label="`More videos on Instagram, ${instagram.handle}`"
            size="lg"
          >
            <InstagramIcon />
          </IconButton>
        </div>
      </template>
      <template #right>
        <motion.div
          :variants="reelVariants"
          initial="hidden"
          while-in-view="show"
          :in-view-options="{ once: true, amount: 0.3 }"
          class="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pt-2 pb-8 has-[figure:only-child]:justify-center md:mx-0"
        >
          <ReelCard
            v-for="video in videos"
            :key="video.id"
            :video="video"
            @open="playing = $event"
          />
        </motion.div>
      </template>
    </JoinSides>
    <VideoPlayer :video="playing" @close="playing = null" />
  </section>
</template>
