import { createContext } from "react";
import type { Theme } from "./theme";

export interface ThemeContextValue {
  theme: Theme;
  /** Switch theme; with an origin, the new theme spreads out from that point. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
