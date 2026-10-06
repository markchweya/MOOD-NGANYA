import {
  Clapperboard,
  Images,
  Palette,
  ScanEye,
  Sticker,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export interface SectionLink {
  id: string;
  label: string;
  Icon: LucideIcon;
}

/** Page sections in scroll order; drives the dock and the scroll spy. */
export const sectionLinks: readonly SectionLink[] = [
  { id: "videos", label: "Videos", Icon: Clapperboard },
  { id: "details", label: "Details", Icon: ScanEye },
  { id: "colours", label: "Colours", Icon: Palette },
  { id: "stickers", label: "Stickers", Icon: Sticker },
  { id: "gallery", label: "Gallery", Icon: Images },
  { id: "family", label: "Mood Family", Icon: UsersRound },
];
