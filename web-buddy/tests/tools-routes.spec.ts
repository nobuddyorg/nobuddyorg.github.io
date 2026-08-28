import { test, expect } from "@playwright/test";
import { tools, hasOwnPage } from "../src/app/tools/tools";

const readyTools = tools.filter(hasOwnPage);

// Each ready tool page always renders a "Tech Stack" section; "Screenshots"
// is only present for tools whose client component defines one.
const sectionsWithoutScreenshots = new Set(["gamegallerybuddy"]);

for (const tool of readyTools) {
  test.describe(`/tools/${tool.slug}`, () => {
    test(`renders ${tool.name} heading and key sections`, async ({
      page,
    }) => {
      await page.goto(`/tools/${tool.slug}`);

      await expect(page.getByTestId("tool-heading")).toContainText(
        tool.name
      );
      await expect(
        page.getByRole("heading", { name: "Tech Stack" })
      ).toBeVisible();

      if (!sectionsWithoutScreenshots.has(tool.slug)) {
        await expect(
          page.getByRole("heading", { name: "Screenshots" })
        ).toBeVisible();
      }
    });
  });
}
