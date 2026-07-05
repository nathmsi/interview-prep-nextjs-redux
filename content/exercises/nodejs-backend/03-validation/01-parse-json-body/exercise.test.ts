import { describe, it, expect } from "vitest";
import { parseJsonBody, BodyTooLargeError, InvalidJsonError } from "./exercise";

describe("nodejs/03-validation/01-parse-json-body", () => {
  it("parses JSON", () => {
    expect(parseJsonBody('{"a":1}', 100)).toEqual({ a: 1 });
  });
  it("throws on large body", () => {
    expect(() => parseJsonBody("x".repeat(11), 10)).toThrow(BodyTooLargeError);
  });
  it("throws on invalid JSON", () => {
    expect(() => parseJsonBody("{", 100)).toThrow(InvalidJsonError);
  });
});