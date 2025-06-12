import type { MetadataRoute } from "next";
import { SITE_NAME, AUTHOR_NAME } from "./globals";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: AUTHOR_NAME,
    description:
      "A growing collection of useful web tools with unique personality and practical features for creative problem-solving, including ProcrastinationBuddy, ThrashBuddy, and FairBuddy.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
