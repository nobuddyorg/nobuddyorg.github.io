import { test, expect } from "@playwright/test";

test.describe("homepage manifesto scroll effects", () => {
  test("manifesto sections sit on one continuous gradient, not hard-cut colors", async ({
    page,
  }) => {
    await page.goto("/");

    const gradientWrap = page.locator(".manifesto-gradient");
    await expect(gradientWrap).toBeAttached();
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

    // Reveal must latch even while scrolled far off-screen.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    await expect(heading).toHaveCSS("opacity", "1");
  });

  test("shows one dot per page (intro + manifesto sections), highlighting the active one as it scrolls", async ({
    page,
  }) => {
    await page.goto("/");

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

  test("scroll-hint arrow is intro-only, fixed to the viewport, and fades (not snaps) out on leaving the intro (#544, #556, #558)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(300);
    await page.mouse.click(200, 700);

    const hint = page.getByRole("button", { name: "Scroll to the next page" });
    await expect(hint).toHaveCount(1);
    await expect(hint).toBeVisible();
    await expect(hint).toHaveCSS("position", "fixed");
    await expect(hint).toHaveCSS("opacity", "1");

    const dots = page.locator(".manifesto-dot");
    await expect(dots.first()).toHaveClass(/active/);

    await hint.click();
    await expect(dots.nth(1)).toHaveClass(/active/, { timeout: 3000 });

    // aria-hidden now, so found by test id rather than role.
    const hiddenHint = page.getByTestId("scroll-hint");
    await expect(hiddenHint).toHaveCSS("opacity", "0", { timeout: 2000 });
    await expect(hiddenHint).toHaveAttribute("aria-hidden", "true");
  });

  test("scroll-hint button doesn't strand keyboard focus once it's used (#572)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(300);
    await page.mouse.click(200, 700);

    const hint = page.getByRole("button", { name: "Scroll to the next page" });
    await hint.focus();
    await expect(hint).toBeFocused();

    await page.keyboard.press("Enter");

    const dots = page.locator(".manifesto-dot");
    await expect(dots.nth(1)).toHaveClass(/active/, { timeout: 3000 });

    const hiddenHint = page.getByTestId("scroll-hint");
    await expect(hiddenHint).toHaveAttribute("aria-hidden", "true");
    await expect(hiddenHint).not.toBeFocused();
  });
});
