import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("shows interview prep hub and subjects", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Front-end interview preparation/i })
    ).toBeVisible();
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "JavaScript", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "TypeScript", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "React", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Next.js", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "CSS", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Libraries", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "AI & coding", exact: true })).toBeVisible();
  });

  test("subject cards open dedicated subject page", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /JavaScript.*basic, medium/i })
      .click();
    await expect(page).toHaveURL(/\/subjects\/javascript$/);
    await expect(page.getByRole("heading", { name: "JavaScript", exact: true })).toBeVisible();
  });
});
