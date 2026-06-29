import { describe, it, expect } from "vitest";
import { verifyPassword, simpleHash } from "./exercise";

describe("nodejs/04-auth-security/02-verify-password", () => {
  it("verifies correct password", () => {
    const stored = { salt: "s", hash: simpleHash("s" + "pass") };
    expect(verifyPassword("pass", stored)).toBe(true);
  });
  it("rejects wrong password", () => {
    const stored = { salt: "s", hash: simpleHash("spass") };
    expect(verifyPassword("wrong", stored)).toBe(false);
  });
});