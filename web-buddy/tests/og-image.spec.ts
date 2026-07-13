import { test, expect } from "@playwright/test";

test("collectionbuddy og:image falls back to the default logo, not the homepage", async ({
  request,
  baseURL,
}) => {
  const response = await request.get(`${baseURL}/tools/collectionbuddy`);
  const html = await response.text();

  const match = html.match(/<meta property="og:image" content="([^"]+)"/);
  expect(match).not.toBeNull();

  const ogImage = match![1];
  expect(ogImage).not.toBe("https://nobuddy.org/");
  expect(ogImage).toBe("https://nobuddy.org/nobuddy_logo_preview.webp");
});
