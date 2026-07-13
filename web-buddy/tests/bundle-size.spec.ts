import { test, expect } from "@playwright/test";
import { readdirSync, readFileSync } from "fs";
import path from "path";

test("no shipped JS chunk contains framer-motion", () => {
  const chunksDir = path.join(__dirname, "..", "out", "_next", "static", "chunks");
  const chunkFiles = readdirSync(chunksDir).filter((f) => f.endsWith(".js"));
  expect(chunkFiles.length).toBeGreaterThan(0);

  const offenders = chunkFiles.filter((file) => {
    const content = readFileSync(path.join(chunksDir, file), "utf-8");
    return (
      content.includes("framer-motion") || content.includes("AnimatePresence")
    );
  });

  expect(offenders).toEqual([]);
});
