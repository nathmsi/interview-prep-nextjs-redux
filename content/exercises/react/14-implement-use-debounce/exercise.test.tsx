import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { SearchBox } from "./exercise";

describe("react/14-implement-use-debounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("starts with an empty debounced value", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("debounced")).toHaveTextContent("");
  });

  it("does not update the debounced value before the delay ends", () => {
    render(<SearchBox />);

    fireEvent.change(screen.getByTestId("input"), { target: { value: "a" } });

    // The input changes immediately...
    expect(screen.getByTestId("input")).toHaveValue("a");
    // ...but not the debounced value
    expect(screen.getByTestId("debounced")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(screen.getByTestId("debounced")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByTestId("debounced")).toHaveTextContent("a");
  });

  it("cancels the previous timer if the value changes again (debounce)", () => {
    render(<SearchBox />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "a" } });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Changes again before 300ms → timer resets
    fireEvent.change(input, { target: { value: "ab" } });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    // Total 400ms since "a" but only 200ms since "ab" → still empty
    expect(screen.getByTestId("debounced")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    // 300ms since "ab" → update, jumps directly to "ab"
    expect(screen.getByTestId("debounced")).toHaveTextContent("ab");
  });
});
