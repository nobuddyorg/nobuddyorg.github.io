import { test, expect } from "@playwright/test";

// Regression coverage for a layout shift users saw when navigating between
// pages of different content height: without a reserved scrollbar gutter,
// platforms/browsers with classic (non-overlay) scrollbars change the
// effective viewport width depending on whether the current page needs to
// scroll, nudging the centered fixed header/footer sideways.
test("html reserves a stable scrollbar gutter", async ({ page }) => {
  await page.goto("/");

  const scrollbarGutter = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollbarGutter
  );

  expect(scrollbarGutter).toContain("stable");
});
