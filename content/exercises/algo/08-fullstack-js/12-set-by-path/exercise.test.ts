import { describe, it, expect } from "vitest";
import { setByPath } from "./exercise";

describe("algo/08-fullstack-js/12-set-by-path", () => {
  it("creates nested path on empty object", () => {
    const obj: Record<string, unknown> = {};
    setByPath(obj, "a.b.c", 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });

  it("overwrites existing value", () => {
    const obj = { a: { b: 1 } };
    setByPath(obj, "a.b", 2);
    expect(obj).toEqual({ a: { b: 2 } });
  });

  it("sets top-level key", () => {
    const obj: Record<string, unknown> = {};
    setByPath(obj, "x", "ok");
    expect(obj).toEqual({ x: "ok" });
  });

  it("creates intermediate objects when missing", () => {
    const obj = { a: {} as Record<string, unknown> };
    setByPath(obj, "a.b.c", 10);
    expect(obj).toEqual({ a: { b: { c: 10 } } });
  });
});
