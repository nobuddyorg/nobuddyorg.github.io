import type { MetadataRoute } from "next";
import { SITE_NAME, AUTHOR_NAME, TOOLS_DESCRIPTION } from "./constants";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: AUTHOR_NAME,
    description: TOOLS_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    // The UI is dark-first (every surface ships a dark: variant driven by
    // prefers-color-scheme); white here gave dark-mode users a jarring
    // white splash screen and status bar on launch.
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
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
