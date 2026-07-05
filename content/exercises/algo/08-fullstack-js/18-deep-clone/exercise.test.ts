import { describe, it, expect } from "vitest";
import { deepClone } from "./exercise";

describe("algo/08-fullstack-js/18-deep-clone", () => {
  it("clones primitives", () => {
    expect(deepClone(5)).toBe(5);
    expect(deepClone("hi")).toBe("hi");
    expect(deepClone(null)).toBe(null);
  });

  it("clones nested objects independently", () => {
    const original = { a: 1, b: { c: 2 } };
    const copy = deepClone(original);

    expect(copy).toEqual(original);
    copy.b.c = 99;
    expect(original.b.c).toBe(2);
  });

  it("clones nested arrays independently", () => {
    const original = [1, [2, 3], { a: 4 }];
    const copy = deepClone(original);

    expect(copy).toEqual(original);
    (copy[1] as number[])[0] = 99;
    expect((original[1] as number[])[0]).toBe(2);
  });
});
