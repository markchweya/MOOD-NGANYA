import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { spring } from "@/lib/motion";
import { ToastContext } from "./context";

interface Toast {
  id: number;
  message: string;
  swatch?: string;
}

const DURATION_MS = 1800;

/** One toast at a time; a new one replaces the old with a pop. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((message: string, swatch?: string) => {
    window.clearTimeout(timer.current);
    setToast({ id: Date.now(), message, ...(swatch ? { swatch } : {}) });
    timer.current = window.setTimeout(() => {
      setToast(null);
    }, DURATION_MS);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
    },
    [],
  );

  return (
    <ToastContext value={show}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-28 z-[70] flex justify-center"
      >
        <AnimatePresence mode="popLayout">
          {toast && (
            <motion.p
              key={toast.id}
              role="status"
              initial={{ opacity: 0, y: 24, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={spring}
              className="flex items-center gap-2.5 rounded-full border-2 border-ink bg-smiley px-5 py-3 font-semibold text-ink shadow-[4px_4px_0_var(--color-ink)]"
            >
              {toast.swatch && (
                <span
                  aria-hidden
                  className="size-4 rounded-full border-2 border-ink"
                  style={{ background: toast.swatch }}
                />
              )}
              {toast.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </ToastContext>
  );
}
