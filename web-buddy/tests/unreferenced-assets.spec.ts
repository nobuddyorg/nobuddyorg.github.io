import { test, expect } from "@playwright/test";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const logosDir = path.join(__dirname, "..", "public", "logos");
const srcDir = path.join(__dirname, "..", "src");

function collectSourceFiles(dir: string): string[] {
  let files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(collectSourceFiles(full));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const sourceContent = collectSourceFiles(srcDir)
  .map((file) => readFileSync(file, "utf-8"))
  .join("\n");

for (const file of readdirSync(logosDir)) {
  test(`public/logos/${file} is referenced from source`, () => {
    expect(sourceContent).toContain(file);
  });
}
