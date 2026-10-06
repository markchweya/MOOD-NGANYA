import { Hand, RotateCw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { cutouts } from "@/content/cutouts";
import { palette } from "@/content/palette";
import type { Swatch } from "@/content/types";
import { useTilt } from "@/hooks/useTilt";
import { BusFaceView } from "./BusFaceView";
import { SwatchChips } from "./SwatchChips";
import { SwatchDetail } from "./SwatchDetail";
import { useBusRotation } from "./useBusRotation";

const swatches = palette.flatMap((group) => group.swatches);
const firstSwatch = swatches[0] ?? null;

/**
 * The palette on the bus itself: a front/back cutout pair in 3D. Drag or press
 * turn to spin it; tap a dot or a chip to read that colour.
 */
export function BusStudio() {
  const [selected, setSelected] = useState<Swatch | null>(firstSwatch);
  const { rotateY, face, showFace, turn, dragHandlers } = useBusRotation();
  const tilt = useTilt(6);

  const select = (swatch: Swatch) => {
    setSelected(swatch);
    if (swatch.spot) showFace(swatch.spot.face);
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-x-[10%] top-[12%] bottom-[18%] -z-10 rounded-full bg-mood-purple/30 blur-[90px] dark:bg-neon-pink/25"
        />
        <div
          {...dragHandlers}
          onPointerMove={(event) => {
            dragHandlers.onPointerMove(event);
            tilt.onPointerMove(event);
          }}
          onPointerLeave={tilt.onPointerLeave}
          className="relative mx-auto aspect-[1164/1251] w-full max-w-[34rem] cursor-grab touch-pan-y select-none [perspective:1400px] active:cursor-grabbing"
          data-cursor="hover"
        >
          <motion.div
            style={{ rotateY, rotateX: tilt.rotateX }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            <BusFaceView
              face="front"
              cutout={cutouts.frontCrisp}
              swatches={swatches}
              selected={selected}
              onSelect={select}
            />
            <BusFaceView
              face="back"
              cutout={cutouts.back}
              swatches={swatches}
              selected={selected}
              onSelect={select}
            />
          </motion.div>
        </div>
        <div
          aria-hidden
          className="mx-auto -mt-4 h-6 w-3/4 rounded-[100%] bg-ink/40 blur-xl dark:bg-black/70"
        />
        <div className="mt-4 flex items-center justify-center gap-3 text-sm text-fg-muted">
          <IconButton
            label={face === "front" ? "Turn to the back" : "Turn to the front"}
            onClick={turn}
            icon={<RotateCw />}
            tooltip="top"
          />
          <span className="inline-flex items-center gap-1.5">
            <Hand className="size-4" aria-hidden /> Drag to spin · tap a dot
          </span>
        </div>
      </div>

      <div className="grid gap-8">
        {selected && <SwatchDetail swatch={selected} />}
        <SwatchChips groups={palette} selected={selected} onSelect={select} />
      </div>
    </div>
  );
}
