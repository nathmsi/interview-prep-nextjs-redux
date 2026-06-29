import { describe, it, expect } from "vitest";
import { hashPassword } from "./exercise";

describe("nodejs/04-auth-security/01-hash-password", () => {
  it("returns salt and hash", () => {
    const r = hashPassword("secret", () => "salt");
    expect(r.salt).toBe("salt");
    expect(r.hash.length).toBeGreaterThan(0);
  });
});