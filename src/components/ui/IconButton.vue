<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { computed, ref, useId } from "vue";
import { useMagnetic } from "@/composables/useMagnetic";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

/** Round icon-only button or link with a tooltip that pops on hover and focus. */
type Tone = "default" | "primary" | "ghost";
type Size = "md" | "lg";

const {
  label,
  tone = "default",
  size = "md",
  tooltip = "bottom",
  href,
  external,
  pressed,
  class: className,
} = defineProps<{
  /** Accessible name, also shown as the tooltip. */
  label: string;
  tone?: Tone;
  size?: Size;
  tooltip?: "top" | "bottom" | "none";
  /** Render a link instead of a button. */
  href?: string;
  external?: boolean;
  pressed?: boolean;
  class?: string;
}>();

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const tones: Record<Tone, string> = {
  default: "bg-surface text-fg border-line hover:border-mood-purple",
  primary: "bg-smiley text-ink border-ink shadow-[4px_4px_0_var(--color-ink)]",
  ghost: "bg-transparent text-fg-muted border-transparent hover:text-fg hover:bg-mood-purple/15",
};
const sizes: Record<Size, string> = {
  md: "size-11 [&_svg]:size-5",
  lg: "size-14 [&_svg]:size-6",
};

const showTip = ref(false);
const tipId = useId();
const magnetic = useMagnetic();

const linkAttrs = computed(() =>
  href === undefined
    ? { type: "button", "aria-pressed": pressed }
    : { href, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) },
);
</script>

<template>
  <component
    :is="href === undefined ? motion.button : motion.a"
    v-bind="linkAttrs"
    :aria-label="label"
    :aria-describedby="showTip && tooltip !== 'none' ? tipId : undefined"
    :class="
      cn(
        'relative inline-grid place-items-center rounded-full border-2 transition-colors',
        tones[tone],
        sizes[size],
        className,
      )
    "
    :style="{ x: magnetic.x, y: magnetic.y }"
    :while-hover="{ scale: 1.06 }"
    :while-press="{ scale: 0.92 }"
    :transition="spring"
    @pointermove="magnetic.onPointerMove"
    @pointerleave="magnetic.onPointerLeave"
    @mouseenter="showTip = true"
    @mouseleave="showTip = false"
    @focus="showTip = true"
    @blur="showTip = false"
    @click="(event: MouseEvent) => emit('click', event)"
  >
    <slot />
    <AnimatePresence>
      <motion.span
        v-if="showTip && tooltip !== 'none'"
        :id="tipId"
        role="tooltip"
        :initial="{ opacity: 0, y: tooltip === 'top' ? 6 : -6, scale: 0.9 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.9 }"
        :transition="{ duration: 0.16 }"
        :class="
          cn(
            'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded-lg bg-fg px-2.5 py-1.5',
            'font-sans text-xs font-semibold whitespace-nowrap text-bg',
            tooltip === 'top' ? 'bottom-[calc(100%+10px)]' : 'top-[calc(100%+10px)]',
          )
        "
      >
        {{ label }}
      </motion.span>
    </AnimatePresence>
  </component>
</template>
