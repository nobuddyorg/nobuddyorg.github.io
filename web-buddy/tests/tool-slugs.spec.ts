import { test, expect } from "@playwright/test";
import { tools } from "../src/app/tools/tools";

for (const tool of tools) {
  test(`${tool.name} slug matches its name (lowercased, spaces stripped)`, () => {
    const expectedSlug = tool.name.toLowerCase().replace(/\s+/g, "");
    expect(tool.slug).toBe(expectedSlug);
  });
}
