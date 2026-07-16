import { test, expect } from "@playwright/test";
import { statSync } from "fs";
import path from "path";
import { tools } from "../src/app/tools/tools";

// Several platforms cap og:image size and silently drop the preview if the
// file is too large (e.g. WhatsApp ~600 KB).
const MAX_BYTES = 600 * 1024;

const publicDir = path.join(__dirname, "..", "public");
const previewImages = tools
  .map((tool) => tool.previewImage)
  .filter((image): image is string => Boolean(image));
const ogImages = [...new Set(["/nobuddy_logo_preview.webp", ...previewImages])];

for (const image of ogImages) {
  test(`${image} stays within the og:image size budget`, () => {
    const { size } = statSync(path.join(publicDir, image));
    expect(size).toBeLessThanOrEqual(MAX_BYTES);
  });
}
