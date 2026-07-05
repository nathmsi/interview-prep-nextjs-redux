/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/06-auth/01-jwt-auth", () => {
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    app = createApp();
  });

  it("register, login, me", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "a@b.com", password: "secret123" })
      .expect(201);

    const login = await request(app)
      .post("/auth/login")
      .send({ email: "a@b.com", password: "secret123" });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeTruthy();

    const me = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${login.body.token}`);
    expect(me.status).toBe(200);
    expect(me.body.email).toBe("a@b.com");
  });

  it("rejects /me without token", async () => {
    await request(app).get("/me").expect(401);
  });
});
