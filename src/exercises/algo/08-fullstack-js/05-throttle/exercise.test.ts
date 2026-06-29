import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { throttle } from "./exercise";

describe("algo/08-fullstack-js/05-throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls immediately on first invocation", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("ignores calls within the wait window", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("allows a call after wait ms have passed", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    vi.advanceTimersByTime(100);
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("passes arguments from the first call in the window", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled("first");
    throttled("ignored");

    expect(fn).toHaveBeenCalledWith("first");
  });
});
