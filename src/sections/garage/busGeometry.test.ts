import { describe, expect, it } from "vitest";
import { BACK_Z, BUS, FRONT_WIDTH, FRONT_Z, faceAnchor, facesCamera } from "./busGeometry";

describe("faceAnchor", () => {
  it("puts the middle of the front cutout on the bus's centre line", () => {
    const { position, normal } = faceAnchor("front", 50, 50);
    expect(position[0]).toBeCloseTo(0);
    expect(position[1]).toBeCloseTo(BUS.faceBottom + BUS.faceHeight / 2);
    expect(position[2]).toBeGreaterThan(FRONT_Z);
    expect(normal).toEqual([0, 0, 1]);
  });

  it("spans the full width of the front photo", () => {
    expect(faceAnchor("front", 0, 0).position[0]).toBeCloseTo(-FRONT_WIDTH / 2);
    expect(faceAnchor("front", 100, 0).position[0]).toBeCloseTo(FRONT_WIDTH / 2);
  });

  it("mirrors the back, which faces the other way", () => {
    expect(faceAnchor("back", 10, 50).position[0]).toBeGreaterThan(0);
    expect(faceAnchor("back", 10, 50).position[2]).toBeLessThan(BACK_Z);
  });

  it("measures the side from the front bumper, from the roof down", () => {
    const nose = faceAnchor("side", 0, 0).position;
    const tail = faceAnchor("side", 100, 100).position;
    expect(nose[2]).toBeCloseTo(FRONT_Z);
    expect(tail[2]).toBeCloseTo(BACK_Z);
    expect(nose[1]).toBeCloseTo(BUS.sideHeight);
    expect(tail[1]).toBeCloseTo(0);
  });

  it("pins side details to the photographed side, which faces -x", () => {
    const { position, normal } = faceAnchor("side", 40, 50);
    expect(position[0]).toBeLessThan(-BUS.width / 2);
    expect(normal).toEqual([-1, 0, 0]);
  });
});

describe("facesCamera", () => {
  it("shows front details from the front and hides them from behind", () => {
    const anchor = faceAnchor("front", 50, 50);
    expect(facesCamera(anchor, [0, 2, 12])).toBe(true);
    expect(facesCamera(anchor, [0, 2, -12])).toBe(false);
  });
});
