import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./IconButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
}

/**
 * Pop-up overlay: fades the backdrop, closes on Escape or backdrop click,
 * moves focus inside and hands it back on close, and pauses page scrolling.
 */
export function Modal({ open, onClose, label, children }: ModalProps) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.querySelector("button")?.focus();

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose, lenis]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[80] grid place-items-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-[rgb(10_3_16/0.82)] backdrop-blur-md"
          />
          <div ref={closeRef} className="absolute top-4 right-4 z-10 md:top-6 md:right-6">
            <IconButton
              label="Close"
              tone="primary"
              onClick={onClose}
              icon={<X />}
              tooltip="none"
            />
          </div>
          <div className="relative z-[1] max-h-full">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
