import { describe, it, expect, vi } from "vitest";
import { memoize } from "./exercise";

describe("algo/08-fullstack-js/06-memoize", () => {
  it("caches result for same arguments", () => {
    const fn = vi.fn((n: number) => n * 2);
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("recomputes for different arguments", () => {
    const fn = vi.fn((n: number) => n * 2);
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(3)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("caches object argument keys via JSON.stringify", () => {
    const fn = vi.fn((obj: { id: number }) => obj.id * 10);
    const memoized = memoize(fn);

    expect(memoized({ id: 2 })).toBe(20);
    expect(memoized({ id: 2 })).toBe(20);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
