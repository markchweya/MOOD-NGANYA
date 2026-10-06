import { DISPLAY_FONT, INK, type StickerProps } from "./types";

/** The cracked white lettering across the tailgate. */
export function AtmosphereSticker(props: StickerProps) {
  return (
    <svg viewBox="0 0 440 90" aria-hidden {...props}>
      <text
        x="220"
        y="72"
        textAnchor="middle"
        fontFamily={DISPLAY_FONT}
        fontSize="66"
        fill="var(--color-atmos-white)"
        stroke={INK}
        strokeWidth="6"
        paintOrder="stroke"
        textLength="420"
        lengthAdjust="spacingAndGlyphs"
      >
        ATMOSPHERE
      </text>
      <path
        d="M60 18l10 22-8 10 12 26M150 14l-6 24 10 8-8 30M250 16l8 20-10 14 6 28M340 18l-8 22 12 12-6 24"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The red hand lettering on the passenger side of the windshield. */
export function SchoolSticker(props: StickerProps) {
  return (
    <svg viewBox="0 0 180 120" aria-hidden {...props}>
      <g
        fontFamily="'Permanent Marker', cursive"
        fill="var(--color-tail-red)"
        stroke="var(--color-atmos-white)"
        strokeWidth="5"
        paintOrder="stroke"
        strokeLinejoin="round"
      >
        <text x="14" y="38" fontSize="34">
          School
        </text>
        <text x="42" y="74" fontSize="30">
          kills
        </text>
        <text x="20" y="110" fontSize="34">
          Artists
        </text>
      </g>
    </svg>
  );
}
