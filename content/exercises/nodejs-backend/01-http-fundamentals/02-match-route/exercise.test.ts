import { describe, it, expect } from "vitest";
import { matchRoute } from "./exercise";

describe("nodejs/01-http-fundamentals/02-match-route", () => {
  it("matches static path", () => {
    expect(matchRoute("/health", "/health")).toEqual({ params: {} });
  });
  it("extracts params", () => {
    expect(matchRoute("/users/:id", "/users/42")).toEqual({ params: { id: "42" } });
  });
  it("returns null on mismatch", () => {
    expect(matchRoute("/users/:id", "/posts/1")).toBeNull();
  });
});