import { test, expect } from "@playwright/test";

test.describe("terminal intro skip and session persistence", () => {
  test("a click fast-forwards the terminal instead of forcing the full ~5s animation", async ({
    page,
  }) => {
    await page.goto("/");

    // Click almost immediately, well before the animation would naturally
    // finish (measured at ~5s in the issue).
    await page.waitForTimeout(200);
    await page.mouse.click(10, 10);

    await expect(
      page.getByText("Scroll down to continue...")
    ).toBeVisible({ timeout: 1000 });
  });

  test("a keypress fast-forwards the terminal", async ({ page }) => {
    await page.goto("/");

    await page.waitForTimeout(200);
    await page.keyboard.press("Space");

    await expect(
      page.getByText("Scroll down to continue...")
    ).toBeVisible({ timeout: 1000 });
  });

  test("the terminal does not replay within the same session", async ({
    page,
  }) => {
    await page.goto("/");
    await page.mouse.click(10, 10);
    await expect(
      page.getByText("Scroll down to continue...")
    ).toBeVisible({ timeout: 1000 });

    await page.goto("/tools");
    await page.goto("/");

    // On the repeat visit the completed terminal renders immediately,
    // without waiting for the typing animation to play out again.
    await expect(
      page.getByText("Scroll down to continue...")
    ).toBeVisible({ timeout: 500 });
  });

  test("terminal box height is stable once all lines are showing (#546)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");

    await page.getByText("You’ve reached").waitFor({ timeout: 10000 });
    const box = page.locator(".font-mono").locator("..");
    const midHeight = (await box.boundingBox())!.height;

    await expect(page.getByText("Scroll down to continue...")).toBeVisible({
      timeout: 5000,
    });
    const finalHeight = (await box.boundingBox())!.height;

    expect(finalHeight).toBe(midHeight);
  });

  test("terminal lines don't overflow their box on narrow viewports (#546)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");
    await page.mouse.click(10, 10);
    await expect(
      page.getByText("Scroll down to continue...")
    ).toBeVisible({ timeout: 1000 });

    const overflow = await page
      .locator(".font-mono")
      .evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBe(0);
  });
});
