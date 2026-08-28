import { test, expect } from "@playwright/test";
import { existsSync } from "fs";
import path from "path";
import { tools, hasOwnPage } from "../src/app/tools/tools";

const publicDir = path.join(__dirname, "..", "public");
const toolsSrcDir = path.join(__dirname, "..", "src", "app", "tools");

for (const tool of tools) {
  test(`${tool.slug} logo and previewImage resolve to real files in public/`, () => {
    expect(existsSync(path.join(publicDir, tool.logo))).toBe(true);

    if (tool.previewImage) {
      expect(existsSync(path.join(publicDir, tool.previewImage))).toBe(true);
    }
  });
}

const readyTools = tools.filter(hasOwnPage);

for (const tool of readyTools) {
  test(`${tool.slug} has a matching route directory`, () => {
    expect(existsSync(path.join(toolsSrcDir, tool.slug, "page.tsx"))).toBe(
      true
    );
  });
}
