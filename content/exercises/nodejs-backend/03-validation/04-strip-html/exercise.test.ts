import { describe, it, expect } from "vitest";
import { stripHtmlTags } from "./exercise";

describe("nodejs/03-validation/04-strip-html", () => {
  it("strips tags", () => {
    expect(stripHtmlTags("<p>Hi</p>")).toBe("Hi");
  });
});