import { test, expect, type Page } from "@playwright/test";
import { contrastRatio } from "./utils/contrast";

// These elements use the `transition` utility, so getComputedStyle
// immediately after hover() can catch an interpolated mid-transition color
// rather than the final hover value.
const TRANSITION_SETTLE_MS = 300;

async function hoverColors(page: Page, locator: string) {
  const el = page.locator(locator).first();
  await el.hover();
  await page.waitForTimeout(TRANSITION_SETTLE_MS);
  return el.evaluate((node) => {
    const style = getComputedStyle(node);
    return { bg: style.backgroundColor, color: style.color };
  });
}

test.describe("dark mode hover contrast", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
  });

  test("hero CTA stays readable on hover in dark mode", async ({ page }) => {
    await page.goto("/");
    await page.mouse.click(10, 10); // skip terminal animation

    const { bg, color } = await hoverColors(
      page,
      'a[aria-label="Follow Nobuddyorg on GitHub"]'
    );
    expect(await contrastRatio(page, bg, color)).toBeGreaterThanOrEqual(4.5);
  });

  test("footer link stays readable on hover in dark mode", async ({
    page,
  }) => {
    await page.goto("/");

    const link = page.locator("footer a", { hasText: "nobuddy" }).first();
    await link.hover();
    await page.waitForTimeout(TRANSITION_SETTLE_MS);
    const color = await link.evaluate((node) => getComputedStyle(node).color);
    const footerBg = await page
      .locator("footer")
      .evaluate((node) => getComputedStyle(node).backgroundColor);

    expect(await contrastRatio(page, footerBg, color)).toBeGreaterThanOrEqual(
      4.5
    );
  });
});
