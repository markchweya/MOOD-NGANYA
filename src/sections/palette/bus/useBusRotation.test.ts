import { describe, expect, it } from "vitest";
import { faceAt } from "./useBusRotation";

describe("faceAt", () => {
  it("shows the front near 0° and full turns", () => {
    expect(faceAt(0)).toBe("front");
    expect(faceAt(80)).toBe("front");
    expect(faceAt(360)).toBe("front");
    expect(faceAt(-60)).toBe("front");
  });

  it("shows the back around 180°", () => {
    expect(faceAt(180)).toBe("back");
    expect(faceAt(-180)).toBe("back");
    expect(faceAt(540)).toBe("back");
  });
});
