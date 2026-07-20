import { test, expect } from "@playwright/test";
import { terminalOutput, terminalOutputText } from "./utils/terminal";

test.describe("terminal intro skip and session persistence", () => {
  test("a click fast-forwards the terminal instead of forcing the full ~5s animation", async ({
    page,
  }) => {
    await page.goto("/");

    await page.waitForTimeout(200);
    await page.mouse.click(10, 10);

    await expect(
      terminalOutputText(page, "Scroll down to continue...")
    ).toBeVisible({ timeout: 1000 });
  });

  test("a keypress fast-forwards the terminal", async ({ page }) => {
    await page.goto("/");

    await page.waitForTimeout(200);
    await page.keyboard.press("Space");

    await expect(
      terminalOutputText(page, "Scroll down to continue...")
    ).toBeVisible({ timeout: 1000 });
  });

  test("the terminal does not replay within the same session", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(200);
    await page.mouse.click(10, 10);
    await expect(
      terminalOutputText(page, "Scroll down to continue...")
    ).toBeVisible({ timeout: 1000 });

    await page.goto("/tools");
    await page.goto("/");

    await expect(
      terminalOutputText(page, "Scroll down to continue...")
    ).toBeVisible({ timeout: 500 });
  });

  test("terminal box height is constant throughout the whole animation (#546, #548)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");

    const box = page.locator(".font-mono").locator("..");
    await page.waitForTimeout(100); // first paint, before any line appears
    // boundingBox() returns null for an unrendered element; guard against
    // that instead of risking a raw TypeError on a slow/flaky first paint.
    await expect(box).toBeVisible();
    const initialHeight = (await box.boundingBox())!.height;

    await expect(
      terminalOutputText(page, "Scroll down to continue...")
    ).toBeVisible({ timeout: 10000 });
    const finalHeight = (await box.boundingBox())!.height;

    expect(finalHeight).toBe(initialHeight);
  });

  test("terminal lines don't overflow their box on narrow viewports (#546)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");
    await page.waitForTimeout(200);
    await page.mouse.click(10, 10);
    await expect(
      terminalOutputText(page, "Scroll down to continue...")
    ).toBeVisible({ timeout: 1000 });

    const overflow = await terminalOutput(page).evaluate(
      (el) => el.scrollWidth - el.clientWidth
    );
    expect(overflow).toBe(0);
  });
});
