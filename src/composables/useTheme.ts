import { nextTick, readonly, ref } from "vue";
import {
  applyTheme,
  currentTheme,
  readStoredTheme,
  storeTheme,
  type Theme,
} from "@/features/theme/theme";

/** One theme for the whole app; the store lives at module scope. */
const theme = ref<Theme>(currentTheme());
let following = false;

/** Follow the device setting live until the visitor picks a theme themselves. */
function followDevice(): void {
  if (following) return;
  following = true;
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
    if (readStoredTheme()) return;
    theme.value = event.matches ? "light" : "dark";
    applyTheme(theme.value);
  });
}

function flip(): void {
  theme.value = theme.value === "dark" ? "light" : "dark";
  storeTheme(theme.value);
  applyTheme(theme.value);
}

/**
 * Switch theme. With an origin, the new theme spreads out in a circle from that
 * point using the View Transitions API; otherwise it switches instantly.
 */
function toggleTheme(origin?: { x: number; y: number }): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!origin || reduceMotion || !("startViewTransition" in document)) {
    flip();
    return;
  }

  const transition = document.startViewTransition(async () => {
    flip();
    await nextTick();
  });
  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );
  void transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${String(origin.x)}px ${String(origin.y)}px)`,
          `circle(${String(radius)}px at ${String(origin.x)}px ${String(origin.y)}px)`,
        ],
      },
      {
        duration: 650,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

export function useTheme() {
  followDevice();
  return { theme: readonly(theme), toggleTheme };
}
