import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
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

  const toggleTheme = useCallback(() => {
    setTheme((previous) => {
      const next = previous === "dark" ? "light" : "dark";
      storeTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext value={value}>{children}</ThemeContext>;
}
