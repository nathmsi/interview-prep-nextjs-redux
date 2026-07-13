import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { SearchBox } from "./exercise";

describe("react/17-implement-use-throttle", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("starts with the initial value (empty)", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("throttled")).toHaveTextContent("");
  });

  it("lets an isolated change through after the delay", () => {
    render(<SearchBox />);
    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "hello" },
    });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(screen.getByTestId("throttled")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByTestId("throttled")).toHaveTextContent("hello");
  });

  it("batches rapid changes and only applies the last value", () => {
    render(<SearchBox />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "a" } });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.change(input, { target: { value: "ab" } });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.change(input, { target: { value: "abc" } });

    // Still within the 300ms window since the very first change
    expect(screen.getByTestId("throttled")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    // 300ms since "a" → jumps directly to the last known value
    expect(screen.getByTestId("throttled")).toHaveTextContent("abc");
  });
});
