import { test, expect } from "@playwright/test";

test.describe("Lessons", () => {
  test("lessons index by subject", async ({ page }) => {
    await page.goto("/lessons");
    await expect(page.getByRole("heading", { name: /Lessons by subject/i })).toBeVisible();
    await expect(page.locator("#javascript")).toBeVisible();
    await expect(page.locator("#libraries")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /JavaScript — basic interview/i })
    ).toBeVisible();
  });

  test("easy exercise lesson still reachable (not in nav)", async ({ page }) => {
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

  test("libraries lesson", async ({ page }) => {
    await page.goto("/lessons/libraries/01-essential-libraries");
    await expect(
      page.getByRole("heading", { name: /Essential front-end libraries/i })
    ).toBeVisible();
  });
});
