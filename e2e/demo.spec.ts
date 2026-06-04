import { test, expect } from "@playwright/test";

test.describe("Redux demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
  });

  test("Redux counter", async ({ page }) => {
    const panel = page.locator("text=Redux counter").locator("..");
    await expect(panel.getByText("0")).toBeVisible();
    await panel.getByRole("button", { name: "+" }).click();
    await expect(panel.getByText("1")).toBeVisible();
    await panel.getByRole("button", { name: "−" }).click();
    await expect(panel.getByText("0")).toBeVisible();
  });

  test("product catalog and filter", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Catalog/i })).toBeVisible();
    await page.getByRole("button", { name: "books" }).click();
    await expect(
      page.getByText("TypeScript Handbook", { exact: true }).first()
    ).toBeVisible();
    await page.getByRole("button", { name: "Add" }).first().click();
    await expect(page.getByText(/1 item\(s\)/)).toBeVisible();
  });

  test("persist cart via API", async ({ page }) => {
    await page.getByRole("button", { name: "Add" }).first().click();
    await page.getByRole("button", { name: /Persist cart/i }).click();
    await expect(page.getByText(/1 item\(s\)/)).toBeVisible();
  });
});
