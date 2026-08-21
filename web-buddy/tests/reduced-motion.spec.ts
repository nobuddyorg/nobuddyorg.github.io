import { test, expect } from "@playwright/test";
import { terminalOutputText } from "./utils/terminal";

test.describe("prefers-reduced-motion", () => {
  test("emoji background canvas is static", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __rafCalls: number }).__rafCalls = 0;
      const original = window.requestAnimationFrame.bind(window);
      window.requestAnimationFrame = (cb) => {
        (window as unknown as { __rafCalls: number }).__rafCalls++;
        return original(cb);
      };
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const canvas = page.locator("canvas");
    await expect(canvas).toBeAttached();

    await page.waitForTimeout(500);

    const rafCalls = await page.evaluate(
      () => (window as unknown as { __rafCalls: number }).__rafCalls
    );
    expect(rafCalls).toBe(0);
  });

  test("terminal intro pulse animation is disabled", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const pulse = terminalOutputText(page, "Scroll down to continue...");
    await expect(pulse).toBeVisible({ timeout: 15000 });
    await expect(pulse).toHaveCSS("animation-name", "none");
  });

  test("homepage scroll container uses auto scroll behavior", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const scrollBehavior = await page.evaluate(() => {
      const main = document.querySelector("main");
      return main ? getComputedStyle(main).scrollBehavior : null;
    });

    expect(scrollBehavior).toBe("auto");
  });
});
