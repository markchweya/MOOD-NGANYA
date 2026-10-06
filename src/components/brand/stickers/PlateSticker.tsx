import { DISPLAY_FONT, INK, type StickerProps } from "./types";

function KenyaFlag() {
  return (
    <svg x="14" y="18" width="24" height="16" viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#000" />
      <rect y="6" width="30" height="8" fill="#fff" />
      <rect y="7.2" width="30" height="5.6" fill="#bb0000" />
      <rect y="14" width="30" height="6" fill="#006600" />
      <ellipse cx="15" cy="10" rx="3" ry="8" fill="#bb0000" stroke="#fff" strokeWidth=".8" />
    </svg>
  );
}

interface PlateStickerProps extends StickerProps {
  /** Front plates are white, rear plates yellow. */
  side?: "front" | "rear";
}

/** The personalised MOOD number plate. */
export function PlateSticker({ side = "front", ...props }: PlateStickerProps) {
  const fill = side === "front" ? "var(--color-atmos-white)" : "var(--color-plate-yellow)";
  return (
    <svg viewBox="0 0 280 80" aria-hidden {...props}>
      <rect x="3" y="3" width="274" height="74" rx="9" fill={fill} stroke={INK} strokeWidth="5" />
      <KenyaFlag />
      <text
        x="158"
        y="60"
        textAnchor="middle"
        fontFamily={DISPLAY_FONT}
        fontSize="46"
        fill={INK}
        letterSpacing="4"
      >
        MOOD
      </text>
    </svg>
  );
}
