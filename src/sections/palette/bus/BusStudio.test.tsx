import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ToastProvider } from "@/features/toast/ToastProvider";
import { BusStudio } from "./BusStudio";

function renderStudio() {
  return render(
    <ToastProvider>
      <BusStudio />
    </ToastProvider>,
  );
}

describe("BusStudio", () => {
  it("shows the picked colour in the detail card", async () => {
    renderStudio();
    const chip = screen.getAllByRole("button", { name: "Liberty Teal, #489E97" })[0];
    if (!chip) throw new Error("missing chip");
    await userEvent.click(chip);
    expect(await screen.findByRole("heading", { name: "Liberty Teal" })).toBeInTheDocument();
  });

  it("turns the bus around for a colour that lives on the back", async () => {
    renderStudio();
    expect(screen.getByRole("button", { name: "Turn to the back" })).toBeInTheDocument();
    const chip = screen.getAllByRole("button", { name: "Tail-Light Red, #E2332E" })[0];
    if (!chip) throw new Error("missing chip");
    await userEvent.click(chip);
    expect(await screen.findByRole("button", { name: "Turn to the front" })).toBeInTheDocument();
  });
});
