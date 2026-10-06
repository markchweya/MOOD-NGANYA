import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { h } from "vue";
import Wordmark from "@/components/brand/Wordmark.vue";
import IconButton from "@/components/ui/IconButton.vue";
import ToastHost from "@/components/ui/ToastHost.vue";
import { palette } from "@/content/palette";
import SwatchDetail from "@/sections/palette/bus/SwatchDetail.vue";

const icon = { default: () => h("svg") };

describe("Wordmark", () => {
  it("reads as MOOD even though the O's are smileys", () => {
    render(Wordmark);
    expect(screen.getByRole("img", { name: "MOOD" })).toBeInTheDocument();
  });
});

describe("IconButton", () => {
  it("renders a labelled button that emits click", async () => {
    const onClick = vi.fn();
    render(IconButton, { props: { label: "Hoot the horn", onClick }, slots: icon });
    await userEvent.click(screen.getByRole("button", { name: "Hoot the horn" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an external link safely", () => {
    render(IconButton, {
      props: { label: "Instagram", href: "https://example.com", external: true },
      slots: icon,
    });
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

    render({ render: () => [h(SwatchDetail, { swatch }), h(ToastHost)] });
    await user.click(screen.getByRole("button", { name: `Copy ${swatch.hex}` }));

    expect(writeText).toHaveBeenCalledWith(swatch.hex);
    expect(await screen.findByRole("status")).toHaveTextContent(`Copied ${swatch.hex}`);
  });
});
