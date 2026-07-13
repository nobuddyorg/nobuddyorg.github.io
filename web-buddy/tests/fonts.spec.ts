import { test, expect } from "@playwright/test";

test.describe("font wiring", () => {
  test("body uses the loaded Inter font, not the Arial fallback", async ({
    page,
  }) => {
    await page.goto("/");

    const bodyFont = await page.evaluate(
      () => getComputedStyle(document.body).fontFamily
    );

    expect(bodyFont.toLowerCase()).toContain("inter");
  });

  test("terminal intro renders in a real monospace stack", async ({
    page,
  }) => {
    await page.goto("/");

    const terminalFont = await page.evaluate(() => {
      const el = document.querySelector(".font-mono");
      return el ? getComputedStyle(el).fontFamily : null;
    });

    expect(terminalFont).not.toBeNull();
    expect(terminalFont).not.toContain("--font-geist-mono");
    expect(terminalFont!.toLowerCase()).toMatch(/mono|consolas/);
  });
});
