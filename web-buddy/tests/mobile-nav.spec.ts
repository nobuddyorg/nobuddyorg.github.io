import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";

const firstPageOneTool = tools[0];

test.describe("mobile viewport: nav and pagination stay usable", () => {
  test("header nav links are visible", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation").first();
    await expect(nav.getByRole("link", { name: "Tools" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "GitHub" })).toBeVisible();
  });

  test("tools pagination is visible and usable", async ({ page }) => {
    await page.goto("/tools");

    const firstPageLink = page.getByRole("link", {
      name: new RegExp(firstPageOneTool.name),
    });
    await expect(firstPageLink).toBeVisible();

    const pageTwo = page.getByRole("button", { name: "2" });
    await expect(pageTwo).toBeVisible();
    await pageTwo.click();

    await expect(firstPageLink).toHaveCount(0);
  });
});
