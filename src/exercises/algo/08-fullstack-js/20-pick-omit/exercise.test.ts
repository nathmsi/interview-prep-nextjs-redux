import { describe, it, expect } from "vitest";
import { pick, omit } from "./exercise";

describe("algo/08-fullstack-js/20-pick-omit", () => {
  const obj = { a: 1, b: 2, c: 3 };

  describe("pick", () => {
    it("keeps only selected keys", () => {
      expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });

    it("returns empty object when no keys match", () => {
      expect(pick(obj, [])).toEqual({});
    });

    it("does not mutate original", () => {
      pick(obj, ["a"]);
      expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    });
  });

  describe("omit", () => {
    it("removes selected keys", () => {
      expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
    });

    it("returns copy when omitting nothing", () => {
      expect(omit(obj, [])).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("does not mutate original", () => {
      omit(obj, ["a"]);
      expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    });
  });
});
