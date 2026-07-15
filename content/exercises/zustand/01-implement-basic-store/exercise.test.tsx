import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { Counter, useCounterStore } from "./exercise";

describe("zustand/01-implement-basic-store", () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });
  afterEach(() => cleanup());

  it("starts at 0", () => {
    render(<Counter />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("increments and decrements", () => {
    render(<Counter />);
    fireEvent.click(screen.getByTestId("inc"));
    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("count")).toHaveTextContent("2");

    fireEvent.click(screen.getByTestId("dec"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("resets to 0", () => {
    render(<Counter />);
    fireEvent.click(screen.getByTestId("inc"));
    fireEvent.click(screen.getByTestId("inc"));
    fireEvent.click(screen.getByTestId("reset"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("can be updated from outside React via getState()", () => {
    render(<Counter />);
    act(() => {
      useCounterStore.getState().increment();
    });
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });
});
