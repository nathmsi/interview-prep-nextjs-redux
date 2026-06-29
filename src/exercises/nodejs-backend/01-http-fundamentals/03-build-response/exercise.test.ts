import { describe, it, expect } from "vitest";
import { buildResponse } from "./exercise";

describe("nodejs/01-http-fundamentals/03-build-response", () => {
  it("serializes object as JSON", () => {
    const res = buildResponse(200, { ok: true });
    expect(res.body).toBe('{"ok":true}');
    expect(res.headers["Content-Type"]).toBe("application/json");
  });
  it("keeps string body", () => {
    expect(buildResponse(200, "plain").body).toBe("plain");
  });
});