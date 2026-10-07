import { describe, expect, it } from "vitest";
import { FRONT_LAMPS } from "@/components/brand/busLamps";
import { C } from "./colours";
import { lampColour } from "./textures";

describe("lampColour", () => {
  it("knows the literal colour of every lamp on the bus", () => {
    for (const lamp of FRONT_LAMPS) expect(lampColour(lamp.colour)).not.toBe(C.atmosWhite);
  });
});
