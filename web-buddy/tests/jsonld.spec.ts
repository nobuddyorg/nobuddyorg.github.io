import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";

const readyTools = tools.filter((tool) => tool.status === "ready");
const paths = ["/", "/tools", "/about", ...readyTools.map((t) => `/tools/${t.slug}`)];

for (const path of paths) {
  test(`${path} ships JSON-LD in the raw (unhydrated) HTML`, async ({
    request,
    baseURL,
  }) => {
    const response = await request.get(`${baseURL}${path}`);
    const html = await response.text();

    expect(html).toContain('type="application/ld+json"');

    const match = html.match(
      /<script type="application\/ld\+json">(.*?)<\/script>/
    );
    expect(match).not.toBeNull();

    const parsed = JSON.parse(match![1]);
    expect(parsed["@context"]).toBe("https://schema.org");
  });
}
