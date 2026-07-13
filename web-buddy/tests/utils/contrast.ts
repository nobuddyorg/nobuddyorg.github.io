import type { Page } from "@playwright/test";

// Tailwind v4's computed colors can come back as oklab()/oklch(), not just
// rgb(). Normalize via a canvas, which every browser resolves to concrete
// sRGB bytes (via getImageData) reliably regardless of the input color space.
export async function contrastRatio(
  page: Page,
  colorA: string,
  colorB: string
) {
  return page.evaluate(
    ([a, b]) => {
      const toRgb = (color: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, bch] = ctx.getImageData(0, 0, 1, 1).data;
        return [r, g, bch];
      };

      const relativeLuminance = ([r, g, bch]: number[]) => {
        const [rs, gs, bs] = [r, g, bch].map((c) => {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };

      const la = relativeLuminance(toRgb(a));
      const lb = relativeLuminance(toRgb(b));
      const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
      return (lighter + 0.05) / (darker + 0.05);
    },
    [colorA, colorB]
  );
}
