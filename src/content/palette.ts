import type { PaletteGroup } from "./types";

const chipModules = import.meta.glob<string>("../assets/chips/*.webp", {
  eager: true,
  import: "default",
});

/** URL of the photo crop that shows where a colour lives on the nganya. */
export function chipUrl(chip: string): string | undefined {
  return chipModules[`../assets/chips/${chip}.webp`];
}

/** Every hex was measured from photos of the matatu, not picked by eye. */
export const palette: readonly PaletteGroup[] = [
  {
    name: "Paint",
    swatches: [
      {
        name: "Mood Purple",
        hex: "#8B1BAB",
        measuredFrom: "Head-on, full sun",
        chip: "purple",
        where: "The main body paint: grille, bumpers, body kit",
      },
      {
        name: "Purple Glow",
        hex: "#AE2EC9",
        measuredFrom: "Head-on, full sun",
        chip: "glow",
        where: "Sunlit curves of the body kit",
      },
      {
        name: "Purple Night",
        hex: "#280633",
        measuredFrom: "Head-on, full sun",
        chip: "night",
        where: "Shadows and the underside",
      },
      {
        name: "Cloud Violet",
        hex: "#4C44AC",
        measuredFrom: "Three-quarter",
        chip: "violet",
        where: "Cloud art on the side panels",
      },
      {
        name: "Drip Lilac",
        hex: "#A07EB4",
        measuredFrom: "Head-on, full sun",
        chip: "lilac",
        where: "The windshield banner wash",
      },
      {
        name: "Sun-strip Blue",
        hex: "#0B0491",
        measuredFrom: "Head-on, full sun",
        chip: "sunstrip",
        where: "The band across the windshield",
      },
    ],
  },
  {
    name: "Stickers",
    swatches: [
      {
        name: "Smiley Mustard",
        hex: "#D1AF4A",
        measuredFrom: "Head-on, full sun",
        chip: "smiley",
        where: "Drippy smileys on the windshield and mirrors",
      },
      {
        name: "Try-Me Gold",
        hex: "#E4A83C",
        measuredFrom: "Head-on, full sun",
        chip: "gold",
        where: "TRY ME lettering and badge",
      },
      {
        name: "Try-Me Magenta",
        hex: "#AC24A1",
        measuredFrom: "Head-on, full sun",
        chip: "magenta",
        where: "TRY ME outlines, line art and flowers",
      },
      {
        name: "First-Class Amber",
        hex: "#CC8F33",
        measuredFrom: "Head-on, full sun",
        chip: "firstclass",
        where: "The FIRST CLASS sign",
      },
      {
        name: "Plate Yellow",
        hex: "#C07D2C",
        measuredFrom: "Back",
        chip: "plate",
        where: "The rear MOOD number plate",
      },
    ],
  },
  {
    name: "Lights",
    swatches: [
      {
        name: "Tail-Light Red",
        hex: "#E2332E",
        measuredFrom: "Back",
        chip: "tail",
        where: "LED tail lights and the red warning sign",
      },
      {
        name: "Beacon Red",
        hex: "#B32827",
        measuredFrom: "Three-quarter",
        chip: "beacon",
        where: "Red roof beacon domes",
      },
      {
        name: "Beacon Purple",
        hex: "#6C1F67",
        measuredFrom: "Head-on, full sun",
        chip: "beaconpurple",
        where: "Purple roof beacon domes",
      },
      {
        name: "LED Ice",
        hex: "#73B5DB",
        measuredFrom: "Three-quarter",
        chip: "ice",
        where: "Headlight LEDs",
      },
    ],
  },
  {
    name: "Night",
    swatches: [
      {
        name: "Neon Pink",
        hex: "#C9329C",
        measuredFrom: "Night",
        chip: "neon",
        where: "The neon tube outlining the windshield",
      },
      {
        name: "LED Violet",
        hex: "#7E20CA",
        measuredFrom: "Night",
        chip: "led",
        where: "MOOD spelled in LED dots",
      },
    ],
  },
  {
    name: "Art",
    swatches: [
      {
        name: "Liberty Teal",
        hex: "#489E97",
        measuredFrom: "Three-quarter",
        chip: "teal",
        where: "Lady Liberty on the side panel",
      },
      {
        name: "Atmosphere White",
        hex: "#F4F1F8",
        measuredFrom: "Back",
        chip: "white",
        where: "ATMOSPHERE letters and die-cut edges",
      },
      {
        name: "Ink",
        hex: "#262322",
        measuredFrom: "Head-on, full sun",
        chip: "ink",
        where: "Outlines, trims and the LED bar housing",
      },
    ],
  },
];
