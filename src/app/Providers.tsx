import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/features/theme/ThemeProvider";
import { ToastProvider } from "@/features/toast/ToastProvider";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
