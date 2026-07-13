import { test, expect } from "@playwright/test";
import { contrastRatio } from "./utils/contrast";

test.describe("footer text contrast", () => {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`meets WCAG AA (4.5:1) in ${colorScheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");

      const footer = page.locator("footer");
      const { color, bg } = await footer.evaluate((node) => {
        const style = getComputedStyle(node);
        return { color: style.color, bg: style.backgroundColor };
      });

      expect(await contrastRatio(page, bg, color)).toBeGreaterThanOrEqual(
        4.5
      );
    });
  }
});
