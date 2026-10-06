export type Hex = `#${string}`;

export type PhotoId = "headOn" | "fullSun" | "threeQuarter" | "back" | "night";

export interface Photo {
  id: PhotoId;
  src: string;
  /** Smaller renditions for grids and phones, generated at build time. */
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Photographer or editor, when known. */
  credit?: string;
}

export interface Hotspot {
  /** Position as a percentage of the photo's width. */
  x: number;
  /** Position as a percentage of the photo's height. */
  y: number;
  title: string;
  text: string;
}

export type ViewId = "head-on" | "three-quarter" | "back";

export interface ExplorerView {
  id: ViewId;
  label: string;
  photo: PhotoId;
  hotspots: readonly Hotspot[];
}

export type MeasuredFrom = "Head-on, full sun" | "Three-quarter" | "Back" | "Night";

export type BusFace = "front" | "back";

/** Where a colour sits on the 3D bus, as percentages of that face's cutout. */
export interface BusSpot {
  face: BusFace;
  x: number;
  y: number;
}

export interface Swatch {
  name: string;
  hex: Hex;
  where: string;
  measuredFrom: MeasuredFrom;
  /** File name (without extension) of the photo crop in src/assets/chips. */
  chip: string;
  /** Where to pin it on the 3D bus; colours not visible on the cutouts have none. */
  spot?: BusSpot;
}

export interface PaletteGroup {
  name: string;
  swatches: readonly Swatch[];
}

export interface Video {
  id: string;
  /** Path under public/ without extension; .mp4 and .webm are both expected. */
  src: string;
  poster: string;
  width: number;
  height: number;
  caption: string;
  credit?: string;
}

export type StickerId =
  | "windshield"
  | "no-risk"
  | "try-me"
  | "first-class"
  | "atmosphere"
  | "school"
  | "plate-front"
  | "plate-rear"
  | "hazard"
  | "warning"
  | "smiley-dead"
  | "smiley-melting";

export interface StickerPlacement {
  sticker: StickerId;
  label: string;
  /** Width in px at full size. */
  width: number;
  /** Start position as a percentage of the wall. */
  x: number;
  y: number;
  rotate: number;
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}
