import { test, expect } from "@playwright/test";

// Real wheel/trackpad input isn't reliable in headless Chromium, so this
// asserts the CSS is correctly declared plus the keyboard-driven settle.
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
    await expect(slider.getByTestId("hero-heading")).toBeAttached();

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

  // Checks actual content (h1, .scroll-hint), not the section's own box —
  // that always spans the full viewport regardless of content fit.
  for (const viewport of [
    { width: 360, height: 740, label: "small mobile" },
    { width: 375, height: 812, label: "mobile" },
    { width: 1280, height: 720, label: "desktop (Playwright default)" },
    { width: 1280, height: 800, label: "desktop" },
  ]) {
    test(`intro content clears both the header and footer (${viewport.label})`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const headerBottom = await page
        .locator("header")
        .evaluate((el) => el.getBoundingClientRect().bottom);
      const h1Top = await page
        .getByTestId("hero-heading")
        .evaluate((el) => el.getBoundingClientRect().top);
      expect(h1Top - headerBottom).toBeGreaterThanOrEqual(0);

      const footerTop = await page
        .locator("footer")
        .evaluate((el) => el.getBoundingClientRect().top);
      const hintBottom = await page
        .locator(".scroll-hint")
        .first()
        .evaluate((el) => el.getBoundingClientRect().bottom);
      expect(footerTop - hintBottom).toBeGreaterThanOrEqual(0);
    });
  }

  test("the slider can't be scrolled horizontally", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await expect(page.locator(".manifesto-slider")).toHaveCSS(
      "overflow-x",
      "hidden"
    );
  });
});
