import { test, expect } from "@playwright/test";

test.describe("homepage manifesto scroll effects", () => {
  test("manifesto sections sit on one continuous gradient, not hard-cut colors", async ({
    page,
  }) => {
    await page.goto("/");

    const gradientWrap = page.locator(".manifesto-gradient");
    await expect(gradientWrap).toBeAttached();
    // The gradient lives on ::before (so it can be masked to fade in over
    // the intro without masking the section content).
    const backgroundImage = await gradientWrap.evaluate(
      (el) => getComputedStyle(el, "::before").backgroundImage
    );
    expect(backgroundImage).toContain("gradient");
  });

  test("a manifesto section reveals its heading as it scrolls into view", async ({
    page,
  }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", {
      name: "This is a hobby project",
    });
    await heading.scrollIntoViewIfNeeded();
    // Allow the CSS transition to complete.
    await expect(heading).toHaveCSS("opacity", "1", { timeout: 2000 });
  });

  test("reveal is disabled (always visible, no transition) under prefers-reduced-motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const heading = page.getByRole("heading", {
      name: "Software can be useful and weird",
    });
    await expect(heading).toHaveCSS("opacity", "1");
  });

  test("a revealed section stays revealed after it scrolls back out of view", async ({
    page,
  }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", {
      name: "Software can be useful and weird",
    });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toHaveCSS("opacity", "1", { timeout: 2000 });

    // Scroll far past it; its reveal must latch, so it stays opaque even
    // while off-screen (opacity is still computable when scrolled away).
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    await expect(heading).toHaveCSS("opacity", "1");
  });

  test("shows one dot per page (intro + manifesto sections), highlighting the active one as it scrolls", async ({
    page,
  }) => {
    await page.goto("/");

    // The intro is a page in the slider too now (#544's own dot, so it
    // doesn't look like "that page doesn't exist") — its dot is active
    // immediately on load, not "nothing active until you scroll."
    const dots = page.locator(".manifesto-dot");
    await expect(dots).toHaveCount(6);
    await expect(dots.first()).toHaveClass(/active/, { timeout: 2000 });
    await expect(page.locator(".manifesto-dot.active")).toHaveCount(1);

    const heading = page.getByRole("heading", {
      name: "Fork it, run it, improve it",
    });
    await heading.scrollIntoViewIfNeeded();

    await expect(dots.nth(3)).toHaveClass(/active/, { timeout: 2000 });
    await expect(page.locator(".manifesto-dot.active")).toHaveCount(1);
  });

  test("scroll-hint arrow is intro-only, fixed to the viewport, and advances one page on click (#544, #556)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(300);
    await page.mouse.click(200, 700);

    // Exactly one, ever — tried one per page in #554, but once it's been
    // used it's implicitly clear scrolling keeps working the same way
    // elsewhere, so persistent everywhere wasn't wanted after all.
    const hint = page.getByRole("button", { name: "Scroll to the next page" });
    await expect(hint).toHaveCount(1);
    await expect(hint).toBeVisible();
    await expect(hint).toHaveCSS("position", "fixed");

    const dots = page.locator(".manifesto-dot");
    await expect(dots.first()).toHaveClass(/active/);

    await hint.click();
    await expect(dots.nth(1)).toHaveClass(/active/, { timeout: 3000 });

    // No longer the active page, so the (still fixed, still the only
    // instance) button is hidden rather than persisting into view.
    await expect(hint).not.toBeVisible();
  });
});
