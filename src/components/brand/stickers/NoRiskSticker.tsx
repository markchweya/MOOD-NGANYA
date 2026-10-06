import { DISPLAY_FONT, INK, type StickerProps } from "./types";

/** The motto along the bottom of the windshield banner. */
export function NoRiskSticker(props: StickerProps) {
  return (
    <svg viewBox="0 0 320 64" aria-hidden {...props}>
      <rect
        x="3"
        y="3"
        width="314"
        height="58"
        rx="10"
        fill={INK}
        stroke="var(--color-drip-lilac)"
        strokeWidth="4"
      />
      <text
        x="160"
        y="42"
        textAnchor="middle"
        fontFamily={DISPLAY_FONT}
        fontSize="25"
        fill="var(--color-atmos-white)"
        textLength="282"
        lengthAdjust="spacingAndGlyphs"
      >
        NO RISK, NO STORY
      </text>
    </svg>
  );
}
