import { describe, it, expect } from "vitest";
import { signJwt, verifyJwt } from "./exercise";

describe("nodejs/04-auth-security/04-verify-jwt", () => {
  it("round-trips with signJwt", () => {
    const token = signJwt({ sub: "42" }, "key");
    expect(verifyJwt(token, "key")).toEqual({ sub: "42" });
  });
});