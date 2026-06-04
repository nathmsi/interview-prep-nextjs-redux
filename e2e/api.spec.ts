import { test, expect } from "@playwright/test";

test.describe("API REST", () => {
  test("GET /api/health", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  test("GET /api/products and filter", async ({ request }) => {
    const all = await request.get("/api/products");
    expect(all.ok()).toBeTruthy();
    const products = await all.json();
    expect(products.length).toBeGreaterThanOrEqual(5);

    const books = await request.get("/api/products?category=books");
    const list = await books.json();
    expect(list.every((p: { category: string }) => p.category === "books")).toBe(
      true
    );
  });

  test("POST /api/cart cycle", async ({ request }) => {
    await request.delete("/api/cart");
    const post = await request.post("/api/cart", {
      data: { items: [{ productId: "p1", quantity: 2 }] },
    });
    expect(post.ok()).toBeTruthy();
    const get = await request.get("/api/cart");
    const body = await get.json();
    expect(body.items).toEqual([{ productId: "p1", quantity: 2 }]);
  });
});
