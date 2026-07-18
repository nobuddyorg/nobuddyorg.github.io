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
  test("the manifesto has its own snap container, separate from the intro", async ({
    page,
  }) => {
    await page.goto("/");

    const slider = page.locator(".manifesto-slider");
    await expect(slider).toHaveCSS("overflow-y", "auto");
    await expect(slider).toHaveCSS("scroll-snap-type", "y mandatory");

    const sections = page.locator(".manifesto-slider .manifesto-section");
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(5);
    for (let i = 0; i < count; i++) {
      await expect(sections.nth(i)).toHaveCSS(
        "scroll-snap-align",
        "center"
      );
    }

    // The intro/terminal heading must NOT be inside the snap container —
    // reading it must never be interrupted by the manifesto's snap.
    await expect(
      page
        .locator(".manifesto-slider")
        .getByRole("heading", { name: "Creative Tools for Nerds" })
    ).toHaveCount(0);
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
});
