import { test, expect } from "@playwright/test";

test.describe("404 page", () => {
  test("renders branded navigation for an unknown URL", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("404");
    await expect(
      page.getByRole("link", { name: "Back to Home" })
    ).toHaveAttribute("href", "/");
    await expect(
      page.getByRole("link", { name: "Browse the Tools" })
    ).toHaveAttribute("href", "/tools");
  });
});
