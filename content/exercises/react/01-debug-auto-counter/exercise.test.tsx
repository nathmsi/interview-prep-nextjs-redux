import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act, fireEvent, cleanup } from "@testing-library/react";
import { AutoCounter } from "./exercise";

describe("react/01-debug-auto-counter", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("auto-increments every 100ms", () => {
    vi.useFakeTimers();
    render(<AutoCounter />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByTestId("count")).toHaveTextContent("3");
  });

  it("increments on button click", () => {
    vi.useFakeTimers();
    render(<AutoCounter />);
    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("handles rapid clicks", () => {
    vi.useFakeTimers();
    render(<AutoCounter />);
    const btn = screen.getByTestId("increment");
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.getByTestId("count")).toHaveTextContent("3");
  });
});
