import { describe, it, expect } from "vitest";
import { deepEqual } from "./exercise";

describe("algo/08-fullstack-js/02-deep-equal", () => {
  it("compares equal primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "a")).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
  });

  it("compares equal flat objects", () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it("compares nested structures", () => {
    expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
  });

  it("returns false for different values", () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual([1, 2], [1, 3])).toBe(false);
  });

  it("returns false for different key counts", () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });
});
