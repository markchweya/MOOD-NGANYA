<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { onBeforeUnmount, onMounted, ref } from "vue";
import Wordmark from "@/components/brand/Wordmark.vue";
import { easeOut } from "@/lib/motion";
import { markIntroSeen } from "./intro";

/** Purple curtain: the wordmark slaps on, then the panel wipes up to reveal the hero. */
const emit = defineEmits<{ done: [] }>();

const HOLD_MS = 1500;
const visible = ref(true);
let timer: number | undefined;

onMounted(() => {
  markIntroSeen();
  timer = window.setTimeout(() => {
    visible.value = false;
  }, HOLD_MS);
});
onBeforeUnmount(() => {
  window.clearTimeout(timer);
});
</script>

<template>
  <AnimatePresence @exit-complete="emit('done')">
    <motion.div
      v-if="visible"
      aria-hidden="true"
      class="fixed inset-0 z-[95] grid place-items-center bg-purple-night"
      :initial="{ clipPath: 'inset(0 0 0% 0)' }"
      :exit="{ clipPath: 'inset(0 0 100% 0)' }"
      :transition="{ duration: 0.9, ease: easeOut }"
    >
      <motion.div
        :exit="{ y: -60, opacity: 0 }"
        :transition="{ duration: 0.5, ease: easeOut }"
        class="text-[clamp(3.5rem,14vw,9rem)]"
      >
        <Wordmark animated />
      </motion.div>
    </motion.div>
  </AnimatePresence>
</template>
