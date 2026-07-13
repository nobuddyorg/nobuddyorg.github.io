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
});
