<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { AnimatePresence, motion } from "motion-v";
import { computed } from "vue";
import IconButton from "@/components/ui/IconButton.vue";
import { useTheme } from "@/composables/useTheme";

/** Sun/moon button: the icon spins over and the new theme spreads out from it. */
const { theme, toggleTheme } = useTheme();
const next = computed(() => (theme.value === "dark" ? "light" : "dark"));

function onClick(event: MouseEvent) {
  const el = event.currentTarget;
  if (!(el instanceof HTMLElement)) {
    toggleTheme();
    return;
  }
  const rect = el.getBoundingClientRect();
  toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
}
</script>

<template>
  <IconButton :label="`Switch to ${next} mode`" @click="onClick">
    <AnimatePresence mode="wait" :initial="false">
      <motion.span
        :key="theme"
        :initial="{ rotate: -90, scale: 0, opacity: 0 }"
        :animate="{ rotate: 0, scale: 1, opacity: 1 }"
        :exit="{ rotate: 90, scale: 0, opacity: 0 }"
        :transition="{ duration: 0.25 }"
        class="grid place-items-center"
      >
        <Sun v-if="theme === 'dark'" />
        <Moon v-else />
      </motion.span>
    </AnimatePresence>
  </IconButton>
</template>
