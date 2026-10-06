import back from "@/assets/photos/mood-rear.webp";
import headOn from "@/assets/photos/mood-headon-crisp.webp";
import fullSun from "@/assets/photos/mood-headon.webp";
import night from "@/assets/photos/mood-night.webp";
import threeQuarter from "@/assets/photos/mood-front.webp";
import type { Photo, PhotoId } from "./types";

export const photos: Readonly<Record<PhotoId, Photo>> = {
  headOn: {
    id: "headOn",
    src: headOn,
    width: 1206,
    height: 1541,
    caption: "Straight on",
    alt: "MOOD straight on: a light bar over tiers of purple and red beacon domes, the MOOD windshield banner, a blue sun-strip, the TRY ME sticker, LED grille and MOOD plate",
  },
  fullSun: {
    id: "fullSun",
    src: fullSun,
    width: 1206,
    height: 1438,
    caption: "Full sun",
    alt: "MOOD head-on in the sun: purple body kit, purple and red roof beacons, windshield art reading 'MOOD — No risk, no story' and a FIRST CLASS sign",
  },
  night: {
    id: "night",
    src: night,
    width: 1206,
    height: 1232,
    caption: "After dark",
    credit: "@poolman_edits",
    alt: "MOOD at night: the windshield outlined in pink neon, MOOD spelled in violet LED dots, roof beacons glowing over a crowd",
  },
  threeQuarter: {
    id: "threeQuarter",
    src: threeQuarter,
    width: 1206,
    height: 1367,
    caption: "Front · TRY ME",
    credit: "Mziziani Photography",
    alt: "MOOD from the three-quarter front: roof lights, Lady Liberty side art and the TRY ME sticker",
  },
  back: {
    id: "back",
    src: back,
    width: 1206,
    height: 1437,
    caption: "Back · ATMOSPHERE",
    credit: "Mziziani Photography",
    alt: "Back of MOOD: airbrushed portraits, red LED tail lights and ATMOSPHERE lettering",
  },
};

/** Gallery order: two hero shots, then the rest. */
export const galleryOrder: readonly PhotoId[] = ["headOn", "fullSun", "night", "threeQuarter", "back"];
