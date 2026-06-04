import { test, expect } from "@playwright/test";

test.describe("Lessons", () => {
  test("lessons index", async ({ page }) => {
    await page.goto("/lessons");
    await expect(page.getByRole("heading", { name: /Lessons index/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Next.js course \(10 lessons\)/i })
    ).toBeVisible();
    await expect(
      page.locator('a[href="/lessons/easy/01-server-vs-client"]')
    ).toBeVisible();
  });

  test("easy/01 lesson page", async ({ page }) => {
    await page.goto("/lessons/easy/01-server-vs-client");
    await expect(
      page.getByRole("heading", { name: /Server vs Client Components/i })
    ).toBeVisible();
    await expect(page.getByText(/Exercise & solution/i)).toBeVisible();
  });

  test("nextjs overview lesson", async ({ page }) => {
    await page.goto("/lessons/nextjs/01-overview-and-tooling");
    await expect(
      page.getByRole("heading", { name: /overview & what the framework/i })
    ).toBeVisible();
  });
});
