import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";

const readyTools = tools.filter((tool) => tool.status === "ready");

for (const tool of readyTools) {
  test(`/tools/${tool.slug} repo link matches tools.ts github value`, async ({
    page,
  }) => {
    await page.goto(`/tools/${tool.slug}`);

    const repoLink = page.locator(`a[href="${tool.github}"]`).first();
    await expect(repoLink).toBeVisible();
  });
}
