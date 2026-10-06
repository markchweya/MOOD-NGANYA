<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useToast } from "@/composables/useToast";
import { spring } from "@/lib/motion";

const { toast } = useToast();
</script>

<template>
  <div
    aria-live="polite"
    class="pointer-events-none fixed inset-x-0 bottom-28 z-[70] flex justify-center"
  >
    <AnimatePresence mode="popLayout">
      <motion.p
        v-if="toast"
        :key="toast.id"
        role="status"
        :initial="{ opacity: 0, y: 24, scale: 0.85 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: 12, scale: 0.9 }"
        :transition="spring"
        class="flex items-center gap-2.5 rounded-full border-2 border-ink bg-smiley px-5 py-3 font-semibold text-ink shadow-[4px_4px_0_var(--color-ink)]"
      >
        <span
          v-if="toast.swatch"
          aria-hidden="true"
          class="size-4 rounded-full border-2 border-ink"
          :style="{ background: toast.swatch }"
        />
        {{ toast.message }}
      </motion.p>
    </AnimatePresence>
  </div>
</template>
