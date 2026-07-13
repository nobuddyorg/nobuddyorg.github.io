"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedClip from "./AnimatedClip";

export interface ToolScreenshot {
  src: string;
  alt: string;
  text: string;
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

      {screenshots.map(({ src, alt, text }, index) => {
        const isEven = index % 2 === 0;
        return (
          <motion.div
            key={alt}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row ${
              !isEven ? "md:flex-row-reverse" : ""
            } items-center gap-8`}
          >
            {media === "image" ? (
              <Image
                src={`${imageDir}/${src}`}
                alt={alt}
                width={300}
                height={200}
                className="rounded-xl shadow-md w-full md:w-1/2"
              />
            ) : (
              <AnimatedClip
                src={`${imageDir}/${src}.mp4`}
                poster={`${imageDir}/${src}-poster.jpg`}
                label={alt}
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
          </motion.div>
        );
      })}
    </section>
  );
}
