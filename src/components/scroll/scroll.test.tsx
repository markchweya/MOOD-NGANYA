import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Construct } from "./Construct";
import { JoinSides } from "./JoinSides";
import { PuzzleBoard, PuzzlePiece } from "./Puzzle";
import { Rise } from "./Rise";

describe("scroll entrances", () => {
  it("Rise renders its content", () => {
    render(<Rise>lifted</Rise>);
    expect(screen.getByText("lifted")).toBeInTheDocument();
  });

  it("JoinSides renders both halves", () => {
    render(<JoinSides left="left half" right="right half" />);
    expect(screen.getByText("left half")).toBeInTheDocument();
    expect(screen.getByText("right half")).toBeInTheDocument();
  });

  it("JoinSides can render inline inside a heading", () => {
    render(
      <h2>
        <JoinSides inline left="Too rare" right="compared" />
      </h2>,
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Too rarecompared");
  });

  it("Construct renders its content under the decorative blocks", () => {
    render(<Construct>built</Construct>);
    expect(screen.getByText("built")).toBeInTheDocument();
  });

  it("Puzzle pieces render inside their board", () => {
    render(
      <PuzzleBoard>
        <PuzzlePiece index={0}>piece one</PuzzlePiece>
        <PuzzlePiece index={1}>piece two</PuzzlePiece>
      </PuzzleBoard>,
    );
    expect(screen.getByText("piece one")).toBeInTheDocument();
    expect(screen.getByText("piece two")).toBeInTheDocument();
  });
});
