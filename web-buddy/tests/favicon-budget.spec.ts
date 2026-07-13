import { test, expect } from "@playwright/test";
import { statSync } from "fs";
import path from "path";

// favicon.ico is auto-requested by every browser on first visit. Large
// sizes (96px+) are pure redundancy: icon-192.png, icon-512.png, and
// apple-touch-icon.png already serve those. Keep only 16/32/48px entries.
const MAX_BYTES = 20 * 1024;

test("favicon.ico stays within its size budget", () => {
  const faviconPath = path.join(__dirname, "..", "public", "favicon.ico");
  const { size } = statSync(faviconPath);

  expect(size).toBeLessThanOrEqual(MAX_BYTES);
});
