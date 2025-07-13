"use client";

export default function CirclesBackground({
  topOffset = "-15rem",
}: {
  topOffset?: string;
}) {
  return (
    <div className="w-full relative -z-10 pointer-events-none">
      <svg
        className="absolute left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] opacity-100"
        style={{ top: topOffset }}
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="71"
          cy="61"
          r="111"
          className="fill-[#FFF7DC] dark:fill-[#FCD34D]"
        />
        <circle
          cx="244"
          cy="106"
          r="139"
          className="fill-[#FFE9B8] dark:fill-[#FBBF24]"
        />
        <circle
          cx="400"
          cy="150"
          r="139"
          className="fill-[#FFD285] dark:fill-[#F59E0B]"
        />
        <circle
          cx="316"
          cy="305"
          r="139"
          className="fill-[#F6B73C] dark:fill-[#D97706]"
        />
        <circle
          cx="170"
          cy="319"
          r="139"
          className="fill-[#E09E27] dark:fill-[#B45309]"
        />
      </svg>
    </div>
  );
}
