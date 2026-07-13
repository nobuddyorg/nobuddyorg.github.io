import type { CSSProperties } from "react";
import AnimatedClip from "./AnimatedClip";

export default function ToolAnimatedPreview({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  return (
    <div
      className="fade-in-up mb-12 rounded-xl overflow-hidden shadow-lg"
      style={
        { animationDuration: "0.8s", "--fade-y": "30px" } as CSSProperties
      }
    >
      <AnimatedClip
        src={src}
        poster={poster}
        label={label}
        className="w-full h-auto rounded-xl"
      />
    </div>
  );
}
