import { useEffect, useState } from "react";

/**
 * The id of the section crossing the middle of the viewport, for highlighting
 * the matching navigation item.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    const elements = ids.map((id) => document.getElementById(id)).filter((el) => el !== null);
    elements.forEach((el) => {
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
    };
  }, [ids]);

  return active;
}
