/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/05-crud/01-todos-api", () => {
  const app = createApp();

  it("CRUD flow", async () => {
    const list = await request(app).get("/api/todos");
    expect(list.body).toEqual([]);

    const created = await request(app)
      .post("/api/todos")
      .send({ title: "Learn Express" });
    expect(created.status).toBe(201);
    expect(created.body.title).toBe("Learn Express");

    const id = created.body.id;
    const one = await request(app).get(`/api/todos/${id}`);
    expect(one.status).toBe(200);

    await request(app).delete(`/api/todos/${id}`).expect(204);
    await request(app).get(`/api/todos/${id}`).expect(404);
  });
});
