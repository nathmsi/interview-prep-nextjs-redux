import { describe, it, expect } from "vitest";
import { uniqueBy } from "./exercise";

describe("algo/08-fullstack-js/24-unique-by", () => {
  it("keeps first item per key", () => {
    const items = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 1, name: "c" },
    ];
    expect(uniqueBy(items, (x) => x.id)).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ]);
  });

  it("returns empty array for empty input", () => {
    expect(uniqueBy([], (x: { id: number }) => x.id)).toEqual([]);
  });

  it("returns all items when keys are unique", () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(uniqueBy(items, (x) => x.id)).toEqual(items);
  });
});
