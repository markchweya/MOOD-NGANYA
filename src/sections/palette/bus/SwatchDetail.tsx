import { Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IconButton } from "@/components/ui/IconButton";
import { chipUrl } from "@/content/palette";
import type { Swatch } from "@/content/types";
import { useToast } from "@/features/toast/useToast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { easeOut } from "@/lib/motion";

/** The picked colour: a big swatch, the photo crop it came from, and a copy button. */
export function SwatchDetail({ swatch }: { swatch: Swatch }) {
  const copy = useCopyToClipboard();
  const toast = useToast();
  const chip = chipUrl(swatch.chip);

  return (
    <div
      aria-live="polite"
      className="relative min-h-[17rem] overflow-hidden rounded-[2rem] border-[3px] border-ink bg-surface"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={swatch.hex}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          <div
            className="relative h-32 border-b-[3px] border-ink"
            style={{ background: swatch.hex }}
          >
            {chip && (
              <motion.img
                src={chip}
                alt=""
                initial={{ scale: 0.4, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
                className="absolute right-5 -bottom-9 size-20 rounded-full border-4 border-atmos-white object-cover outline-2 outline-ink"
              />
            )}
          </div>
          <div className="flex items-end justify-between gap-4 p-6 pt-8">
            <div>
              <h3 className="text-2xl">{swatch.name}</h3>
              <p className="mt-1 font-mono text-lg font-bold tracking-wide">{swatch.hex}</p>
              <p className="mt-2 text-fg-muted">{swatch.where}</p>
              <p className="mt-2 text-xs text-fg-muted/80">Measured: {swatch.measuredFrom}</p>
            </div>
            <IconButton
              label={`Copy ${swatch.hex}`}
              tone="primary"
              icon={<Copy />}
              onClick={() => {
                void copy(swatch.hex).then((ok) => {
                  toast(ok ? `Copied ${swatch.hex}` : swatch.hex, swatch.hex);
                });
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
