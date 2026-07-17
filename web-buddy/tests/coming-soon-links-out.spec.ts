import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";
import { ITEMS_PER_PAGE } from "../src/app/components/ToolGrid";

const pageTwo = tools.slice(ITEMS_PER_PAGE);

test("no pagination page consists solely of dead (unlinked) cards", async ({
  page,
}) => {
  test.skip(pageTwo.length === 0, "no second page to check");

  await page.goto("/tools");
  await page.getByRole("button", { name: "Page 2" }).click();

  const comingSoonCards = page.getByTestId("coming_soon");
  const comingSoonCount = pageTwo.filter(
    (t) => t.status === "coming_soon"
  ).length;
  await expect(comingSoonCards).toHaveCount(comingSoonCount);

  for (let i = 0; i < comingSoonCount; i++) {
    const link = comingSoonCards.nth(i).locator("xpath=ancestor::a");
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute("href", /.+/);
  }
});
