import { describe, it, expect } from "vitest";
import { validateCartBody } from "./solution";

describe("solution medium/03", () => {
  it("validateCartBody", () => {
    expect(validateCartBody({ items: [{ productId: "p1", quantity: 1 }] }).ok).toBe(
      true
    );
    expect(validateCartBody({ items: [] }).ok).toBe(true);
    expect(validateCartBody(null).ok).toBe(false);
  });
});
