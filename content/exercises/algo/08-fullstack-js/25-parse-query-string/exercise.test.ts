import { describe, it, expect } from "vitest";
import { parseQueryString, stringifyQuery } from "./exercise";

describe("algo/08-fullstack-js/25-parse-query-string", () => {
  describe("parseQueryString", () => {
    it("parses key=value pairs", () => {
      expect(parseQueryString("a=1&b=2")).toEqual({ a: "1", b: "2" });
    });

    it("returns empty object for empty string", () => {
      expect(parseQueryString("")).toEqual({});
    });

    it("handles single pair", () => {
      expect(parseQueryString("foo=bar")).toEqual({ foo: "bar" });
    });
  });

  describe("stringifyQuery", () => {
    it("builds query string from object", () => {
      expect(stringifyQuery({ a: "1", b: "2" })).toBe("a=1&b=2");
    });

    it("returns empty string for empty object", () => {
      expect(stringifyQuery({})).toBe("");
    });
  });

  it("round-trips", () => {
    const params = { x: "hello", y: "world" };
    expect(parseQueryString(stringifyQuery(params))).toEqual(params);
  });
});
