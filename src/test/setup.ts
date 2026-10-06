import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { cleanup as cleanupVue } from "@testing-library/vue";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  cleanupVue();
});

// jsdom lacks these browser APIs; the app only needs them to exist.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", NoopObserver);
vi.stubGlobal("ResizeObserver", NoopObserver);
vi.stubGlobal(
  "matchMedia",
  (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList,
);
