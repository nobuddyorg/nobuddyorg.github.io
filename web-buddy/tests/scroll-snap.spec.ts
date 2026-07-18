import { test, expect } from "@playwright/test";

// The homepage eases whichever manifesto section you *stopped* in to fill
// the viewport, once scrolling settles (JS, in ManifestoScroll). Unlike CSS
// scroll-snap this is deterministic, so it can be asserted directly. See
// homepage.spec.ts for the keyboard-reachability coverage this must keep.

// scrollY that centers the given manifesto section in the viewport.
async function centerOf(page: import("@playwright/test").Page, index: number) {
  return page.evaluate((i) => {
    const el = document.querySelectorAll(".manifesto-section")[i] as HTMLElement;
    const top = el.getBoundingClientRect().top + window.scrollY;
    return Math.round(top + el.offsetHeight / 2 - window.innerHeight / 2);
  }, index);
}

test.describe("homepage scroll snap (ease-to-section on settle)", () => {
  test("eases a partially-scrolled section to centered once scrolling stops", async ({
    page,
  }) => {
    await page.goto("/");
    const target = await centerOf(page, 1);

    // Land inside section 1 but well off-center, then let it settle.
    await page.evaluate((y) => window.scrollTo(0, y), target - 120);
    await page.waitForTimeout(700);

    const settled = await page.evaluate(() => window.scrollY);
    expect(Math.abs(settled - target)).toBeLessThan(6);
  });

  test("does not yank you out of the intro/terminal section", async ({
    page,
  }) => {
    await page.goto("/");

    await page.evaluate(() => window.scrollTo(0, 90));
    await page.waitForTimeout(700);

    const settled = await page.evaluate(() => window.scrollY);
    expect(settled).toBe(90);
  });

  test("does not snap under prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const target = await centerOf(page, 1);

    await page.evaluate((y) => window.scrollTo(0, y), target - 120);
    await page.waitForTimeout(700);

    const settled = await page.evaluate(() => window.scrollY);
    expect(settled).toBe(target - 120);
  });
});
