import { describe, it, expect } from "vitest";
import { mapWithLimit } from "./exercise";

describe("algo/08-fullstack-js/17-concurrency-limit", () => {
  it("maps all items preserving order", async () => {
    const result = await mapWithLimit([1, 2, 3], 2, async (x) => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it("returns empty array for no items", async () => {
    await expect(mapWithLimit([], 2, async (x) => x)).resolves.toEqual([]);
  });

  it("never exceeds the concurrency limit", async () => {
    let inFlight = 0;
    let maxInFlight = 0;

    await mapWithLimit([1, 2, 3, 4, 5], 2, async (x) => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 10));
      inFlight--;
      return x;
    });

    expect(maxInFlight).toBeLessThanOrEqual(2);
  });

  it("preserves order when tasks finish at different speeds", async () => {
    const items = [100, 10, 50];
    const result = await mapWithLimit(items, 2, async (ms) => {
      await new Promise((resolve) => setTimeout(resolve, ms));
      return ms;
    });
    expect(result).toEqual([100, 10, 50]);
  });
});
