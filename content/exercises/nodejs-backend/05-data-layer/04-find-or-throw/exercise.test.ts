import { describe, it, expect } from "vitest";
import { findOrThrow, NotFoundError } from "./exercise";

describe("nodejs/05-data-layer/04-find-or-throw", () => {
  it("returns item", () => {
    expect(findOrThrow([{ id: 1 }], (x) => x.id === 1)).toEqual({ id: 1 });
  });
  it("throws when missing", () => {
    expect(() => findOrThrow([], () => true)).toThrow(NotFoundError);
  });
});