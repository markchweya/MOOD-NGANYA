import { describe, expect, it } from "vitest";
import { stickerArt } from "@/components/brand/stickers/StickerArt";
import { explorerViews } from "./details";
import { chipUrl, palette } from "./palette";
import { galleryOrder, photos } from "./photos";
import { stickerWall } from "./stickers";
import { videos } from "./videos";

const swatches = palette.flatMap((group) => group.swatches);

describe("palette", () => {
  it("uses six-digit hex codes", () => {
    for (const swatch of swatches) expect(swatch.hex).toMatch(/^#[0-9A-F]{6}$/);
  });

  it("has no duplicate colours or names", () => {
    expect(new Set(swatches.map((s) => s.hex)).size).toBe(swatches.length);
    expect(new Set(swatches.map((s) => s.name)).size).toBe(swatches.length);
  });

  it("has a photo chip for every colour", () => {
    for (const swatch of swatches) expect(chipUrl(swatch.chip), swatch.name).toBeTruthy();
  });
});

describe("explorer", () => {
  it("places every hotspot inside its photo", () => {
    for (const view of explorerViews) {
      for (const spot of view.hotspots) {
        expect(spot.x, `${view.id}: ${spot.title}`).toBeGreaterThanOrEqual(0);
        expect(spot.x).toBeLessThanOrEqual(100);
        expect(spot.y).toBeGreaterThanOrEqual(0);
        expect(spot.y).toBeLessThanOrEqual(100);
      }
    }
  });

  it("points every view at a known photo", () => {
    for (const view of explorerViews) expect(photos[view.photo]).toBeDefined();
  });
});

describe("photos", () => {
  it("gives every photo alt text and dimensions", () => {
    for (const photo of Object.values(photos)) {
      expect(photo.alt.length).toBeGreaterThan(20);
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it("shows every photo in the gallery exactly once", () => {
    expect([...galleryOrder].sort()).toEqual(Object.keys(photos).sort());
  });
});

describe("stickers and videos", () => {
  it("only uses stickers that have artwork", () => {
    for (const placement of stickerWall) expect(stickerArt[placement.sticker]).toBeDefined();
  });

  it("keeps video paths relative to public/", () => {
    for (const video of videos) {
      expect(video.src.startsWith("/")).toBe(false);
      expect(video.poster.startsWith("/")).toBe(false);
    }
  });
});
