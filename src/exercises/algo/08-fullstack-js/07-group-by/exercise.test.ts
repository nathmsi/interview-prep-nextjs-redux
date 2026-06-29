import { describe, it, expect } from "vitest";
import { groupBy } from "./exercise";

describe("algo/08-fullstack-js/07-group-by", () => {
  it("groups items by key function result", () => {
    const items = [
      { type: "a", v: 1 },
      { type: "b", v: 2 },
      { type: "a", v: 3 },
    ];
    expect(groupBy(items, (x) => x.type)).toEqual({
      a: [
        { type: "a", v: 1 },
        { type: "a", v: 3 },
      ],
      b: [{ type: "b", v: 2 }],
    });
  });

  it("returns empty object for empty array", () => {
    expect(groupBy([], (x: number) => x)).toEqual({});
  });

  it("groups numbers by parity", () => {
    expect(groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? "even" : "odd"))).toEqual({
      odd: [1, 3],
      even: [2, 4],
    });
  });
});
