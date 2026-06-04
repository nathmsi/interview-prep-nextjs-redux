import { describe, it, expect } from "vitest";
import { validateCartBody } from "./validateCartBody";

describe("medium/03-route-handlers", () => {
  it("accepte un panier valide", () => {
    const r = validateCartBody({ items: [{ productId: "p1", quantity: 2 }] });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.items[0].quantity).toBe(2);
  });

  it("rejette items invalides", () => {
    const r = validateCartBody({ items: [{ productId: 1, quantity: -1 }] });
    expect(r.ok).toBe(false);
  });
});
