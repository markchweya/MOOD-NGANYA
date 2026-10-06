import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/**
 * The id of the section crossing the middle of the viewport, for highlighting
 * the matching navigation item.
 */
export function useActiveSection(ids: readonly string[]): Ref<string | null> {
  const active = ref<string | null>(null);
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id;
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return active;
}
