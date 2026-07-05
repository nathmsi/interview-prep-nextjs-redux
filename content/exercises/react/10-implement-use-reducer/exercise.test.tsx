import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { CounterControls } from "./exercise";

describe("react/10-implement-use-reducer", () => {
  afterEach(() => cleanup());

  it("starts at 0", () => {
    render(<CounterControls />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("increments and decrements", () => {
    render(<CounterControls />);
    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
    fireEvent.click(screen.getByTestId("decrement"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("resets to 0", () => {
    render(<CounterControls />);
    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("reset"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });
});
