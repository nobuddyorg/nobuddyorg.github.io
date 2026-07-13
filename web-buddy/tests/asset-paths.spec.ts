import { test, expect } from "@playwright/test";
import { existsSync } from "fs";
import path from "path";
import { tools } from "../src/app/tools/tools";

const publicDir = path.join(__dirname, "..", "public");

for (const tool of tools) {
  test(`${tool.slug} logo and previewImage resolve to real files in public/`, () => {
    expect(existsSync(path.join(publicDir, tool.logo))).toBe(true);

    if (tool.previewImage) {
      expect(existsSync(path.join(publicDir, tool.previewImage))).toBe(true);
    }
  });
}
