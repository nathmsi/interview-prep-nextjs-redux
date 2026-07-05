import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ResponseCache } from "./exercise";

describe("nodejs/06-rate-limit-cache/02-response-cache", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
  it("caches and expires", () => {
    const c = new ResponseCache<string>();
    c.set("k", "v", 1000);
    expect(c.get("k")).toBe("v");
    vi.advanceTimersByTime(1001);
    expect(c.get("k")).toBeUndefined();
  });
});