import { describe, it, expect } from "vitest";
import { createCorsMiddleware } from "./exercise";

describe("nodejs/02-middleware/03-cors-middleware", () => {
  it("sets allowed origin", () => {
    const res = { headers: {} as Record<string, string> };
    createCorsMiddleware(["https://app.com"])({ headers: { origin: "https://app.com" } }, res, () => {});
    expect(res.headers["Access-Control-Allow-Origin"]).toBe("https://app.com");
  });
});