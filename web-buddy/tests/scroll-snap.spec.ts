import { test, expect } from "@playwright/test";

// The manifesto sections live in their own overflow-y:auto scroll
// container (.manifesto-slider) with native CSS scroll-snap — see
// globals.css for why this (not a document-level snap, not a JS-driven
// ease) is the version that's actually reliable. Real wheel/trackpad
// input isn't something Playwright's synthetic events can reliably
// exercise in headless Chromium (a known CDP limitation, not a sign the
// CSS is wrong — see the PR description), so this asserts the CSS is
// correctly declared plus the keyboard-driven settle, which *is*
// deterministic and directly observable.
test.describe("homepage manifesto scroll snap", () => {
  test("the intro is the snap container's first page, ideas/CTA follow", async ({
    page,
  }) => {
    await page.goto("/");

    const slider = page.locator(".manifesto-slider");
    await expect(slider).toHaveCSS("overflow-y", "auto");
    await expect(slider).toHaveCSS("scroll-snap-type", "y mandatory");

    // Paging starts from the very first scroll: the intro is a snap page
    // in the same container, not separate document-flow content the user
    // has to scroll past on their own before paging kicks in.
    await expect(
      slider.getByRole("heading", { name: "Creative Tools for Nerds" })
    ).toBeAttached();

    const sections = page.locator(".manifesto-slider .manifesto-section");
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(5);
    for (let i = 0; i < count; i++) {
      await expect(sections.nth(i)).toHaveCSS(
        "scroll-snap-align",
        "center"
      );
    }
  });

  test("is keyboard-reachable and keyboard-scrollable (#413)", async ({
    page,
  }) => {
    await page.goto("/");

    const slider = page.locator(".manifesto-slider");
    await expect(slider).toHaveAttribute("tabindex", "0");
    await expect(slider).toHaveAccessibleName(/manifesto/i);

    const cta = page.getByRole("link", { name: "Launch /tools →" });
    await expect(cta).not.toBeInViewport();

    await slider.focus();
    await page.keyboard.press("End");
    await expect(cta).toBeInViewport({ timeout: 3000 });
  });

  test("snap is disabled under prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator(".manifesto-slider")).toHaveCSS(
      "scroll-snap-type",
      "none"
    );
  });

  // Footer is fixed site-wide, and unlike every other page here the slider
  // fills the viewport edge to edge with no bottom padding of its own — a
  // plain 100dvh page would render its last ~40px under the fixed footer
  // (#541). Each page sizes off --page-h (globals.css), which reserves
  // that space; this locks in a real clearance instead of just trusting
  // the reserved amount matches the footer's actual rendered height.
  for (const viewport of [
    { width: 320, height: 568, label: "small mobile" },
    { width: 375, height: 812, label: "mobile" },
    { width: 1280, height: 800, label: "desktop" },
  ]) {
    test(`the intro page doesn't render under the fixed footer (${viewport.label})`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const footerTop = await page
        .locator("footer")
        .evaluate((el) => el.getBoundingClientRect().top);
      const introBottom = await page
        .locator(".manifesto-slider section")
        .first()
        .evaluate((el) => el.getBoundingClientRect().bottom);

      expect(footerTop - introBottom).toBeGreaterThanOrEqual(0);
    });
  }

  // Only overflow-y was set, and per spec that silently promotes
  // overflow-x from visible to auto too — turning any oversized
  // descendant (CirclesBackground's deliberately 100rem-wide decorative
  // SVG, previously safely clipped by body's own overflow-x: hidden) into
  // real horizontally-scrollable dead space (#546).
  test("the slider can't be scrolled horizontally", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await expect(page.locator(".manifesto-slider")).toHaveCSS(
      "overflow-x",
      "hidden"
    );
  });
});
