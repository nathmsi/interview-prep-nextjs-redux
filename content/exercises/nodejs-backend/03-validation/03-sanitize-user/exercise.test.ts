import { describe, it, expect } from "vitest";
import { sanitizeUserInput } from "./exercise";

describe("nodejs/03-validation/03-sanitize-user", () => {
  it("normalizes email", () => {
    expect(sanitizeUserInput({ email: "  A@B.COM ", name: "Ada" }).email).toBe("a@b.com");
  });
});