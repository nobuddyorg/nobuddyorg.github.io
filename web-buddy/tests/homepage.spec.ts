import { test, expect } from "@playwright/test";

test.describe("homepage hero and manifesto content", () => {
  test("renders the terminal intro hero", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toHaveText("Creative Tools for Nerds");
    await expect(
      page.getByRole("link", { name: "Follow Nobuddyorg on GitHub" })
    ).toBeVisible();
  });

  test("terminal intro plays the script lines", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText("You’ve reached The Buddy Compendium.")
    ).toBeVisible({ timeout: 15000 });
  });

  test("shows the value proposition and primary CTA on a mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(
      page.getByText(
        "Explore nobuddy.org – a playground of creative tools, weird ideas & useful mini-apps."
      )
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Follow Nobuddyorg on GitHub" })
    ).toBeVisible();
  });

  test("renders the manifesto sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Software can be useful and weird" })
    ).toBeAttached();
    await expect(
      page.getByRole("heading", { name: "This is a hobby project" })
    ).toBeAttached();
    await expect(
      page.getByRole("link", { name: "Launch /tools →" })
    ).toBeAttached();
  });
});
