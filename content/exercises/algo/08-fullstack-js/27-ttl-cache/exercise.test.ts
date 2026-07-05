import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TTLCache } from "./exercise";

describe("algo/08-fullstack-js/27-ttl-cache", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns value before ttl expires", () => {
    const cache = new TTLCache<number>(1000);
    cache.set("a", 42);
    expect(cache.get("a")).toBe(42);
  });

  it("returns undefined after ttl expires", () => {
    const cache = new TTLCache<number>(1000);
    cache.set("a", 42);

    vi.advanceTimersByTime(1000);
    expect(cache.get("a")).toBeUndefined();
  });

  it("returns undefined for missing key", () => {
    const cache = new TTLCache<string>(500);
    expect(cache.get("missing")).toBeUndefined();
  });

  it("refreshes ttl on set", () => {
    const cache = new TTLCache<number>(1000);
    cache.set("a", 1);
    vi.advanceTimersByTime(800);
    cache.set("a", 2);
    vi.advanceTimersByTime(800);
    expect(cache.get("a")).toBe(2);

    vi.advanceTimersByTime(201);
    expect(cache.get("a")).toBeUndefined();
  });
});
