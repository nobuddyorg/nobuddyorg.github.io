import { test, expect } from "@playwright/test";

// Locks the exact rendered SVG per page (circle positions/sizes and the
// shared 5-color palette) so the CirclesBackground refactor — deduplicating
// three repeated switch branches into shared palette + per-variant position
// data — can't silently drift the visuals it replaced.
const PALETTE_CLASSES = [
  "fill-[#FFF7DC] dark:fill-[#FCD34D]",
  "fill-[#FFE9B8] dark:fill-[#FBBF24]",
  "fill-[#FFD285] dark:fill-[#F59E0B]",
  "fill-[#F6B73C] dark:fill-[#D97706]",
  "fill-[#E09E27] dark:fill-[#B45309]",
];

const expectations = [
  {
    path: "/",
    label: "home",
    circles: [
      { cx: "120", cy: "40", r: "90" },
      { cx: "260", cy: "180", r: "150" },
      { cx: "480", cy: "100", r: "100" },
      { cx: "350", cy: "400", r: "120" },
      { cx: "100", cy: "300", r: "140" },
    ],
  },
  {
    path: "/tools",
    label: "tools",
    circles: [
      { cx: "71", cy: "61", r: "111" },
      { cx: "244", cy: "106", r: "139" },
      { cx: "400", cy: "150", r: "139" },
      { cx: "316", cy: "305", r: "139" },
      { cx: "170", cy: "319", r: "139" },
    ],
  },
  {
    path: "/about",
    label: "about",
    circles: [
      { cx: "50", cy: "100", r: "130" },
      { cx: "200", cy: "50", r: "110" },
      { cx: "380", cy: "200", r: "160" },
      { cx: "250", cy: "450", r: "100" },
      { cx: "460", cy: "300", r: "120" },
    ],
  },
];

for (const { path, label, circles } of expectations) {
  test(`${label} (${path}) renders its exact circle positions and the shared palette`, async ({
    page,
  }) => {
    await page.goto(path);

    const svgCircles = page.locator("svg[aria-hidden='true'] circle");
    await expect(svgCircles).toHaveCount(5);

    for (let i = 0; i < circles.length; i++) {
      const circle = svgCircles.nth(i);
      await expect(circle).toHaveAttribute("cx", circles[i].cx);
      await expect(circle).toHaveAttribute("cy", circles[i].cy);
      await expect(circle).toHaveAttribute("r", circles[i].r);
      await expect(circle).toHaveClass(PALETTE_CLASSES[i]);
    }
  });
}
