import { describe, it, expect } from "vitest";
import { validateCartBody } from "./validateCartBody";

describe("medium/03-route-handlers", () => {
  it("accepts valid cart body", () => {
    const r = validateCartBody({ items: [{ productId: "p1", quantity: 2 }] });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.items[0].quantity).toBe(2);
  });

  it("rejects invalid items", () => {
    const r = validateCartBody({ items: [{ productId: 1, quantity: -1 }] });
    expect(r.ok).toBe(false);
  });
});
