import type { ExplorerView } from "./types";

export const explorerViews: readonly ExplorerView[] = [
  {
    id: "head-on",
    label: "Head-on",
    photo: "headOn",
    hotspots: [
      {
        x: 51,
        y: 7,
        title: "Light bar",
        text: "Sixteen square lamps glowing red across the very top.",
      },
      {
        x: 35,
        y: 12,
        title: "Beacon tiers",
        text: "Rows of beacon domes stacked under the light bar, alternating purple and red.",
      },
      {
        x: 46,
        y: 22,
        title: "The MOOD banner",
        text: "MOOD in white graffiti letters with two faces set into the O's, on a lilac wash full of melting smileys.",
      },
      {
        x: 52,
        y: 30,
        title: "No risk, no story",
        text: "The motto across the bottom of the banner, and the first line of the Instagram bio.",
      },
      {
        x: 78,
        y: 27,
        title: "School kills Artists",
        text: "Signed off in red hand lettering on the passenger side.",
      },
      {
        x: 72,
        y: 37,
        title: "Sun-strip & credits",
        text: "The blue sun-strip carries shout-outs to Sticker Hub and POOLMAN.",
      },
      {
        x: 45,
        y: 40,
        title: "Thou Shall Not TRY ME",
        text: "Gold and purple with a white die-cut edge: a key on the left, flowers on the right, and the script that turns TRY ME into a commandment.",
      },
      {
        x: 4,
        y: 36,
        title: "Smiley mirrors",
        text: "Both mirror housings are wrapped in purple with dead-eyed drippy smileys and little MOOD tags.",
      },
      { x: 49, y: 49, title: "LED pods", text: "Six LED pods in a bar under the windscreen." },
      { x: 50, y: 57, title: "Custom grille", text: "Purple slats with small red accent lights." },
      {
        x: 25,
        y: 66,
        title: "Headlights",
        text: "Angular LED headlights with ice-blue accent strips.",
      },
      {
        x: 18,
        y: 76,
        title: "Bumper pods",
        text: "Clusters of small round lamps set into the sculpted bumper.",
      },
      { x: 49, y: 75, title: "The plate", text: "The white MOOD plate." },
      {
        x: 49,
        y: 82,
        title: "Fog lights",
        text: "Four square lamps with red cores along the bottom of the bumper.",
      },
    ],
  },
  {
    id: "three-quarter",
    label: "Three-quarter",
    photo: "threeQuarter",
    hotspots: [
      {
        x: 41,
        y: 20,
        title: "The crown",
        text: "From the side, the roof is lined end to end with beacon lamps.",
      },
      { x: 58, y: 52, title: "TRY ME", text: "The dashboard sticker, seen from the side." },
      { x: 80, y: 63, title: "First Class", text: "The amber FIRST CLASS sign." },
      {
        x: 5,
        y: 64,
        title: "Lady Liberty",
        text: "A screaming teal Lady Liberty on the side panel. The art runs the whole length of the body.",
      },
      { x: 26, y: 70, title: "Side clouds", text: "Violet clouds painted over the purple body." },
      { x: 16, y: 88, title: "The rims", text: "Black multi-spoke alloys to finish the look." },
    ],
  },
  {
    id: "back",
    label: "Back",
    photo: "back",
    hotspots: [
      {
        x: 37,
        y: 7,
        title: "Roof rack",
        text: "A purple roof rack lined with beacon lights, crowning the tailgate.",
      },
      {
        x: 31,
        y: 30,
        title: "The faces",
        text: "Airbrushed, wide-eyed portraits in warm gold tones. Impossible to ignore at a traffic light.",
      },
      {
        x: 75,
        y: 32,
        title: "The attitude",
        text: "Tongue out, eyebrow up. Mood's art talks back.",
      },
      {
        x: 61,
        y: 47,
        title: "Hazard zone",
        text: "A yellow hazard sign, a red warning triangle, chain-link fence and a smiley hidden in the mix.",
      },
      {
        x: 36,
        y: 54,
        title: "Tail lights",
        text: "Sculpted red LED tail lights wrap around the art like a frame.",
      },
      {
        x: 22,
        y: 70,
        title: "ATMOSPHERE",
        text: "White cracked lettering across the tailgate. One word for what Mood brings.",
      },
      { x: 52, y: 70, title: "The plate", text: "The yellow rear MOOD plate." },
      {
        x: 50,
        y: 86,
        title: "Rear diffuser",
        text: "A race-style purple diffuser. Pure nganya engineering.",
      },
    ],
  },
];
