import { test, expect } from "@playwright/test";
import { tools, hasOwnPage } from "../src/app/tools/tools";
import { MAX_TITLE_LENGTH } from "../src/app/metadata";

const readyTools = tools.filter(hasOwnPage);
const paths = [
  "/",
  "/tools",
  "/about",
  ...readyTools.map((t) => `/tools/${t.slug}`),
];

for (const path of paths) {
  test(`${path} <title> stays within the ${MAX_TITLE_LENGTH}-char SERP budget`, async ({
    page,
  }) => {
    await page.goto(path);
    const title = await page.title();
    expect(title.length).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
  });
}
