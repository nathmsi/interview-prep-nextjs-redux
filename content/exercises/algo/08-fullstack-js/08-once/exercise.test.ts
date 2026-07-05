import { describe, it, expect, vi } from "vitest";
import { once } from "./exercise";

describe("algo/08-fullstack-js/08-once", () => {
  it("calls fn only once", () => {
    const fn = vi.fn(() => 42);
    const run = once(fn);

    expect(run()).toBe(42);
    expect(run()).toBe(42);
    expect(run()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("returns cached result on later calls", () => {
    let count = 0;
    const run = once(() => {
      count++;
      return count;
    });

    expect(run()).toBe(1);
    expect(run()).toBe(1);
    expect(count).toBe(1);
  });

  it("passes arguments only on first call", () => {
    const fn = vi.fn((_a: string, _b: number) => "ok");
    const run = once(fn);

    run("hello", 5);
    run("ignored", 99);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("hello", 5);
  });
});
