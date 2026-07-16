import { test, expect } from "@playwright/test";

test.describe("tools pagination accessibility", () => {
  test("exposes a pagination landmark with accessible controls", async ({
    page,
  }) => {
    await page.goto("/tools");

    const nav = page.getByRole("navigation", { name: "Tools pagination" });
    await expect(nav).toBeVisible();

    await expect(nav.getByRole("button", { name: "Previous page" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Next page" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Page 1" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Page 2" })).toBeVisible();
  });

  test("marks the active page with aria-current", async ({ page }) => {
    await page.goto("/tools");

    const nav = page.getByRole("navigation", { name: "Tools pagination" });
    const pageOne = nav.getByRole("button", { name: "Page 1" });
    const pageTwo = nav.getByRole("button", { name: "Page 2" });

    await expect(pageOne).toHaveAttribute("aria-current", "page");
    await expect(pageTwo).not.toHaveAttribute("aria-current", "page");

    await pageTwo.click();

    await expect(pageTwo).toHaveAttribute("aria-current", "page");
    await expect(pageOne).not.toHaveAttribute("aria-current", "page");
  });
});
