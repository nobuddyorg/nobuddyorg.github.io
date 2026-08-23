import { test, expect } from "@playwright/test";
import { SITE_DESCRIPTION, TOOLS_DESCRIPTION } from "../src/app/constants";

test.describe("marketing copy stays in sync across surfaces", () => {
  test("homepage meta description is set correctly", async ({ page }) => {
    await page.goto("/");

    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(metaDescription).toBe(SITE_DESCRIPTION);
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
