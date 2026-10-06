import type { SVGProps } from "react";

export type SmileyVariant = "dead" | "melting";

interface SmileyProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  variant?: SmileyVariant;
  /** Accessible name. Without it the smiley is decorative. */
  title?: string;
}

/** The drippy smiley as painted on Mood: mustard face, ink outline, melting drips. */
const FACE =
  "M12 44C12 20 30 6 50 6c22 0 38 16 38 38 0 14-6 24-14 30v18c0 6-8 6-8 0V80c-4 2-8 3-10 3v25c0 7-10 7-10 0V83c-6-1-10-2-14-4v11c0 6-8 6-8 0V72c-8-6-12-16-12-28Z";

/**
 * Two smileys from the nganya:
 * - `dead`: X-X eyes, wavy grin and tongue out, as on the mirror housings.
 * - `melting`: eyes running down in streaks and a wide grin, as on the windshield.
 */
export function Smiley({ variant = "dead", title, ...props }: SmileyProps) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };

  return (
    <svg viewBox="0 0 100 116" {...a11y} {...props}>
      <path
        d={FACE}
        fill="var(--color-smiley)"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g stroke="var(--color-ink)" strokeLinecap="round" fill="none">
        {variant === "dead" ? (
          <>
            <path d="M29 28l12 12m0-12L29 40M57 26l12 12m0-12L57 38" strokeWidth="4.5" />
            <path d="M25 55c8 10 17-2 25 6s19-4 26-10" strokeWidth="4.5" />
            <path
              d="M32 59c-3 11 2 17 8 16s7-8 4-15"
              fill="var(--color-atmos-white)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <path
              d="M35 24c-4 0-5 6-4 12l2 13c.5 3 3 3 3.5 0l2-13c1-6 0-12-3.5-12ZM63 22c-4 0-5 6-4 12l2 13c.5 3 3 3 3.5 0l2-13c1-6 0-12-3.5-12Z"
              fill="var(--color-ink)"
              stroke="none"
            />
            <path d="M22 55q28 24 56-3" strokeWidth="5" />
            <path d="M19 52l5 5M81 49l-5 5" strokeWidth="4" />
          </>
        )}
      </g>
    </svg>
  );
}
