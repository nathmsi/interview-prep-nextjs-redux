import { describe, it, expect, vi } from "vitest";
import { dedupeRequests } from "./exercise";

describe("nodejs/06-rate-limit-cache/03-request-dedup", () => {
  it("dedupes concurrent calls", async () => {
    const fn = vi.fn().mockResolvedValue(42);
    const p1 = dedupeRequests("k", fn);
    const p2 = dedupeRequests("k", fn);
    expect(await p1).toBe(42);
    expect(await p2).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});