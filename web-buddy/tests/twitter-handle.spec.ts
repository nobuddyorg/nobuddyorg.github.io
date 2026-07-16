import { test, expect } from "@playwright/test";

test.describe("no fabricated X/Twitter handle is attributed to pages", () => {
  for (const path of ["/", "/about", "/tools"]) {
    test(`${path} emits no twitter:site or twitter:creator meta`, async ({
      request,
      baseURL,
    }) => {
      const response = await request.get(`${baseURL}${path}`);
      const html = await response.text();

      expect(html).not.toContain('name="twitter:site"');
      expect(html).not.toContain('name="twitter:creator"');
    });
  }
});
