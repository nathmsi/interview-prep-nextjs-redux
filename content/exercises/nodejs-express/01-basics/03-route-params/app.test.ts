/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/01-basics/03-route-params", () => {
  const app = createApp();

  it("GET /users/:id", async () => {
    const res = await request(app).get("/users/42");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "42", name: "User 42" });
  });
});
