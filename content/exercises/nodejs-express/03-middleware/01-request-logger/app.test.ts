/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp, requestLogs } from "./app";

describe("express/03-middleware/01-request-logger", () => {
  beforeEach(() => { requestLogs.length = 0; });

  it("logs requests", async () => {
    const app = createApp();
    await request(app).get("/test");
    expect(requestLogs).toContain("GET /test");
  });
});
