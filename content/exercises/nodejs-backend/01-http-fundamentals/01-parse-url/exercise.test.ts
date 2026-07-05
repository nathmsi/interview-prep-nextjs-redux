import { describe, it, expect } from "vitest";
import { parseUrl } from "./exercise";

describe("nodejs/01-http-fundamentals/01-parse-url", () => {
  it("parses pathname only", () => {
    expect(parseUrl("/users")).toEqual({ pathname: "/users", query: {} });
  });
  it("parses query string", () => {
    expect(parseUrl("/users?page=2&limit=10")).toEqual({
      pathname: "/users",
      query: { page: "2", limit: "10" },
    });
  });
  it("decodes encoded values", () => {
    expect(parseUrl("/search?q=hello%20world")).toEqual({
      pathname: "/search",
      query: { q: "hello world" },
    });
  });
});