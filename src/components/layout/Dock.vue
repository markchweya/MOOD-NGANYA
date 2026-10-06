<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { ref } from "vue";
import { sectionLinks } from "@/app/navigation";
import { useActiveSection } from "@/composables/useActiveSection";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

/** Floating icon dock; the purple pill slides to the section on screen. */
const active = useActiveSection(sectionLinks.map((link) => link.id));
const hovered = ref<string | null>(null);
</script>

<template>
  <motion.nav
    aria-label="Sections"
    :initial="{ y: 120, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ ...spring, delay: 0.8 }"
    class="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
  >
    <ul
      class="flex items-center gap-1 rounded-full border border-line bg-bg/75 p-1.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] backdrop-blur-xl"
    >
      <li v-for="link in sectionLinks" :key="link.id" class="relative">
        <a
          :href="`#${link.id}`"
          :aria-label="link.label"
          :aria-current="active === link.id ? 'true' : undefined"
          :class="
            cn(
              'relative grid size-11 place-items-center rounded-full transition-colors duration-300',
              active === link.id ? 'text-atmos-white' : 'text-fg-muted hover:text-fg',
            )
          "
          @mouseenter="hovered = link.id"
          @mouseleave="hovered = null"
          @focus="hovered = link.id"
          @blur="hovered = null"
        >
          <motion.span
            v-if="active === link.id"
            layout-id="dock-active"
            :transition="spring"
            class="absolute inset-0 rounded-full bg-mood-purple shadow-[0_0_24px_-4px_var(--color-mood-purple)]"
          />
          <component :is="link.icon" class="relative size-5" :stroke-width="2" />
        </a>
        <AnimatePresence>
          <motion.span
            v-if="hovered === link.id"
            role="tooltip"
            :initial="{ opacity: 0, y: 6, scale: 0.9 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.9 }"
            :transition="{ duration: 0.15 }"
            class="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 rounded-lg bg-fg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-bg"
          >
            {{ link.label }}
          </motion.span>
        </AnimatePresence>
      </li>
    </ul>
  </motion.nav>
</template>
