import { describe, it, expect } from "vitest";
import { SlidingWindowLimiter } from "./exercise";

describe("nodejs/06-rate-limit-cache/04-sliding-window", () => {
  it("limits requests", () => {
    const l = new SlidingWindowLimiter(2, 1000);
    expect(l.tryAcquire(0)).toBe(true);
    expect(l.tryAcquire(100)).toBe(true);
    expect(l.tryAcquire(200)).toBe(false);
    expect(l.tryAcquire(1001)).toBe(true);
  });
});