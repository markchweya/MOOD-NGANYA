import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import Construct from "./Construct.vue";
import JoinSides from "./JoinSides.vue";
import PuzzleBoard from "./PuzzleBoard.vue";
import PuzzlePiece from "./PuzzlePiece.vue";
import Rise from "./Rise.vue";

describe("scroll entrances", () => {
  it("Rise renders its content", () => {
    render(Rise, { slots: { default: () => "lifted" } });
    expect(screen.getByText("lifted")).toBeInTheDocument();
  });

  it("JoinSides renders both halves", () => {
    render(JoinSides, { slots: { left: () => "left half", right: () => "right half" } });
    expect(screen.getByText("left half")).toBeInTheDocument();
    expect(screen.getByText("right half")).toBeInTheDocument();
  });

  it("JoinSides can render inline inside a heading", () => {
    render({
      render: () =>
        h("h2", [
          h(JoinSides, { inline: true }, { left: () => "Too rare", right: () => "compared" }),
        ]),
    });
    expect(screen.getByRole("heading")).toHaveTextContent("Too rarecompared");
  });

  it("Construct renders its content under the decorative blocks", () => {
    render(Construct, { slots: { default: () => "built" } });
    expect(screen.getByText("built")).toBeInTheDocument();
  });

  it("Puzzle pieces render inside their board", () => {
    render(PuzzleBoard, {
      slots: {
        default: () => [
          h(PuzzlePiece, { index: 0 }, () => "piece one"),
          h(PuzzlePiece, { index: 1 }, () => "piece two"),
        ],
      },
    });
    expect(screen.getByText("piece one")).toBeInTheDocument();
    expect(screen.getByText("piece two")).toBeInTheDocument();
  });
});
