import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'], // Added AVIF support
  },
};

export default nextConfig;
