#!/usr/bin/env node
// Fails if any screenshot/preview asset shipped to production exceeds a size
// budget. Scoped to public/images/ (the tool-page screenshots and animated
// previews) rather than all of public/ — public/logos/ and favicon.ico have
// their own tracked cleanup and would otherwise make this check fail for
// reasons unrelated to what it's guarding against.
const fs = require("fs");
const path = require("path");

const TARGET_DIR = path.join(__dirname, "..", "public", "images");
const MAX_BYTES = 1024 * 1024; // 1 MB

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const offenders = walk(TARGET_DIR)
  .map((file) => ({ file, size: fs.statSync(file).size }))
  .filter(({ size }) => size > MAX_BYTES);

if (offenders.length > 0) {
  console.error(`Image budget exceeded (max ${MAX_BYTES / 1024} KB per file):\n`);
  for (const { file, size } of offenders) {
    console.error(`  ${(size / 1024 / 1024).toFixed(2)} MB  ${path.relative(process.cwd(), file)}`);
  }
  console.error(
    "\nRe-encode screen recordings as compressed video instead of animated image formats."
  );
  process.exit(1);
}

console.log(`All assets under public/images/ are within the ${MAX_BYTES / 1024} KB budget.`);
