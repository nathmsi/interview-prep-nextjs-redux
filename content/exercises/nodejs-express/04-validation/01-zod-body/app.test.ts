/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/04-validation/01-zod-body", () => {
  const app = createApp();

  it("creates user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "a@b.com", name: "Ada" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: "1", email: "a@b.com", name: "Ada" });
  });

  it("rejects invalid email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "bad", name: "Ada" });
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
