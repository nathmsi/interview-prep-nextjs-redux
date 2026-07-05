import { describe, it, expect } from "vitest";
import { deepMerge } from "./exercise";

describe("algo/08-fullstack-js/19-deep-merge", () => {
  it("merges nested objects", () => {
    const result = deepMerge(
      { a: 1, b: { x: 1, z: 3 } },
      { b: { y: 2 } }
    );
    expect(result).toEqual({ a: 1, b: { x: 1, y: 2, z: 3 } });
  });

  it("replaces arrays from source", () => {
    const result = deepMerge({ a: [1, 2] }, { a: [3] });
    expect(result).toEqual({ a: [3] });
  });

  it("overwrites primitives", () => {
    const result = deepMerge({ a: 1, b: 2 }, { b: 99 });
    expect(result).toEqual({ a: 1, b: 99 });
  });

  it("does not mutate target", () => {
    const target = { a: { x: 1 } };
    deepMerge(target, { a: { y: 2 } });
    expect(target).toEqual({ a: { x: 1 } });
  });
});
