<script setup lang="ts">
import { Play } from "lucide-vue-next";
import { motion, useInView } from "motion-v";
import { ref, watch } from "vue";
import { useTilt } from "@/composables/useTilt";
import type { Video } from "@/content/types";
import { fadeUp } from "@/lib/motion";
import { publicUrl } from "@/lib/publicUrl";
import VideoSources from "./VideoSources.vue";

/** Vertical clip that plays silently while on screen; tap to open it with sound. */
const { video } = defineProps<{ video: Video }>();
const emit = defineEmits<{ open: [video: Video] }>();

const player = ref<HTMLVideoElement | null>(null);
const inView = useInView(player, { amount: 0.6 });
const tilt = useTilt(8);

watch(inView, (visible) => {
  const el = player.value;
  if (!el) return;
  if (visible) void el.play().catch(() => undefined);
  else el.pause();
});
</script>

<template>
  <motion.figure :variants="fadeUp" class="w-[min(320px,78vw)] shrink-0 snap-center">
    <motion.button
      type="button"
      :layout-id="`reel-${video.id}`"
      :aria-label="`Play with sound: ${video.caption}`"
      :while-hover="{ y: -8 }"
      :while-press="{ scale: 0.97 }"
      class="group relative block w-full overflow-hidden rounded-[28px] border-4 border-ink bg-ink shadow-slab"
      :style="{
        aspectRatio: `${video.width} / ${video.height}`,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 900,
      }"
      @click="emit('open', video)"
      @pointermove="tilt.onPointerMove"
      @pointerleave="tilt.onPointerLeave"
    >
      <video
        ref="player"
        :poster="publicUrl(video.poster)"
        muted
        loop
        playsinline
        preload="none"
        class="size-full object-cover"
      >
        <VideoSources :video="video" />
      </video>
      <span
        class="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30"
      >
        <span
          class="grid size-16 scale-75 place-items-center rounded-full border-2 border-ink bg-smiley text-ink opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100"
        >
          <Play class="ml-1 size-7 fill-current" />
        </span>
      </span>
    </motion.button>
    <figcaption class="mt-5 font-semibold">
      {{ video.caption }}
      <small v-if="video.credit" class="mt-1 block font-normal text-fg-muted">
        {{ video.credit }}
      </small>
    </figcaption>
  </motion.figure>
</template>
