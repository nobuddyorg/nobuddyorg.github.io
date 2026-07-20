import { test, expect } from "@playwright/test";
import { terminalOutputText } from "./utils/terminal";

test.describe("homepage hero and manifesto content", () => {
  test("renders the terminal intro hero", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toHaveText("Creative Tools for Nerds");
    await expect(
      page.getByRole("link", { name: "Follow Nobuddyorg on GitHub" })
    ).toBeVisible();
  });

  test("terminal intro plays the script lines", async ({ page }) => {
    await page.goto("/");

    await expect(
      terminalOutputText(page, "You’ve reached The Buddy Compendium.")
    ).toBeVisible({ timeout: 15000 });
  });

  test("shows the value proposition and primary CTA on a mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(
      page.getByText(
        "Explore nobuddy.org – genuinely useful tools, each built with a bit of personality."
      )
    ).toBeVisible();
    // Hidden on mobile portrait to keep the intro compact (#541) — still
    // one tap away via the header's own GitHub link.
    await expect(
      page.getByRole("link", { name: "Follow Nobuddyorg on GitHub" })
    ).not.toBeVisible();
  });

  test("manifesto sections are reachable via keyboard scrolling", async ({
    page,
  }) => {
    await page.goto("/");

    const cta = page.getByRole("link", { name: "Launch /tools →" });
    await expect(cta).not.toBeInViewport();

    // The manifesto is its own scroll container (see scroll-snap.spec.ts),
    // so keyboard scrolling reaches it the same way any keyboard user
    // would: Tab until it's focused, then scroll it directly.
    await page.locator(".manifesto-slider").focus();
    await page.keyboard.press("End");
    await expect(cta).toBeInViewport({ timeout: 3000 });
  });

  test("renders the manifesto sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Software can be useful and weird" })
    ).toBeAttached();
    await expect(
      page.getByRole("heading", { name: "This is a hobby project" })
    ).toBeAttached();
    await expect(
      page.getByRole("link", { name: "Launch /tools →" })
    ).toBeAttached();
  });
});
