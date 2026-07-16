import { test, expect } from "@playwright/test";

test.describe("footer home link", () => {
  test("navigates in the same tab, not target=_blank", async ({ page }) => {
    await page.goto("/about");

    const homeLink = page.getByRole("contentinfo").getByRole("link", {
      name: "nobuddy",
    });
    await expect(homeLink).toHaveAttribute("href", "/");
    await expect(homeLink).not.toHaveAttribute("target", "_blank");

    await homeLink.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("GitHub link still opens in a new tab", async ({ page }) => {
    await page.goto("/");

    const githubLink = page.getByRole("contentinfo").getByRole("link", {
      name: "GitHub",
    });
    await expect(githubLink).toHaveAttribute("target", "_blank");
  });
});
