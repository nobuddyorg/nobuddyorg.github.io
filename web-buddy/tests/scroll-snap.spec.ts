import { test, expect } from "@playwright/test";

// Restores gentle scroll-snap on the homepage manifesto (a small scroll
// nudge completes to reveal the full next section) without reintroducing
// the scroll-jacking/keyboard-trap problem a prior fix removed: this uses
// scroll-snap-type on the normal document flow (no nested overflow
// container) with "proximity", not "mandatory", so free scrolling and
// keyboard navigation are unaffected — see homepage.spec.ts's existing
// "reachable via keyboard scrolling" coverage for that.
test.describe("homepage scroll snap", () => {
  test("main uses proximity (not mandatory) snap, with matching snap-start targets", async ({
    page,
  }) => {
    await page.goto("/");

    // "proximity" is the spec-default strictness when omitted from the
    // axis-only value, so Chromium's computed style canonicalizes
    // "y proximity" down to just "y" — this asserts the y-axis is set and,
    // crucially, that it's NOT "y mandatory" (which would reintroduce the
    // scroll-jacking #413 removed).
    const main = page.locator("main");
    await expect(main).toHaveCSS("scroll-snap-type", "y");

    const snapTargets = page.locator(
      "main > section, main > div > section"
    );
    const count = await snapTargets.count();
    expect(count).toBeGreaterThanOrEqual(5);

    for (let i = 0; i < count; i++) {
      await expect(snapTargets.nth(i)).toHaveCSS(
        "scroll-snap-align",
        "start"
      );
    }
  });

  test("snap is disabled under prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const main = page.locator("main");
    await expect(main).toHaveCSS("scroll-snap-type", "none");
  });
});
