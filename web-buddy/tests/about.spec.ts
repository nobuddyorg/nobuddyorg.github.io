import { test, expect } from "@playwright/test";

test("homepage has correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/nobuddy/);
});

test("navigate to About page and verify content", async ({ page }) => {
  await page.goto("/");
  await page.click("text=About");
  await expect(page).toHaveURL(/\/about$/);

  const aboutHeading = page.getByTestId("about-heading");
  await expect(aboutHeading).toBeVisible();
  await expect(aboutHeading).toContainText(/about/i);

  const usageLines = page.getByTestId("about-usage");
  await expect(usageLines).toHaveCount(2);

  const contactEmail = page.getByTestId("about-contact");
  await expect(contactEmail).toHaveCount(2);
  await expect(contactEmail.first()).toBeVisible();
  await expect(contactEmail.first()).toContainText("info@nobuddy.org");

  const purposeText = page.getByTestId("about-purpose").first();
  await expect(purposeText).toContainText("purely private");
});

test("German Impressum section is marked lang=\"de\"", async ({ page }) => {
  await page.goto("/about");

  const germanSection = page.locator('[lang="de"]');
  await expect(germanSection).toHaveCount(1);
  await expect(
    germanSection.getByTestId("about-disclaimer")
  ).toBeVisible();
});
