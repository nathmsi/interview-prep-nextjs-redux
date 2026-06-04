import { test, expect } from "@playwright/test";

test.describe("Subjects", () => {
  test("typescript subject page lists theory + quiz", async ({ page }) => {
    await page.goto("/subjects/typescript");
    await expect(
      page.getByRole("link", { name: /types, inference/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /20 questions/i })
    ).toBeVisible();
  });

  test("ai subject page lists skills and rules lesson", async ({ page }) => {
    await page.goto("/subjects/ai");
    await expect(
      page.getByRole("heading", { name: "AI & coding", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Skills, Rules/i })
    ).toBeVisible();
  });

  test("css subject page lists its lessons", async ({ page }) => {
    await page.goto("/subjects/css");
    await expect(page.getByRole("heading", { name: "CSS", exact: true })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /CSS — interview Q&A/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /styling libraries/i })
    ).toBeVisible();
  });

  test("/lessons redirects to /subjects", async ({ page }) => {
    await page.goto("/lessons");
    await expect(page).toHaveURL(/\/subjects$/);
  });
});

test.describe("Lessons", () => {
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
