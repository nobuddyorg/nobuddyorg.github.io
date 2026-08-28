import { test, expect } from "@playwright/test";
import { tools, hasOwnPage } from "../src/app/tools/tools";

const readyTools = tools.filter(hasOwnPage);
const paths = ["/", "/tools", "/about", ...readyTools.map((t) => `/tools/${t.slug}`)];

test("every page ships a unique <title>", async ({ page }) => {
  const titles = new Set<string>();

  for (const path of paths) {
    await page.goto(path);
    const title = await page.title();
    expect(titles.has(title), `duplicate title "${title}" for ${path}`).toBe(
      false
    );
    titles.add(title);
  }
});

test("only the homepage declares a WebSite JSON-LD entity", async ({
  page,
}) => {
  await page.goto("/tools");
  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();
  const parsed = JSON.parse(jsonLd ?? "{}");

  expect(parsed["@type"]).not.toBe("WebSite");
  expect(parsed["@type"]).toBe("CollectionPage");
});
