import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";
import path from "path";
import { imageSize } from "image-size";
import { tools } from "../src/app/tools/tools";

const publicDir = path.join(__dirname, "..", "public");
const readyTools = tools.filter((tool) => tool.status === "ready");
const paths = ["/", "/tools", ...readyTools.map((t) => `/tools/${t.slug}`)];

for (const urlPath of paths) {
  test(`${urlPath} declares og:image width/height matching the real file`, async ({
    request,
    baseURL,
  }) => {
    const response = await request.get(`${baseURL}${urlPath}`);
    const html = await response.text();

    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    const widthMatch = html.match(
      /<meta property="og:image:width" content="([^"]+)"/
    );
    const heightMatch = html.match(
      /<meta property="og:image:height" content="([^"]+)"/
    );
    expect(imageMatch).not.toBeNull();
    expect(widthMatch).not.toBeNull();
    expect(heightMatch).not.toBeNull();

    const imageUrl = new URL(imageMatch![1]);
    const filePath = path.join(publicDir, imageUrl.pathname);
    const { width, height } = imageSize(readFileSync(filePath));

    expect(Number(widthMatch![1])).toBe(width);
    expect(Number(heightMatch![1])).toBe(height);
  });
}
