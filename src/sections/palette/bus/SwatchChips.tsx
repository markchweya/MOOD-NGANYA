import { motion } from "motion/react";
import { PuzzleBoard, PuzzlePiece } from "@/components/scroll/Puzzle";
import type { PaletteGroup, Swatch } from "@/content/types";
import { spring } from "@/lib/motion";

interface SwatchChipsProps {
  groups: readonly PaletteGroup[];
  selected: Swatch | null;
  onSelect: (swatch: Swatch) => void;
}

/** Every measured colour as a round chip, grouped; they assemble like puzzle pieces. */
export function SwatchChips({ groups, selected, onSelect }: SwatchChipsProps) {
  return (
    <PuzzleBoard className="grid gap-5">
      {groups.map((group, groupIndex) => (
        <div key={group.name}>
          <p className="mb-2 font-display text-[0.7rem] tracking-[0.2em] text-fg-muted uppercase">
            {group.name}
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {group.swatches.map((swatch, i) => {
              const isSelected = selected?.hex === swatch.hex;
              return (
                <li key={swatch.hex}>
                  <PuzzlePiece index={groupIndex * 10 + i}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(swatch);
                      }}
                      aria-label={`${swatch.name}, ${swatch.hex}`}
                      aria-pressed={isSelected}
                      title={swatch.name}
                      className="relative grid size-11 place-items-center rounded-full transition-transform hover:scale-110"
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="chip-ring"
                          transition={spring}
                          className="absolute -inset-1 rounded-full border-[3px] border-accent"
                        />
                      )}
                      <span
                        className="size-full rounded-full border-[3px] border-ink"
                        style={{ background: swatch.hex }}
                      />
                    </button>
                  </PuzzlePiece>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </PuzzleBoard>
  );
}
