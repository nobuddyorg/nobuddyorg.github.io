import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";

const readyTools = tools.filter((tool) => tool.status === "ready");

for (const tool of readyTools) {
  test(`/tools/${tool.slug} emits consistent metadata and JSON-LD shape`, async ({
    page,
  }) => {
    await page.goto(`/tools/${tool.slug}`);

    await expect(page).toHaveTitle(
      new RegExp(
        `^${tool.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}( - .+)? \\| nobuddy\\.org$`
      )
    );

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    const parsed = JSON.parse(jsonLd ?? "{}");

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("SoftwareApplication");
    expect(parsed.name).toBe(tool.name);
    expect(parsed.description).toBe(tool.description);
    expect(parsed.author).toEqual({ "@type": "Person", name: "nobuddy" });
  });
}
