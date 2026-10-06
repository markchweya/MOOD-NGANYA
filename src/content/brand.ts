import type { SocialLink } from "./types";

export const brand = {
  name: "MOOD",
  tagline: "No risk, no story.",
  eyebrow: "Nairobi's purple nganya",
  intro:
    "A roof crowned in lights. Graffiti that stares right back at you. The front says TRY ME, the back says ATMOSPHERE, and everything in between is pure vibe.",
} as const;

/** Lines from the Instagram bio, used for the manifesto. */
export const manifesto = [
  "No risk, no story.",
  "Redefining greatness daily.",
  "We don't follow trends. We start them.",
  "Too rare to be compared.",
] as const;

export const socials: readonly SocialLink[] = [
  {
    label: "Instagram",
    handle: "@mood_family33",
    href: "https://www.instagram.com/mood_family33/",
  },
];
