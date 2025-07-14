"use client";

type CirclesBackgroundProps = {
  topOffset?: string;
  variant?: "page1" | "page2" | "page3";
};

export default function CirclesBackground({
  topOffset = "-15rem",
  variant = "page1",
}: CirclesBackgroundProps) {
  const getCircles = () => {
    switch (variant) {
      case "page2":
        return (
          <>
            <circle
              cx="120"
              cy="40"
              r="90"
              className="fill-[#FFF7DC] dark:fill-[#FCD34D]"
            />
            <circle
              cx="260"
              cy="180"
              r="150"
              className="fill-[#FFE9B8] dark:fill-[#FBBF24]"
            />
            <circle
              cx="480"
              cy="100"
              r="100"
              className="fill-[#FFD285] dark:fill-[#F59E0B]"
            />
            <circle
              cx="350"
              cy="400"
              r="120"
              className="fill-[#F6B73C] dark:fill-[#D97706]"
            />
            <circle
              cx="100"
              cy="300"
              r="140"
              className="fill-[#E09E27] dark:fill-[#B45309]"
            />
          </>
        );
      case "page3":
        return (
          <>
            <circle
              cx="50"
              cy="100"
              r="130"
              className="fill-[#FFF7DC] dark:fill-[#FCD34D]"
            />
            <circle
              cx="200"
              cy="50"
              r="110"
              className="fill-[#FFE9B8] dark:fill-[#FBBF24]"
            />
            <circle
              cx="380"
              cy="200"
              r="160"
              className="fill-[#FFD285] dark:fill-[#F59E0B]"
            />
            <circle
              cx="250"
              cy="450"
              r="100"
              className="fill-[#F6B73C] dark:fill-[#D97706]"
            />
            <circle
              cx="460"
              cy="300"
              r="120"
              className="fill-[#E09E27] dark:fill-[#B45309]"
            />
          </>
        );
      case "page1":
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <div className="w-full relative -z-10 pointer-events-none">
      <svg
        className="absolute left-1/2 -translate-x-1/2 w-[100rem] h-[80rem] opacity-100"
        style={{ top: topOffset }}
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        {getCircles()}
      </svg>
    </div>
  );
}
