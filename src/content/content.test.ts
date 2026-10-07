import { describe, expect, it } from "vitest";
import { stickerRegistry } from "@/components/brand/stickers/registry";
import { busHotspots } from "./garage";
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

  it("pins bus spots inside the cutout", () => {
    for (const swatch of swatches) {
      if (!swatch.spot) continue;
      expect(swatch.spot.x, swatch.name).toBeGreaterThanOrEqual(0);
      expect(swatch.spot.x, swatch.name).toBeLessThanOrEqual(100);
      expect(swatch.spot.y, swatch.name).toBeGreaterThanOrEqual(0);
      expect(swatch.spot.y, swatch.name).toBeLessThanOrEqual(100);
    }
  });

  it("puts most colours on the bus itself", () => {
    const onBus = swatches.filter((s) => s.spot).length;
    expect(onBus / swatches.length).toBeGreaterThan(0.6);
  });

  it("has a photo chip for every colour", () => {
    for (const swatch of swatches) expect(chipUrl(swatch.chip), swatch.name).toBeTruthy();
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
    for (const placement of stickerWall) expect(stickerRegistry[placement.sticker]).toBeDefined();
  });

  it("keeps video paths relative to public/", () => {
    for (const video of videos) {
      expect(video.src.startsWith("/")).toBe(false);
      expect(video.poster.startsWith("/")).toBe(false);
    }
  });
});

describe("garage hotspots", () => {
  it("sit inside their face", () => {
    for (const spot of busHotspots) {
      expect(spot.x).toBeGreaterThanOrEqual(0);
      expect(spot.x).toBeLessThanOrEqual(100);
      expect(spot.y).toBeGreaterThanOrEqual(0);
      expect(spot.y).toBeLessThanOrEqual(100);
    }
  });

  it("have unique titles and something to read out", () => {
    const titles = busHotspots.map((spot) => spot.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const spot of busHotspots) expect(spot.text.length).toBeGreaterThan(10);
  });

  it("cover every face of the bus", () => {
    expect(new Set(busHotspots.map((spot) => spot.face))).toEqual(
      new Set(["front", "back", "side"]),
    );
  });
});
