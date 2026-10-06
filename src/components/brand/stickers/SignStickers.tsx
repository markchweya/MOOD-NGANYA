import { Smiley } from "../Smiley";
import { INK, type StickerProps } from "./types";

/** The yellow hazard triangle from the rear art. */
export function HazardSticker(props: StickerProps) {
  return (
    <svg viewBox="0 0 120 108" aria-hidden {...props}>
      <path
        d="M60 6l54 94H6Z"
        fill="var(--color-smiley)"
        stroke={INK}
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path d="M66 34 48 66h14l-8 24 22-34H62Z" fill={INK} />
    </svg>
  );
}

/** The red warning triangle from the rear art, with a smiley inside. */
export function WarningSticker(props: StickerProps) {
  return (
    <svg viewBox="0 0 120 108" aria-hidden {...props}>
      <path
        d="M60 6l54 94H6Z"
        fill="var(--color-atmos-white)"
        stroke="var(--color-tail-red)"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <Smiley variant="dead" x="40" y="44" width="40" height="46" />
    </svg>
  );
}
