import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("shows title and easy lessons", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Interview Recap/i })
    ).toBeVisible();
    await expect(page.getByText("Server vs Client Components")).toBeVisible();
  });

  test("link to demo", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /interactive demo/i }).click();
    await expect(page).toHaveURL(/\/demo/);
    await expect(page.getByRole("heading", { name: /Live demo/i })).toBeVisible();
  });
});
