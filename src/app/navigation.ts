import { Clapperboard, Images, Palette, ScanEye, Sticker, UsersRound } from "lucide-vue-next";
import type { Component } from "vue";

export interface SectionLink {
  id: string;
  label: string;
  icon: Component;
}

/** Page sections in scroll order; drives the dock and the scroll spy. */
export const sectionLinks: readonly SectionLink[] = [
  { id: "videos", label: "Videos", icon: Clapperboard },
  { id: "details", label: "Details", icon: ScanEye },
  { id: "colours", label: "Colours", icon: Palette },
  { id: "stickers", label: "Stickers", icon: Sticker },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "family", label: "Mood Family", icon: UsersRound },
];
