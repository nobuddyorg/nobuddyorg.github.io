import { test, expect } from "@playwright/test";
import { contrastRatio } from "./utils/contrast";

const cases = [
  // Bolder/higher-contrast than the tools hub subtitle — called out as
  // hard to read (#548).
  {
    path: "/",
    label: "homepage hero subtitle",
    probeClass: "text-neutral-800 dark:text-neutral-100",
  },
  {
    path: "/tools",
    label: "tools hub subtitle",
    probeClass: "text-neutral-700 dark:text-neutral-200",
  },
];

test.describe("subtitle text contrast", () => {
  for (const { path, label, probeClass } of cases) {
    for (const colorScheme of ["light", "dark"] as const) {
      test(`${label} meets WCAG AA (4.5:1) in ${colorScheme} mode`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme });
        await page.goto(path);

        const subtitle = page.locator("h2").first();
        const { color, bg, probeColor } = await subtitle.evaluate(
          (node, probeClass) => {
            // A muted-gray utility class must actually resolve to a real
            // Tailwind color, not silently fall back to the inherited
            // black/white foreground (which happens to also pass AA,
            // masking a typo'd/nonexistent class name).
            const probe = document.createElement("span");
            probe.className = probeClass;
            document.body.appendChild(probe);
            const probeColor = getComputedStyle(probe).color;
            probe.remove();

            const style = getComputedStyle(node);
            return {
              color: style.color,
              bg: getComputedStyle(document.body).backgroundColor,
              probeColor,
            };
          },
          probeClass
        );

        expect(color).toBe(probeColor);
        expect(await contrastRatio(page, bg, color)).toBeGreaterThanOrEqual(
          4.5
        );
      });
    }
  }
});
