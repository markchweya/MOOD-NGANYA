import back from "@/assets/cutouts/back.webp";
import frontCrisp from "@/assets/cutouts/front-crisp.webp";
import frontSun from "@/assets/cutouts/front-sun.webp";

export interface Cutout {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** The matatu cut out of its photos: no cars, people or trees, just Mood. */
export const cutouts = {
  frontSun: {
    src: frontSun,
    width: 1936,
    height: 1996,
    alt: "MOOD head-on in daylight: purple body kit, roof beacons, windshield art and the TRY ME sticker",
  },
  frontCrisp: {
    src: frontCrisp,
    width: 2328,
    height: 2502,
    alt: "MOOD head-on: light bar, beacon tiers, the MOOD windshield banner, TRY ME sticker, LED grille and MOOD plate",
  },
  back: {
    src: back,
    width: 2123,
    height: 2660,
    alt: "The back of MOOD: airbrushed portraits, red LED tail lights and ATMOSPHERE lettering",
  },
} as const satisfies Record<string, Cutout>;
