import { Shuffle } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { stickerArt } from "@/components/brand/stickers/StickerArt";
import { IconButton } from "@/components/ui/IconButton";
import { stickerWall } from "@/content/stickers";
import type { StickerPlacement } from "@/content/types";
import { useElementWidth } from "@/hooks/useElementWidth";

/** Wall width the layout in content/stickers.ts was designed for. */
const DESIGN_WIDTH = 1000;

function shuffled(placements: readonly StickerPlacement[]): StickerPlacement[] {
  return placements.map((p) => ({
    ...p,
    x: Math.round(Math.random() * 80),
    y: Math.round(Math.random() * 80),
    rotate: Math.round(Math.random() * 30 - 15),
  }));
}

/** Mood's stickers on a side-panel background. Drag them anywhere; shuffle re-slaps them. */
export function StickerWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(wallRef);
  const scale = width ? Math.max(0.45, Math.min(1, width / DESIGN_WIDTH)) : 1;
  const [layout, setLayout] = useState<readonly StickerPlacement[]>(stickerWall);
  const [round, setRound] = useState(0);
  const [top, setTop] = useState<number | null>(null);

  return (
    <div
      ref={wallRef}
      className="relative h-[560px] touch-none overflow-hidden rounded-[32px] border-4 border-ink shadow-[12px_12px_0_var(--color-purple-night)] md:h-[640px]"
      style={{
        background: `radial-gradient(30% 40% at 18% 70%, var(--color-cloud-violet) 0 60%, transparent 61%),
          radial-gradient(22% 30% at 30% 55%, var(--color-cloud-violet) 0 60%, transparent 61%),
          radial-gradient(26% 34% at 82% 28%, color-mix(in srgb, var(--color-cloud-violet) 85%, var(--color-mood-purple)) 0 60%, transparent 61%),
          linear-gradient(160deg, var(--color-purple-glow), var(--color-mood-purple) 45%, var(--color-purple-night))`,
      }}
    >
      {layout.map((placement, i) => {
        const { Art, aspect } = stickerArt[placement.sticker];
        const w = placement.width * scale;
        return (
          <motion.div
            key={`${String(round)}-${String(i)}`}
            role="img"
            aria-label={placement.label}
            drag
            dragConstraints={wallRef}
            dragElastic={0.15}
            dragMomentum
            onDragStart={() => {
              setTop(i);
            }}
            initial={{ scale: 0, rotate: placement.rotate - 30, opacity: 0 }}
            animate={{ scale: 1, rotate: placement.rotate, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 15, delay: i * 0.04 }}
            whileHover={{ scale: 1.05 }}
            whileDrag={{
              scale: 1.12,
              rotate: 0,
              filter: "drop-shadow(10px 18px 14px rgb(0 0 0 / 0.45))",
            }}
            className="absolute cursor-grab drop-shadow-[3px_6px_6px_rgb(0_0_0/0.4)] active:cursor-grabbing"
            style={{
              left: `${String(placement.x)}%`,
              top: `${String(placement.y)}%`,
              width: w,
              height: w / aspect,
              zIndex: top === i ? 20 : 1,
            }}
          >
            <Art className="pointer-events-none size-full" />
          </motion.div>
        );
      })}
      <div className="absolute right-4 bottom-4 z-30">
        <IconButton
          label="Shuffle the stickers"
          tooltip="top"
          size="lg"
          tone="primary"
          icon={<Shuffle />}
          onClick={() => {
            setLayout(shuffled(stickerWall));
            setRound((r) => r + 1);
          }}
        />
      </div>
    </div>
  );
}
