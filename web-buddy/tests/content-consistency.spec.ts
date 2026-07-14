import { test, expect } from "@playwright/test";
import { SITE_DESCRIPTION, TOOLS_DESCRIPTION } from "../src/app/globals";

test.describe("marketing copy stays in sync across surfaces", () => {
  test("homepage meta description matches the hero subtitle", async ({
    page,
  }) => {
    await page.goto("/");

    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(metaDescription).toBe(SITE_DESCRIPTION);

    await expect(page.locator("h2").first()).toHaveText(SITE_DESCRIPTION);
  });

  test("tools meta description matches the manifest description", async ({
    page,
    request,
  }) => {
    await page.goto("/tools");

    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(metaDescription).toBe(TOOLS_DESCRIPTION);

    const manifestResponse = await request.get("/manifest.webmanifest");
    const manifestJson = await manifestResponse.json();
    expect(manifestJson.description).toBe(TOOLS_DESCRIPTION);
  });
});
