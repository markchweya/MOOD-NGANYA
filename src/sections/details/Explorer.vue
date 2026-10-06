<script setup lang="ts">
import { ZoomOut } from "lucide-vue-next";
import { AnimatePresence, motion } from "motion-v";
import { computed, ref } from "vue";
import IconButton from "@/components/ui/IconButton.vue";
import { explorerViews } from "@/content/details";
import { photos } from "@/content/photos";
import type { ExplorerView, ViewId } from "@/content/types";
import { cn } from "@/lib/cn";
import { easeOut, spring } from "@/lib/motion";

/**
 * Numbered hotspots over Mood's photos. Picking one zooms the photo into that
 * detail and pops its story into the card.
 */

/** How far the photo zooms into a picked hotspot. */
const ZOOM = 2;
const zoomSpring = { type: "spring", stiffness: 110, damping: 22 } as const;
const spotsVariants = { show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } };
const spotVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { ...spring, damping: 14 } },
};

const viewId = ref<ViewId>("head-on");
const selected = ref(0);
const zoomed = ref(false);

const view = computed(
  () => explorerViews.find((v) => v.id === viewId.value) ?? (explorerViews[0] as ExplorerView),
);
const photo = computed(() => photos[view.value.photo]);
const detail = computed(() => view.value.hotspots[selected.value] ?? view.value.hotspots[0]);

function changeView(id: ViewId) {
  viewId.value = id;
  selected.value = 0;
  zoomed.value = false;
}

function pick(index: number) {
  selected.value = index;
  zoomed.value = true;
}
</script>

<template>
  <div>
    <div role="tablist" aria-label="Choose a view" class="mb-8 flex gap-4">
      <button
        v-for="v in explorerViews"
        :key="v.id"
        type="button"
        role="tab"
        :aria-selected="v.id === view.id"
        :aria-label="`${v.label} view`"
        class="group relative size-16 rounded-full p-1"
        @click="changeView(v.id)"
      >
        <motion.span
          v-if="v.id === view.id"
          layout-id="view-ring"
          :transition="spring"
          class="absolute inset-0 rounded-full border-[3px] border-smiley"
        />
        <img
          :src="photos[v.photo].src"
          :srcset="photos[v.photo].srcSet"
          sizes="64px"
          alt=""
          :class="
            cn(
              'size-full rounded-full object-cover transition-opacity duration-300',
              v.id === view.id ? 'opacity-100' : 'opacity-50 group-hover:opacity-100',
            )
          "
        />
      </button>
    </div>

    <div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div
        role="tabpanel"
        :aria-label="`${view.label} view`"
        class="relative overflow-hidden rounded-3xl border-4 border-ink shadow-slab"
      >
        <motion.div
          :animate="{
            scale: zoomed ? ZOOM : 1,
            originX: (detail?.x ?? 50) / 100,
            originY: (detail?.y ?? 50) / 100,
          }"
          :transition="zoomSpring"
          class="relative"
        >
          <AnimatePresence mode="popLayout" :initial="false">
            <motion.img
              :key="photo.id"
              :src="photo.src"
              :srcset="photo.srcSet"
              sizes="(min-width: 1024px) 36rem, 100vw"
              :width="photo.width"
              :height="photo.height"
              :alt="photo.alt"
              loading="lazy"
              :initial="{ opacity: 0, scale: 1.04 }"
              :animate="{ opacity: 1, scale: 1 }"
              :exit="{ opacity: 0 }"
              :transition="{ duration: 0.6, ease: easeOut }"
              class="h-auto w-full"
            />
          </AnimatePresence>
          <motion.div
            :key="view.id"
            initial="hidden"
            animate="show"
            :variants="spotsVariants"
            class="absolute inset-0"
          >
            <motion.span
              v-for="(spot, i) in view.hotspots"
              :key="spot.title"
              :animate="{ scale: zoomed ? 1 / ZOOM : 1 }"
              :transition="zoomSpring"
              :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
              :class="cn('absolute -mt-4 -ml-4', i === selected && 'z-10')"
            >
              <motion.button
                type="button"
                :aria-label="`${i + 1}: ${spot.title}`"
                :aria-pressed="i === selected"
                :variants="spotVariants"
                :while-hover="{ scale: 1.2 }"
                :while-press="{ scale: 0.9 }"
                :class="
                  cn(
                    'relative grid size-8 place-items-center rounded-full border-2 font-sans text-sm font-bold shadow-lg transition-colors',
                    i === selected
                      ? 'border-atmos-white bg-tail-red text-atmos-white'
                      : 'border-ink bg-smiley text-ink',
                  )
                "
                @click="pick(i)"
              >
                <span
                  v-if="i !== selected"
                  aria-hidden="true"
                  class="absolute inset-0 animate-ping rounded-full border-2 border-smiley opacity-60"
                />
                {{ i + 1 }}
              </motion.button>
            </motion.span>
          </motion.div>
        </motion.div>
        <AnimatePresence>
          <motion.div
            v-if="zoomed"
            :initial="{ opacity: 0, scale: 0.6 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.6 }"
            class="absolute top-3 right-3 z-20"
          >
            <IconButton label="Zoom out" tone="primary" tooltip="none" @click="zoomed = false">
              <ZoomOut />
            </IconButton>
          </motion.div>
        </AnimatePresence>
      </div>

      <div class="grid gap-5 lg:sticky lg:top-28">
        <div
          aria-live="polite"
          class="relative min-h-40 overflow-hidden rounded-3xl border-2 border-mood-purple bg-surface p-6"
        >
          <AnimatePresence mode="wait" :initial="false">
            <motion.div
              v-if="detail"
              :key="`${view.id}-${String(selected)}`"
              :initial="{ opacity: 0, y: 16, scale: 0.97 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :exit="{ opacity: 0, y: -10 }"
              :transition="{ duration: 0.3, ease: easeOut }"
              class="flex gap-4"
            >
              <span
                class="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-tail-red font-display text-lg text-atmos-white"
              >
                {{ selected + 1 }}
              </span>
              <div>
                <h3 class="mb-2 text-xl">{{ detail.title }}</h3>
                <p class="text-fg-muted">{{ detail.text }}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <ol class="grid gap-2 sm:grid-cols-2">
          <li v-for="(spot, i) in view.hotspots" :key="spot.title">
            <button
              type="button"
              :aria-pressed="i === selected"
              class="relative flex w-full items-center gap-3 rounded-2xl border border-line px-3 py-2.5 text-left transition-colors hover:border-accent"
              @click="pick(i)"
            >
              <motion.span
                v-if="i === selected"
                layout-id="detail-row"
                :transition="spring"
                class="absolute inset-0 rounded-2xl bg-mood-purple/20 ring-1 ring-mood-purple"
              />
              <span
                class="relative grid size-6 shrink-0 place-items-center rounded-full bg-smiley text-xs font-bold text-ink"
              >
                {{ i + 1 }}
              </span>
              <span class="relative">{{ spot.title }}</span>
            </button>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
