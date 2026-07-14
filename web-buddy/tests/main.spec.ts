import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";
import { ITEMS_PER_PAGE } from "../src/app/components/ToolGrid";

const pageOne = tools.slice(0, ITEMS_PER_PAGE);
const pageTwo = tools.slice(ITEMS_PER_PAGE);
const pageOneReady = pageOne.filter((t) => t.status === "ready");
const pageOneComingSoon = pageOne.filter((t) => t.status !== "ready");
const pageTwoReady = pageTwo.filter((t) => t.status === "ready");
const pageTwoComingSoon = pageTwo.filter((t) => t.status !== "ready");
const firstReadyTool = pageOneReady[0];

test.describe("NoBuddy main page - cards section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tools");
    await expect(
      page.getByRole("heading", { name: "The Buddy Compendium" })
    ).toBeVisible();
    await expect(page.locator("#tools a")).toHaveCount(pageOneReady.length);
  });

  test(`has exactly ${pageOneReady.length} enabled card(s) in #tools`, async ({
    page,
  }) => {
    const enabledCards = page.getByTestId("ready");
    await expect(enabledCards).toHaveCount(pageOneReady.length);
    await expect(enabledCards.first()).toBeVisible();
  });

  test("first enabled card has correct href", async ({ page }) => {
    const firstEnabledCardLink = page.getByRole("link", {
      name: new RegExp(firstReadyTool.name),
    });
    await expect(firstEnabledCardLink).toBeVisible();
    await expect(firstEnabledCardLink).toHaveAttribute(
      "href",
      `/tools/${firstReadyTool.slug}`
    );
  });

  test("disabled cards exist and are not clickable", async ({ page }) => {
    const disabledCards = page.getByTestId("coming_soon");
    await expect(disabledCards).toHaveCount(pageOneComingSoon.length);

    // Structural invariant: a coming-soon card must not be wrapped in an
    // <a>, so it cannot navigate no matter how it's interacted with.
    await expect(
      disabledCards.first().locator("xpath=ancestor::a")
    ).toHaveCount(0);
  });

  test("clicking the first enabled card navigates and shows content", async ({
    page,
  }) => {
    const firstEnabledCardLink = page.getByRole("link", {
      name: new RegExp(firstReadyTool.name),
    });
    await expect(firstEnabledCardLink).toBeVisible();

    await firstEnabledCardLink.click();
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(new RegExp(`/tools/${firstReadyTool.slug}`));
    await expect(page.locator("h1")).toContainText(firstReadyTool.name);
  });

  test("click on pagination 2 navigates to the second page", async ({
    page,
  }) => {
    const paginationLink = page.getByRole("button", { name: "2" });
    await expect(paginationLink).toBeVisible();

    await paginationLink.click();

    const disabledCards = page.getByTestId("coming_soon");
    await expect(disabledCards).toHaveCount(pageTwoComingSoon.length);

    const enabledCards = page.getByTestId("ready");
    await expect(enabledCards).toHaveCount(pageTwoReady.length);
  });
});
