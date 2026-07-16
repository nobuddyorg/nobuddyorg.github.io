"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import AnimatedClip from "./AnimatedClip";
import { useInView } from "../hooks/useInView";

export interface ToolScreenshot {
  src: string;
  alt: string;
  text: string;
}

function ScreenshotRow({
  src,
  alt,
  text,
  imageDir,
  media,
  isEven,
}: ToolScreenshot & {
  imageDir: string;
  media: "image" | "video";
  isEven: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row ${
        !isEven ? "md:flex-row-reverse" : ""
      } items-center gap-8 ${inView ? "fade-in-up" : "opacity-0"}`}
      style={
        inView
          ? ({ animationDuration: "0.6s", "--fade-y": "30px" } as CSSProperties)
          : undefined
      }
    >
      {media === "image" ? (
        <Image
          src={`${imageDir}/${src}`}
          // Decorative: the adjacent h3/p already convey this screenshot's
          // caption and description in text, so a screen reader shouldn't
          // announce the same string a second time.
          alt=""
          width={300}
          height={200}
          className="rounded-xl shadow-md w-full md:w-1/2"
        />
      ) : (
        <AnimatedClip
          src={`${imageDir}/${src}.mp4`}
          poster={`${imageDir}/${src}-poster.jpg`}
          label=""
          className="rounded-xl shadow-md w-full md:w-1/2"
        />
      )}
      <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed md:w-1/2">
        <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
          {alt}
        </h3>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function ToolScreenshots({
  screenshots,
  imageDir,
  media,
}: {
  screenshots: ToolScreenshot[];
  imageDir: string;
  media: "image" | "video";
}) {
  return (
    <section className="mt-20 space-y-16">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
        Screenshots
      </h2>

      {screenshots.map((screenshot, index) => (
        <ScreenshotRow
          key={screenshot.alt}
          {...screenshot}
          imageDir={imageDir}
          media={media}
          isEven={index % 2 === 0}
        />
      ))}
    </section>
  );
}
