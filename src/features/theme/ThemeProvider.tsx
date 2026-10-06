import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { ThemeContext } from "./context";
import { applyTheme, currentTheme, readStoredTheme, storeTheme, type Theme } from "./theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow the device setting live until the visitor picks a theme themselves.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event: MediaQueryListEvent) => {
      if (!readStoredTheme()) setTheme(event.matches ? "light" : "dark");
    };
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
    };
  }, []);

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const flip = () => {
      setTheme((previous) => {
        const next = previous === "dark" ? "light" : "dark";
        storeTheme(next);
        applyTheme(next);
        return next;
      });
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!origin || reduceMotion || !("startViewTransition" in document)) {
      flip();
      return;
    }

    // Circular reveal: snapshot, flip synchronously, then grow the new theme from the button.
    const transition = document.startViewTransition(() => {
      flushSync(flip);
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
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext value={value}>{children}</ThemeContext>;
}
