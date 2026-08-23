import { test, expect } from "@playwright/test";

test.describe("no redundant accessible-name announcements", () => {
  test("header logo link's accessible name is just the author name", async ({
    page,
  }) => {
    await page.goto("/");

    const homeLink = page.getByRole("banner").getByRole("link").first();
    await expect(homeLink).toHaveAccessibleName("nobuddy");

    const logoImages = await homeLink.locator("img").all();
    expect(logoImages.length).toBeGreaterThan(0);
    for (const logoImg of logoImages) {
      await expect(logoImg).toHaveAttribute("alt", "");
    }
  });

  test("procrastinationbuddy screenshot images are marked decorative", async ({
    page,
  }) => {
    await page.goto("/tools/procrastinationbuddy");

    const screenshotHeading = page.getByRole("heading", {
      name: "Frontend Light",
    });
    await expect(screenshotHeading).toBeVisible();

    const screenshotImages = page.locator("section img[alt='']");
    await expect(screenshotImages.first()).toBeVisible();
  });

  test("collectionbuddy screenshot images are marked decorative", async ({
    page,
  }) => {
    await page.goto("/tools/collectionbuddy");

    const screenshotHeading = page.getByRole("heading", {
      name: "Secure Authentication",
    });
    await expect(screenshotHeading).toBeVisible();

    const screenshotImages = page.locator("section img[alt='']");
    await expect(screenshotImages.first()).toBeVisible();
  });
});
