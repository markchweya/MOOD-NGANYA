import { describe, expect, it } from "vitest";
import {
  BUS_RADIUS,
  MAX_DISTANCE,
  ROOM,
  fieldOfView,
  fitDistance,
  showroomDistance,
  showroomEye,
} from "./garageLayout";

describe("fitDistance", () => {
  it("stands further back on narrow screens, where the width is the limit", () => {
    expect(fitDistance(0.6, 40)).toBeGreaterThan(fitDistance(16 / 9, 40));
  });

  it("is limited by the vertical view on wide screens", () => {
    expect(fitDistance(16 / 9, 40)).toBeCloseTo(BUS_RADIUS / Math.sin((20 * Math.PI) / 180));
  });
});

describe("showroom framing", () => {
  it("opens up the lens on portrait screens", () => {
    expect(fieldOfView(0.8)).toBeGreaterThan(fieldOfView(1.6));
  });

  for (const aspect of [0.5, 0.8, 1.33, 16 / 9, 2.4]) {
    it(`keeps the camera inside the garage at aspect ${aspect.toFixed(2)}`, () => {
      const [x, , z] = showroomEye(aspect);
      expect(showroomDistance(aspect)).toBeLessThanOrEqual(MAX_DISTANCE);
      expect(Math.abs(x)).toBeLessThan(ROOM.halfWidth);
      expect(z).toBeLessThan(ROOM.front);
      // Orbiting at this distance must not leave the room either.
      expect(MAX_DISTANCE).toBeLessThan(ROOM.halfWidth);
      expect(MAX_DISTANCE).toBeLessThan(-ROOM.back);
    });
  }
});
