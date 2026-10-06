import { describe, expect, it } from "vitest";
import { cn } from "./cn";
import { publicUrl } from "./publicUrl";
import { wrap } from "./wrap";

describe("cn", () => {
  it("joins conditional classes and lets later Tailwind classes win", () => {
    const classes = (hidden: boolean) => cn("p-2", hidden && "hidden", "p-4");
    expect(classes(false)).toBe("p-4");
    expect(classes(true)).toBe("hidden p-4");
    expect(cn("text-fg", { "font-bold": true })).toBe("text-fg font-bold");
  });
});

describe("wrap", () => {
  it("keeps values inside the range in both directions", () => {
    expect(wrap(-50, 0, -10)).toBe(-10);
    expect(wrap(-50, 0, -60)).toBe(-10);
    expect(wrap(-50, 0, 10)).toBe(-40);
  });
});

describe("publicUrl", () => {
  it("prefixes the base path and drops a leading slash", () => {
    expect(publicUrl("video/a.mp4")).toBe(`${import.meta.env.BASE_URL}video/a.mp4`);
    expect(publicUrl("/video/a.mp4")).toBe(`${import.meta.env.BASE_URL}video/a.mp4`);
  });
});
