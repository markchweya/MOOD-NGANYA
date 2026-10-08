import back from "@/assets/cutouts/back.webp";
import backSet from "@/assets/cutouts/back.webp?w=640;1100;2123&format=webp&quality=86&as=srcset";
import frontCrisp from "@/assets/cutouts/front-crisp.webp";
import frontCrispSet from "@/assets/cutouts/front-crisp.webp?w=640;1100;2328&format=webp&quality=86&as=srcset";

export interface Cutout {
  src: string;
  /** Smaller renditions for phones, generated at build time. */
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

/** The matatu cut out of its photos: no cars, people or trees, just Mood. */
export const cutouts = {
  frontCrisp: {
    src: frontCrisp,
    srcSet: frontCrispSet,
    width: 2328,
    height: 2502,
    alt: "MOOD head-on: light bar, beacon tiers, the MOOD windshield banner, TRY ME sticker, LED grille and MOOD plate",
  },
  back: {
    src: back,
    srcSet: backSet,
    width: 2123,
    height: 2660,
    alt: "The back of MOOD: airbrushed portraits, red LED tail lights and ATMOSPHERE lettering",
  },
} as const satisfies Record<string, Cutout>;
