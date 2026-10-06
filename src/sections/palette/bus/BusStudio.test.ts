import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import BusStudio from "./BusStudio.vue";

async function pick(name: string) {
  const chip = screen.getAllByRole("button", { name })[0];
  if (!chip) throw new Error(`missing chip: ${name}`);
  await userEvent.click(chip);
}

describe("BusStudio", () => {
  it("shows the picked colour in the detail card", async () => {
    render(BusStudio);
    await pick("Liberty Teal, #489E97");
    expect(await screen.findByRole("heading", { name: "Liberty Teal" })).toBeInTheDocument();
  });

  it("turns the bus around for a colour that lives on the back", async () => {
    render(BusStudio);
    expect(screen.getByRole("button", { name: "Turn to the back" })).toBeInTheDocument();
    await pick("Tail-Light Red, #E2332E");
    expect(await screen.findByRole("button", { name: "Turn to the front" })).toBeInTheDocument();
  });
});
