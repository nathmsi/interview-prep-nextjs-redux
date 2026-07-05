import { describe, it, expect } from "vitest";
import { processBatch } from "./exercise";

describe("nodejs/08-production-patterns/02-process-batch", () => {
  it("processes in batches", async () => {
    const r = await processBatch([1, 2, 3, 4], 2, async (n) => n * 2);
    expect(r).toEqual([2, 4, 6, 8]);
  });
});