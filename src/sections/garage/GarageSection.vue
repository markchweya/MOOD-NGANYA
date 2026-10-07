<script setup lang="ts">
import { useEventListener, useIntersectionObserver } from "@vueuse/core";
import { ChevronsUp, LoaderCircle, Move3d, RotateCcw } from "lucide-vue-next";
import { AnimatePresence, motion, useReducedMotion } from "motion-v";
import { defineAsyncComponent, ref } from "vue";
import Construct from "@/components/scroll/Construct.vue";
import Highlight from "@/components/ui/Highlight.vue";
import IconButton from "@/components/ui/IconButton.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import { cutouts } from "@/content/cutouts";

/**
 * The garage: a WebGL scene where the shutter rolls up on MOOD under strip
 * lights. Three.js only loads as the section approaches, and the scene only
 * renders while it is on screen. Without WebGL, the head-on cutout stands in.
 */
const GarageScene = defineAsyncComponent(() => import("./GarageScene.vue"));

const stage = ref<HTMLElement | null>(null);
const near = ref(false);
const onScreen = ref(false);
useIntersectionObserver(
  stage,
  ([entry]) => {
    if (entry?.isIntersecting) near.value = true;
  },
  { rootMargin: "800px 0px" },
);
useIntersectionObserver(stage, ([entry]) => {
  onScreen.value = entry?.isIntersecting ?? false;
});

const webgl = (() => {
  try {
    return document.createElement("canvas").getContext("webgl2") !== null;
  } catch {
    return false;
  }
})();

const reducedMotion = useReducedMotion();
const ready = ref(false);
const opened = ref(false);
const selected = ref<number | null>(null);

function select(index: number | null) {
  selected.value = selected.value === index ? null : index;
}

useEventListener(window, "keydown", (event: KeyboardEvent) => {
  if (event.key === "Escape" && selected.value !== null) selected.value = null;
});
</script>

<template>
  <section
    id="garage"
    aria-labelledby="garage-title"
    class="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
  >
    <SectionHeading id="garage-title" eyebrow="The garage">
      Every inch <Highlight>says something</Highlight>.
    </SectionHeading>

    <Construct>
      <div
        ref="stage"
        class="relative aspect-[4/5] overflow-hidden rounded-[32px] border-4 border-ink bg-purple-night shadow-slab sm:aspect-[4/3] lg:aspect-[16/9]"
      >
        <template v-if="webgl">
          <GarageScene
            v-if="near"
            :active="onScreen"
            :opened="opened"
            :selected="selected"
            :reduced-motion="reducedMotion"
            @ready="ready = true"
            @open="opened = true"
            @select="select"
          />

          <AnimatePresence>
            <motion.div
              v-if="!ready"
              class="absolute inset-0 grid place-items-center text-atmos-white/70"
              :exit="{ opacity: 0 }"
            >
              <LoaderCircle class="size-10 animate-spin" aria-hidden="true" />
              <span class="sr-only">Loading the garage</span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              v-if="ready && !opened"
              class="absolute inset-x-0 bottom-6 flex justify-center"
              :initial="{ opacity: 0, y: 16 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: 16 }"
            >
              <span class="animate-bounce">
                <IconButton
                  label="Open the garage"
                  tone="primary"
                  size="lg"
                  tooltip="top"
                  @click="opened = true"
                >
                  <ChevronsUp />
                </IconButton>
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              v-if="opened"
              class="absolute right-4 bottom-4 flex items-center gap-2"
              :initial="{ opacity: 0, scale: 0.8 }"
              :animate="{ opacity: 1, scale: 1, transition: { delay: 2.4 } }"
              :exit="{ opacity: 0 }"
            >
              <span
                class="grid size-11 place-items-center rounded-full border-2 border-atmos-white/20 bg-ink/50 text-atmos-white/80 backdrop-blur"
                title="Drag to look around"
                aria-hidden="true"
              >
                <Move3d class="size-5" />
              </span>
              <IconButton
                v-if="selected !== null"
                label="Step back"
                tone="primary"
                tooltip="top"
                @click="selected = null"
              >
                <RotateCcw />
              </IconButton>
            </motion.div>
          </AnimatePresence>
        </template>

        <img
          v-else
          :src="cutouts.frontCrisp.src"
          :srcset="cutouts.frontCrisp.srcSet"
          sizes="(min-width: 1024px) 40rem, 90vw"
          :alt="cutouts.frontCrisp.alt"
          class="mx-auto h-full w-auto object-contain p-8"
        />
      </div>
    </Construct>
  </section>
</template>
