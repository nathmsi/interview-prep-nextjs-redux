import { describe, it, expect } from "vitest";
import { paginateOffset } from "./exercise";

describe("nodejs/05-data-layer/02-offset-pagination", () => {
  it("paginates", () => {
    const r = paginateOffset([1, 2, 3, 4, 5], 2, 2);
    expect(r.items).toEqual([3, 4]);
    expect(r.totalPages).toBe(3);
  });
});