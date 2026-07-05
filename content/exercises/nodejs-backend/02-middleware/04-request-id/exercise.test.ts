import { describe, it, expect } from "vitest";
import { requestIdMiddleware } from "./exercise";

describe("nodejs/02-middleware/04-request-id", () => {
  it("generates id", () => {
    const req = { headers: {} };
    const res = { headers: {} as Record<string, string> };
    requestIdMiddleware(() => "id-1")(req, res, () => {});
    expect(req.id).toBe("id-1");
  });
});