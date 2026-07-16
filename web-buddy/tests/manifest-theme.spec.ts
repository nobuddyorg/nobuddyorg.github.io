import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";

test.describe("manifest.webmanifest", () => {
  test("background_color and theme_color match the dark-first UI, not white", async ({
    request,
  }) => {
    const response = await request.get("/manifest.webmanifest");
    const manifest = await response.json();

    expect(manifest.background_color).not.toBe("#ffffff");
    expect(manifest.theme_color).not.toBe("#ffffff");
    expect(manifest.background_color).toBe(manifest.theme_color);
  });

  test("description names only shipped (status: ready) tools", async ({
    request,
  }) => {
    const response = await request.get("/manifest.webmanifest");
    const manifest = await response.json();

    const comingSoonTools = tools.filter((tool) => tool.status !== "ready");
    for (const tool of comingSoonTools) {
      expect(manifest.description).not.toContain(tool.name);
    }
  });
});
