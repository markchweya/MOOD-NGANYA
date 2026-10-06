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
        spot: { face: "front", x: 50, y: 62 },
      },
      {
        name: "Purple Glow",
        hex: "#AE2EC9",
        measuredFrom: "Head-on, full sun",
        chip: "glow",
        where: "Sunlit curves of the body kit",
        spot: { face: "front", x: 14, y: 60 },
      },
      {
        name: "Purple Night",
        hex: "#280633",
        measuredFrom: "Head-on, full sun",
        chip: "night",
        where: "Shadows and the underside",
        spot: { face: "front", x: 50, y: 94 },
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
        spot: { face: "front", x: 22, y: 23 },
      },
      {
        name: "Sun-strip Blue",
        hex: "#0B0491",
        measuredFrom: "Head-on, full sun",
        chip: "sunstrip",
        where: "The band across the windshield",
        spot: { face: "front", x: 40, y: 35 },
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
        spot: { face: "front", x: 19, y: 28 },
      },
      {
        name: "Try-Me Gold",
        hex: "#E4A83C",
        measuredFrom: "Head-on, full sun",
        chip: "gold",
        where: "TRY ME lettering and badge",
        spot: { face: "front", x: 31, y: 44 },
      },
      {
        name: "Try-Me Magenta",
        hex: "#AC24A1",
        measuredFrom: "Head-on, full sun",
        chip: "magenta",
        where: "TRY ME outlines, line art and flowers",
        spot: { face: "front", x: 72, y: 45 },
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
        spot: { face: "back", x: 51, y: 75 },
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
        spot: { face: "back", x: 12, y: 30 },
      },
      {
        name: "Beacon Red",
        hex: "#B32827",
        measuredFrom: "Three-quarter",
        chip: "beacon",
        where: "Red roof beacon domes",
        spot: { face: "front", x: 40, y: 6 },
      },
      {
        name: "Beacon Purple",
        hex: "#6C1F67",
        measuredFrom: "Head-on, full sun",
        chip: "beaconpurple",
        where: "Purple roof beacon domes",
        spot: { face: "front", x: 45, y: 9.5 },
      },
      {
        name: "LED Ice",
        hex: "#73B5DB",
        measuredFrom: "Three-quarter",
        chip: "ice",
        where: "Headlight LEDs",
        spot: { face: "front", x: 18, y: 72 },
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
        spot: { face: "back", x: 20, y: 74 },
      },
      {
        name: "Ink",
        hex: "#262322",
        measuredFrom: "Head-on, full sun",
        chip: "ink",
        where: "Outlines, trims and the LED bar housing",
        spot: { face: "front", x: 50, y: 53 },
      },
    ],
  },
];
