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

  const languageSections = page.locator("h2", { hasText: /English|Deutsch/ });
  const contactEmail = page.locator("p", { hasText: "info@nobuddy.org" });
  await expect(contactEmail).toHaveCount(await languageSections.count());
  await expect(contactEmail.first()).toBeVisible();

  const disclaimerText = page.locator("text=This project is purely private");
  await expect(disclaimerText).toBeVisible();
});

test("German Impressum section is marked lang=\"de\"", async ({ page }) => {
  await page.goto("/about");

  const germanHeading = page.getByRole("heading", { name: "Deutsch" });
  const germanSection = page.locator('[lang="de"]', {
    has: germanHeading,
  });
  await expect(germanSection).toHaveCount(1);
  await expect(
    germanSection.getByText("Haftungsausschluss")
  ).toBeVisible();
});
