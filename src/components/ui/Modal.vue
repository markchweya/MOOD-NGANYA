<script setup lang="ts">
import { useLenis } from "lenis/vue";
import { X } from "lucide-vue-next";
import { AnimatePresence, motion } from "motion-v";
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import IconButton from "./IconButton.vue";

/**
 * Pop-up overlay: fades the backdrop, closes on Escape or backdrop click,
 * moves focus inside and hands it back on close, and pauses page scrolling.
 */
const { open, label } = defineProps<{
  open: boolean;
  /** Accessible name for the dialog. */
  label: string;
}>();
const emit = defineEmits<{ close: [] }>();

const lenis = useLenis();
const closeWrap = ref<HTMLDivElement | null>(null);
let previouslyFocused: HTMLElement | null = null;

function onKey(event: KeyboardEvent) {
  if (event.key === "Escape") emit("close");
}

function lock() {
  previouslyFocused = document.activeElement as HTMLElement | null;
  lenis.value?.stop();
  document.documentElement.style.overflow = "hidden";
  window.addEventListener("keydown", onKey);
  void nextTick(() => closeWrap.value?.querySelector("button")?.focus());
}

function unlock() {
  lenis.value?.start();
  document.documentElement.style.overflow = "";
  window.removeEventListener("keydown", onKey);
  previouslyFocused?.focus();
}

watch(
  () => open,
  (isOpen, wasOpen) => {
    if (isOpen) lock();
    else if (wasOpen) unlock();
  },
);
onBeforeUnmount(() => {
  if (open) unlock();
});
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open"
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        class="fixed inset-0 z-[80] grid place-items-center p-4 md:p-10"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.25 }"
      >
        <button
          type="button"
          aria-label="Close"
          tabindex="-1"
          class="absolute inset-0 bg-[rgb(10_3_16/0.82)] backdrop-blur-md"
          @click="emit('close')"
        />
        <div ref="closeWrap" class="absolute top-4 right-4 z-10 md:top-6 md:right-6">
          <IconButton label="Close" tone="primary" tooltip="none" @click="emit('close')">
            <X />
          </IconButton>
        </div>
        <div class="relative z-[1] max-h-full">
          <slot />
        </div>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>
