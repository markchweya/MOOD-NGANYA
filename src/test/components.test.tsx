import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Wordmark } from "@/components/brand/Wordmark";
import { IconButton } from "@/components/ui/IconButton";
import { palette } from "@/content/palette";
import { ToastProvider } from "@/features/toast/ToastProvider";
import { SwatchDetail } from "@/sections/palette/bus/SwatchDetail";

describe("Wordmark", () => {
  it("reads as MOOD even though the O's are smileys", () => {
    render(<Wordmark />);
    expect(screen.getByRole("img", { name: "MOOD" })).toBeInTheDocument();
  });
});

describe("IconButton", () => {
  it("renders a labelled button that calls back", async () => {
    const onClick = vi.fn();
    render(<IconButton label="Hoot the horn" icon={<svg />} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Hoot the horn" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an external link safely", () => {
    render(<IconButton label="Instagram" icon={<svg />} href="https://example.com" external />);
    const link = screen.getByRole("link", { name: "Instagram" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("SwatchDetail", () => {
  it("copies the hex and confirms with a toast", async () => {
    const swatch = palette[0]?.swatches[0];
    if (!swatch) throw new Error("palette is empty");
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();

    render(
      <ToastProvider>
        <SwatchDetail swatch={swatch} />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: `Copy ${swatch.hex}` }));

    expect(writeText).toHaveBeenCalledWith(swatch.hex);
    expect(await screen.findByRole("status")).toHaveTextContent(`Copied ${swatch.hex}`);
  });
});
