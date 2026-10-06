import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/features/theme/ThemeProvider";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </ThemeProvider>
    </MotionConfig>
  );
}
