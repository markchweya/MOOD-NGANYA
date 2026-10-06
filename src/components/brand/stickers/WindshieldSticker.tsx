import { Smiley } from "../Smiley";
import { DISPLAY_FONT, INK, type StickerProps } from "./types";

/** The windshield banner logo: white MOOD with a purple 3D drop and smileys in the O's. */
export function WindshieldSticker(props: StickerProps) {
  return (
    <svg viewBox="0 0 380 140" aria-hidden {...props}>
      <g fontFamily={DISPLAY_FONT} fontSize="112" textAnchor="middle" strokeLinejoin="round">
        <text
          x="198"
          y="122"
          fill="var(--color-purple-night)"
          stroke="var(--color-purple-night)"
          strokeWidth="14"
        >
          MOOD
        </text>
        <text
          x="194"
          y="118"
          fill="var(--color-mood-purple)"
          stroke="var(--color-mood-purple)"
          strokeWidth="14"
        >
          MOOD
        </text>
        <text
          x="190"
          y="112"
          fill="var(--color-atmos-white)"
          stroke={INK}
          strokeWidth="7"
          paintOrder="stroke"
        >
          MOOD
        </text>
      </g>
      <Smiley variant="dead" x="304" y="0" width="58" height="67" />
    </svg>
  );
}
