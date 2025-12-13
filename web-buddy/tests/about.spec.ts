import { test, expect } from "@playwright/test";

test("homepage has correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/nobuddy/);
});

test("navigate to About page and verify content", async ({ page }) => {
  await page.goto("/");
  await page.click("text=About");
  await expect(page).toHaveURL(/\/about$/);

  const aboutHeading = page.locator("h1");
  await expect(aboutHeading).toBeVisible();
  await expect(aboutHeading).toHaveText(/About/i);

  const contactEmail = page.locator("p", { hasText: "info@nobuddy.org" });
  await expect(contactEmail).toHaveCount(2);
  await expect(contactEmail.first()).toBeVisible();

  const disclaimerText = page.locator("text=This project is purely private");
  await expect(disclaimerText).toBeVisible();
});
