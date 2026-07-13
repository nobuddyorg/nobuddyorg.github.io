import { test, expect, type Page } from "@playwright/test";

// Tailwind v4's computed colors can come back as oklab()/oklch(), not just
// rgb(). Normalize via a canvas, which every browser resolves to rgba()
// reliably regardless of the input color space.
async function contrastRatio(page: Page, colorA: string, colorB: string) {
  return page.evaluate(
    ([a, b]) => {
      const toRgb = (color: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, bch] = ctx.getImageData(0, 0, 1, 1).data;
        return [r, g, bch];
      };

      const relativeLuminance = ([r, g, bch]: number[]) => {
        const [rs, gs, bs] = [r, g, bch].map((c) => {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };

      const la = relativeLuminance(toRgb(a));
      const lb = relativeLuminance(toRgb(b));
      const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
      return (lighter + 0.05) / (darker + 0.05);
    },
    [colorA, colorB]
  );
}

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

  test("footer links stay readable on hover in dark mode", async ({
    page,
  }) => {
    await page.goto("/");

    for (const name of ["nobuddy", "GitHub"]) {
      const link = page.locator("footer a", { hasText: name }).first();
      await link.hover();
      await page.waitForTimeout(TRANSITION_SETTLE_MS);
      const color = await link.evaluate(
        (node) => getComputedStyle(node).color
      );
      const footerBg = await page
        .locator("footer")
        .evaluate((node) => getComputedStyle(node).backgroundColor);

      expect(
        await contrastRatio(page, footerBg, color)
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
