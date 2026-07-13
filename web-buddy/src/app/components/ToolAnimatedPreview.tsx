"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-12 rounded-xl overflow-hidden shadow-lg"
    >
      <AnimatedClip
        src={src}
        poster={poster}
        label={label}
        className="w-full h-auto rounded-xl"
      />
    </motion.div>
  );
}
