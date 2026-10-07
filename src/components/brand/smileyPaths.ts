/** Path data for the drippy smiley, shared by the SVG component and canvas painters. viewBox 0 0 100 116. */
export const SMILEY_VIEWBOX = { width: 100, height: 116 } as const;

export const SMILEY_FACE =
  "M12 44C12 20 30 6 50 6c22 0 38 16 38 38 0 14-6 24-14 30v18c0 6-8 6-8 0V80c-4 2-8 3-10 3v25c0 7-10 7-10 0V83c-6-1-10-2-14-4v11c0 6-8 6-8 0V72c-8-6-12-16-12-28Z";

/** `dead`: X-X eyes, wavy grin, tongue. */
export const SMILEY_DEAD = {
  eyes: "M29 28l12 12m0-12L29 40M57 26l12 12m0-12L57 38",
  grin: "M25 55c8 10 17-2 25 6s19-4 26-10",
  tongue: "M32 59c-3 11 2 17 8 16s7-8 4-15",
} as const;

/** `melting`: eyes running down in streaks, wide grin. */
export const SMILEY_MELTING = {
  eyes: "M35 24c-4 0-5 6-4 12l2 13c.5 3 3 3 3.5 0l2-13c1-6 0-12-3.5-12ZM63 22c-4 0-5 6-4 12l2 13c.5 3 3 3 3.5 0l2-13c1-6 0-12-3.5-12Z",
  grin: "M22 55q28 24 56-3",
  dimples: "M19 52l5 5M81 49l-5 5",
} as const;
