/*
 * Motion presets as plain objects, so they fit both motion-v and Motion for React.
 * `as const` keeps literal types (e.g. `type: "spring"`) that the libraries expect.
 */

/** Expo-out: fast start, long soft landing. Used for most entrances. */
export const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const spring = { type: "spring", stiffness: 380, damping: 28 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOut } },
};

/** Stickers slap on: scale up past full size and settle with a twist. */
export const popIn = {
  hidden: { opacity: 0, scale: 0.4, rotate: -12 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { ...spring, stiffness: 420, damping: 16 } },
};

export function stagger(staggerChildren = 0.08, delayChildren = 0) {
  return { hidden: {}, show: { transition: { staggerChildren, delayChildren } } };
}
