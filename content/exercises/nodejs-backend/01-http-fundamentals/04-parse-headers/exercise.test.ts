import { describe, it, expect } from "vitest";
import { parseHeaders } from "./exercise";

describe("nodejs/01-http-fundamentals/04-parse-headers", () => {
  it("parses headers", () => {
    const raw = "Content-Type: application/json\nAuthorization: Bearer t";
    expect(parseHeaders(raw)).toEqual({
      "content-type": "application/json",
      authorization: "Bearer t",
    });
  });
});