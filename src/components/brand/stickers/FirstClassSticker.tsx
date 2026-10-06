import { DISPLAY_FONT, INK, type StickerProps } from "./types";

/** The amber diamond sign hung off the grille. */
export function FirstClassSticker(props: StickerProps) {
  return (
    <svg viewBox="0 0 150 150" aria-hidden {...props}>
      <g transform="rotate(45 75 75)">
        <rect
          x="27"
          y="27"
          width="96"
          height="96"
          rx="8"
          fill="var(--color-first-class)"
          stroke={INK}
          strokeWidth="5"
        />
        <rect
          x="34"
          y="34"
          width="82"
          height="82"
          rx="5"
          fill="none"
          stroke={INK}
          strokeWidth="2.5"
        />
      </g>
      <g
        fontFamily={DISPLAY_FONT}
        fontSize="21"
        fill={INK}
        textAnchor="middle"
        transform="rotate(-20 75 75)"
      >
        <text x="75" y="72">
          FIRST
        </text>
        <text x="75" y="95">
          CLASS
        </text>
      </g>
    </svg>
  );
}
