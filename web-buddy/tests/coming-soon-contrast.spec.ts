import { test, expect } from "@playwright/test";
import { contrastRatio } from "./utils/contrast";
import { tools } from "../src/app/tools/tools";
import { ITEMS_PER_PAGE } from "../src/app/components/ToolGrid";

const firstComingSoonIndex = tools.findIndex((t) => t.status === "coming_soon");
const comingSoonPage = Math.floor(firstComingSoonIndex / ITEMS_PER_PAGE) + 1;

// CSS `opacity` on an ancestor doesn't change a descendant's computed
// `color`/`background-color` — it's a paint-time compositing effect: the
// whole subtree renders normally, then that flattened result is blended
// against whatever is behind it (here, the page background) by the
// opacity fraction. This walks the ancestor chain multiplying opacity,
// then blends both the card's own background and the text color against
// the page background by that same fraction, mirroring what the browser
// actually paints.
test.describe("coming-soon card text contrast", () => {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`description meets WCAG AA (4.5:1) in ${colorScheme} mode`, async ({
      page,
    }) => {
      test.skip(firstComingSoonIndex === -1, "no coming-soon tools");

      await page.emulateMedia({ colorScheme });
      await page.goto("/tools");
      if (comingSoonPage > 1) {
        await page
          .getByRole("button", { name: `Page ${comingSoonPage}` })
          .click();
      }

      const card = page.getByTestId("coming_soon").first().locator("..");
      // Cards mount with a fade-in-up entrance animation; wait for it to
      // finish so the styles read below reflect the steady state.
      await page.waitForTimeout(700);

      const { effectiveBg, effectiveText } = await card.evaluate(
        (cardEl) => {
          const node = cardEl.querySelector("p")!;
          let opacity = 1;
          for (
            let el: Element | null = cardEl;
            el && el !== document.body;
            el = el.parentElement
          ) {
            opacity *= parseFloat(getComputedStyle(el).opacity || "1");
          }

          // Tailwind v4 computed colors can come back as lab()/oklch(),
          // not just rgb() — normalize via canvas, which every browser
          // resolves to concrete sRGB bytes reliably regardless of the
          // input color space.
          const toRgbBytes = (color: string) => {
            const canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            return [r, g, b];
          };

          const [pr, pg, pb] = toRgbBytes(
            getComputedStyle(document.body).backgroundColor
          );
          const [cr, cg, cb] = toRgbBytes(
            getComputedStyle(cardEl).backgroundColor
          );
          const [tr, tg, tb] = toRgbBytes(getComputedStyle(node).color);
          const blend = (page: number, own: number) =>
            Math.round(page * (1 - opacity) + own * opacity);

          return {
            effectiveBg: `rgb(${blend(pr, cr)}, ${blend(pg, cg)}, ${blend(pb, cb)})`,
            effectiveText: `rgb(${blend(pr, tr)}, ${blend(pg, tg)}, ${blend(pb, tb)})`,
          };
        }
      );

      expect(
        await contrastRatio(page, effectiveBg, effectiveText)
      ).toBeGreaterThanOrEqual(4.5);
    });
  }
});
