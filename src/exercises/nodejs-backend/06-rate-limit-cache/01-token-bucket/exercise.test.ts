import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TokenBucket } from "./exercise";

describe("nodejs/06-rate-limit-cache/01-token-bucket", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
  it("allows up to capacity", () => {
    const b = new TokenBucket(2, 1);
    expect(b.tryConsume()).toBe(true);
    expect(b.tryConsume()).toBe(true);
    expect(b.tryConsume()).toBe(false);
  });
});