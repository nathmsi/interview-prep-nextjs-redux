import { describe, it, expect, vi, afterEach } from "vitest";
import { render, act, cleanup } from "@testing-library/react";
import { Timer } from "./exercise";

describe("react/04-debug-interval-cleanup", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("stops calling onTick after unmount", () => {
    vi.useFakeTimers();
    const onTick = vi.fn();
    const { unmount } = render(<Timer onTick={onTick} />);

    act(() => vi.advanceTimersByTime(250));
    expect(onTick).toHaveBeenCalledTimes(2);

    unmount();

    act(() => vi.advanceTimersByTime(500));
    expect(onTick).toHaveBeenCalledTimes(2);
  });
});
