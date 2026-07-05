import { describe, it, expect } from "vitest";
import { getByPath } from "./exercise";

describe("algo/08-fullstack-js/03-get-by-path", () => {
  it("reads nested object path", () => {
    expect(getByPath({ a: { b: { c: 42 } } }, "a.b.c")).toBe(42);
  });

  it("returns undefined for missing path", () => {
    expect(getByPath({ a: 1 }, "a.b")).toBeUndefined();
  });

  it("reads array indices as path segments", () => {
    expect(getByPath([1, [2, 3]], "1.1")).toBe(3);
  });

  it("returns undefined for null root", () => {
    expect(getByPath(null, "a")).toBeUndefined();
  });

  it("reads top-level key", () => {
    expect(getByPath({ x: "ok" }, "x")).toBe("ok");
  });
});
