"use client";

// The five-color amber gradient is shared by every variant; only the
// circles' positions/sizes differ per page. Kept as complete literal class
// strings (not built from interpolated hex values) so Tailwind's static
// scanner can still discover and generate them — it can't see through
// runtime string concatenation.
const PALETTE_CLASSES = [
  "fill-[#FFF7DC] dark:fill-[#E3780D]",
  "fill-[#FFE9B8] dark:fill-[#C1660B]",
  "fill-[#FFD285] dark:fill-[#A4570A]",
  "fill-[#F6B73C] dark:fill-[#874708]",
  "fill-[#E09E27] dark:fill-[#6F3B06]",
];

type Circle = { cx: number; cy: number; r: number };

const VARIANT_CIRCLES: Record<"home" | "tools" | "about", Circle[]> = {
  tools: [
    { cx: 71, cy: 61, r: 111 },
    { cx: 244, cy: 106, r: 139 },
    { cx: 400, cy: 150, r: 139 },
    { cx: 316, cy: 305, r: 139 },
    { cx: 170, cy: 319, r: 139 },
  ],
  home: [
    { cx: 120, cy: 40, r: 90 },
    { cx: 260, cy: 180, r: 150 },
    { cx: 480, cy: 100, r: 100 },
    { cx: 350, cy: 400, r: 120 },
    { cx: 100, cy: 300, r: 140 },
  ],
  about: [
    { cx: 50, cy: 100, r: 130 },
    { cx: 200, cy: 50, r: 110 },
    { cx: 380, cy: 200, r: 160 },
    { cx: 250, cy: 450, r: 100 },
    { cx: 460, cy: 300, r: 120 },
  ],
};

type CirclesBackgroundProps = {
  variant?: "home" | "tools" | "about";
};

export default function CirclesBackground({
  variant = "tools",
}: CirclesBackgroundProps) {
  return (
    // Clips to the positioned parent's own bounds so the oversized
    // decorative svg below can't inflate the page's scroll height.
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg
        className="absolute left-1/2 -translate-x-1/2 w-[100rem] h-[150dvh] opacity-100"
        style={{ top: "-15rem" }}
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        {VARIANT_CIRCLES[variant].map(({ cx, cy, r }, index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r={r}
            className={PALETTE_CLASSES[index]}
          />
        ))}
      </svg>
    </div>
  );
}
