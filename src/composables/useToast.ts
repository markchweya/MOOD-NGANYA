import { readonly, ref } from "vue";

export interface Toast {
  id: number;
  message: string;
  swatch?: string;
}

const DURATION_MS = 1800;

/** One toast at a time; a new one replaces the old. The store lives at module scope. */
const current = ref<Toast | null>(null);
let timer: number | undefined;

function show(message: string, swatch?: string): void {
  window.clearTimeout(timer);
  current.value = { id: Date.now(), message, ...(swatch ? { swatch } : {}) };
  timer = window.setTimeout(() => {
    current.value = null;
  }, DURATION_MS);
}

export function useToast() {
  return { toast: readonly(current), show };
}
