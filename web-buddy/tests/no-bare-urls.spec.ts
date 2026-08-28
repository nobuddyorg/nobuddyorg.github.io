import { test, expect } from "@playwright/test";
import { tools, hasOwnPage } from "../src/app/tools/tools";

const readyTools = tools.filter(hasOwnPage);

for (const tool of readyTools) {
  test(`/tools/${tool.slug} renders no bare URLs as inert plain text`, async ({
    page,
  }) => {
    await page.goto(`/tools/${tool.slug}`);

    const bareUrlTexts = await page.evaluate(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      const matches: string[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.parentElement?.closest("a, script, style")) continue;
        const text = node.textContent ?? "";
        if (/https?:\/\/\S+/.test(text)) {
          matches.push(text.trim());
        }
      }
      return matches;
    });

    expect(bareUrlTexts).toEqual([]);
  });
}
