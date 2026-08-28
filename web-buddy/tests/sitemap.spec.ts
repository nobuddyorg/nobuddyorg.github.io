import { test, expect } from "@playwright/test";
import { tools, hasOwnPage } from "../src/app/tools/tools";
import { SITE_URL } from "../src/app/constants";

test.describe("sitemap.xml", () => {
  test("lists every real route: home, /tools hub, /about, and ready tool pages", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    const expectedRoutes = [
      SITE_URL,
      `${SITE_URL}/tools`,
      `${SITE_URL}/about`,
      ...tools
        .filter(hasOwnPage)
        .map((tool) => `${SITE_URL}/tools/${tool.slug}`),
    ];

    for (const route of expectedRoutes) {
      expect(body).toContain(`<loc>${route}</loc>`);
    }
  });
});
