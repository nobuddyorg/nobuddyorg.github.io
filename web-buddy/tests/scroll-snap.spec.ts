import { test, expect } from "@playwright/test";

// scroll-snap-type only affects the element that actually scrolls. <main>
// has no overflow/height of its own (the document scrolls, per #413's
// fix), so it must live on <html> instead — asserting it on <main> would
// pass without the snap ever functioning, which is exactly how this
// regressed silently before. See globals.css for the full mandatory vs.
// proximity rationale, and homepage.spec.ts's "reachable via keyboard
// scrolling" test for the #413 keyboard coverage this must not break.
test.describe("homepage scroll snap", () => {
  test("the real scrolling element (html) has mandatory snap, with matching snap-center targets", async ({
    page,
  }) => {
    await page.goto("/");

    const scrollingElement = await page.evaluate(
      () => document.scrollingElement === document.documentElement
    );
    expect(scrollingElement).toBe(true);

    const html = page.locator("html");
    await expect(html).toHaveCSS("scroll-snap-type", "y mandatory");

    // <main> itself must NOT carry a (dead) scroll-snap-type of its own —
    // that's the exact bug this fixes.
    const main = page.locator("main");
    await expect(main).toHaveCSS("scroll-snap-type", "none");

    const snapTargets = page.locator(
      "main > section, main > div > section"
    );
    const count = await snapTargets.count();
    expect(count).toBeGreaterThanOrEqual(5);

    for (let i = 0; i < count; i++) {
      await expect(snapTargets.nth(i)).toHaveCSS(
        "scroll-snap-align",
        "center"
      );
    }
  });

  test("snap is disabled under prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveCSS("scroll-snap-type", "none");
  });

  test("snap is scoped to the homepage, not applied site-wide", async ({
    page,
  }) => {
    await page.goto("/about");

    const html = page.locator("html");
    await expect(html).toHaveCSS("scroll-snap-type", "none");
  });
});
