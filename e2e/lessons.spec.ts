import { test, expect } from "@playwright/test";

test.describe("Lessons", () => {
  test("lessons index", async ({ page }) => {
    await page.goto("/lessons");
    await expect(page.getByRole("heading", { name: /Lessons index/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Server vs Client/i })).toBeVisible();
  });

  test("easy/01 lesson page", async ({ page }) => {
    await page.goto("/lessons/easy/01-server-vs-client");
    await expect(page.getByRole("heading", { name: /Server vs Client/i })).toBeVisible();
    await expect(page.getByText(/Exercise & solution/i)).toBeVisible();
  });
});
