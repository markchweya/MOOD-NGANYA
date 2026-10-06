import { Copy } from "lucide-react";
import { motion } from "motion/react";
import { chipUrl } from "@/content/palette";
import type { Swatch } from "@/content/types";
import { useToast } from "@/features/toast/useToast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useTilt } from "@/hooks/useTilt";
import { spring } from "@/lib/motion";

/** A measured colour: tap to copy its hex. The chip shows where it lives on Mood. */
export function SwatchCard({ swatch }: { swatch: Swatch }) {
  const copy = useCopyToClipboard();
  const toast = useToast();
  const chip = chipUrl(swatch.chip);
  const tilt = useTilt();

  const onCopy = async () => {
    const ok = await copy(swatch.hex);
    toast(ok ? `Copied ${swatch.hex}` : swatch.hex, swatch.hex);
  };

  return (
    <motion.button
      type="button"
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 700 }}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      whileHover={{ y: -6, boxShadow: `8px 8px 0 ${swatch.hex}` }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      onClick={() => {
        void onCopy();
      }}
      aria-label={`${swatch.name}, ${swatch.hex}. Copy hex`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border-[3px] border-ink bg-surface text-left"
    >
      <span
        className="relative block h-28 border-b-[3px] border-ink"
        style={{ background: swatch.hex }}
      >
        <span className="absolute top-3 left-3 grid size-8 place-items-center rounded-full bg-white/85 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Copy className="size-4" />
        </span>
        {chip && (
          <img
            src={chip}
            alt=""
            loading="lazy"
            className="absolute right-3 -bottom-7 size-16 rounded-full border-[3px] border-atmos-white object-cover outline-2 outline-ink transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
          />
        )}
      </span>
      <span className="flex flex-1 flex-col gap-1 px-4 pt-8 pb-4">
        <span className="font-display text-base">{swatch.name}</span>
        <span className="font-mono text-sm font-bold tracking-wide">{swatch.hex}</span>
        <span className="text-sm leading-snug text-fg-muted">{swatch.where}</span>
        <span className="mt-auto pt-2 text-xs text-fg-muted/80">
          Measured: {swatch.measuredFrom}
        </span>
      </span>
      <motion.span
        aria-hidden
        style={{ background: tilt.glare }}
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.button>
  );
}
