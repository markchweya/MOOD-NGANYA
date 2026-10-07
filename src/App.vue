<script setup lang="ts">
import { VueLenis } from "lenis/vue";
import { MotionConfig, useReducedMotion } from "motion-v";
import { ref } from "vue";
import CursorFollower from "@/components/layout/CursorFollower.vue";
import Dock from "@/components/layout/Dock.vue";
import Footer from "@/components/layout/Footer.vue";
import Header from "@/components/layout/Header.vue";
import ScrollProgress from "@/components/layout/ScrollProgress.vue";
import ToastHost from "@/components/ui/ToastHost.vue";
import Intro from "@/features/intro/Intro.vue";
import { shouldPlayIntro } from "@/features/intro/intro";
import FamilySection from "@/sections/family/FamilySection.vue";
import GallerySection from "@/sections/gallery/GallerySection.vue";
import GarageSection from "@/sections/garage/GarageSection.vue";
import Hero from "@/sections/hero/Hero.vue";
import PaletteSection from "@/sections/palette/PaletteSection.vue";
import PhotoReel from "@/sections/reel/PhotoReel.vue";
import StickersSection from "@/sections/stickers/StickersSection.vue";
import VideosSection from "@/sections/videos/VideosSection.vue";

const ready = ref(!shouldPlayIntro());
const reduceMotion = useReducedMotion();
/** Inertial page scrolling; native scrolling when the visitor prefers reduced motion. */
const lenisOptions = { lerp: 0.1, anchors: { offset: -88 } };
</script>

<template>
  <MotionConfig reduced-motion="user">
    <VueLenis v-if="!reduceMotion" root auto-raf :options="lenisOptions" />
    <a
      href="#main"
      class="sr-only z-[90] rounded-full border-2 border-ink bg-smiley px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      Skip to content
    </a>
    <ScrollProgress />
    <Header />
    <main id="main">
      <Hero :waiting="!ready" />
      <PhotoReel />
      <VideosSection />
      <GarageSection />
      <PaletteSection />
      <StickersSection />
      <GallerySection />
      <FamilySection />
    </main>
    <Footer />
    <Dock />
    <CursorFollower />
    <ToastHost />
    <Intro v-if="!ready" @done="ready = true" />
  </MotionConfig>
</template>
