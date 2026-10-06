import { motion } from "motion/react";
import type { Cutout } from "@/content/cutouts";
import type { BusFace, Swatch } from "@/content/types";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

interface BusFaceViewProps {
  face: BusFace;
  cutout: Cutout;
  swatches: readonly Swatch[];
  selected: Swatch | null;
  onSelect: (swatch: Swatch) => void;
}

/** One side of the bus: the cutout with a pulsing dot on every colour that lives there. */
export function BusFaceView({ face, cutout, swatches, selected, onSelect }: BusFaceViewProps) {
  const here = swatches.filter((s) => s.spot?.face === face);

  return (
    <div
      className="absolute inset-0 [backface-visibility:hidden]"
      style={{ transform: face === "back" ? "rotateY(180deg)" : undefined }}
    >
      <img
        src={cutout.src}
        width={cutout.width}
        height={cutout.height}
        alt={cutout.alt}
        draggable={false}
        className="size-full object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.4)] select-none"
      />
      {here.map((swatch, i) => {
        if (!swatch.spot) return null;
        const isSelected = selected?.hex === swatch.hex;
        return (
          <motion.button
            key={swatch.hex}
            type="button"
            aria-label={`${swatch.name}, ${swatch.hex}`}
            aria-pressed={isSelected}
            onClick={() => {
              onSelect(swatch);
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.3 + i * 0.05 }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            style={{ left: `${String(swatch.spot.x)}%`, top: `${String(swatch.spot.y)}%` }}
            className={cn(
              "absolute -mt-3.5 -ml-3.5 size-7 rounded-full border-[3px] shadow-lg transition-[border-color,box-shadow]",
              isSelected
                ? "z-10 border-atmos-white shadow-[0_0_0_3px_var(--color-ink),0_0_24px_4px_var(--glow)]"
                : "border-atmos-white/90",
            )}
          >
            <span className="absolute inset-0 rounded-full" style={{ background: swatch.hex }} />
            {!isSelected && (
              <span
                aria-hidden
                className="absolute -inset-1 animate-ping rounded-full border-2 opacity-60"
                style={{ borderColor: swatch.hex }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
