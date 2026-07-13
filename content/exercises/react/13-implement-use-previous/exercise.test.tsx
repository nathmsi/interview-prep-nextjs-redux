import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { CounterWithPrevious } from "./exercise";

describe("react/13-implement-use-previous", () => {
  afterEach(() => cleanup());

  it("has no previous value on the first render", () => {
    render(<CounterWithPrevious />);
    expect(screen.getByTestId("current")).toHaveTextContent("0");
    expect(screen.getByTestId("previous")).toHaveTextContent("none");
  });

  it("exposes the previous render's value after a change", () => {
    render(<CounterWithPrevious />);

    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("previous")).toHaveTextContent("0");

    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("current")).toHaveTextContent("2");
    expect(screen.getByTestId("previous")).toHaveTextContent("1");
  });
});
