import { describe, it, expect } from "vitest";
import { signJwt } from "./exercise";

describe("nodejs/04-auth-security/03-sign-jwt", () => {
  it("returns three segments", () => {
    const token = signJwt({ sub: "1" }, "secret");
    expect(token.split(".")).toHaveLength(3);
  });
});