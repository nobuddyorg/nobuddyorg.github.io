import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";
import { ITEMS_PER_PAGE } from "../src/app/components/ToolGrid";

const pageOne = tools.slice(0, ITEMS_PER_PAGE);
const pageTwo = tools.slice(ITEMS_PER_PAGE);
const pageOneReady = pageOne.filter((t) => t.status === "ready");
const pageOneComingSoon = pageOne.filter((t) => t.status === "coming_soon");
const pageOneDiscontinued = pageOne.filter((t) => t.status === "discontinued");
const pageTwoReady = pageTwo.filter((t) => t.status === "ready");
const pageTwoComingSoon = pageTwo.filter((t) => t.status === "coming_soon");
const firstReadyTool = pageOneReady[0];

test.describe("NoBuddy main page - cards section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tools");
    await expect(
      page.getByTestId("tools-heading")
    ).toBeVisible();
    await expect(page.locator("#tools a")).toHaveCount(pageOne.length);
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

  test("coming-soon cards link out to their GitHub repo, not an internal route", async ({
    page,
  }) => {
    const disabledCards = page.getByTestId("coming_soon");
    await expect(disabledCards).toHaveCount(pageOneComingSoon.length);

    test.skip(
      pageOneComingSoon.length === 0,
      "no coming-soon cards on page one"
    );

    const firstComingSoon = pageOneComingSoon[0];
    const cardLink = disabledCards.first().locator("xpath=ancestor::a");
    await expect(cardLink).toHaveCount(1);
    await expect(cardLink).toHaveAttribute("href", firstComingSoon.github);
    await expect(cardLink).toHaveAttribute("target", "_blank");
  });

  test("discontinued cards link to their own tool page, not GitHub", async ({
    page,
  }) => {
    const discontinuedCards = page.getByTestId("discontinued");
    await expect(discontinuedCards).toHaveCount(pageOneDiscontinued.length);

    test.skip(
      pageOneDiscontinued.length === 0,
      "no discontinued cards on page one"
    );

    const firstDiscontinued = pageOneDiscontinued[0];
    const cardLink = discontinuedCards.first().locator("xpath=ancestor::a");
    await expect(cardLink).toHaveAttribute(
      "href",
      `/tools/${firstDiscontinued.slug}`
    );
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
    await expect(page.getByTestId("tool-heading")).toContainText(
      firstReadyTool.name
    );
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
