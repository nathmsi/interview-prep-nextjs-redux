/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/02-routing/02-express-router", () => {
  const app = createApp();

  it("GET /api/users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: "1", name: "Ada" }]);
  });
});
