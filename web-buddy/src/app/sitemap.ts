import { MetadataRoute } from "next";
import { tools } from "./tools/tools";
import { SITE_URL } from "./globals";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const toolPages = tools
    .filter((tool) => tool.status === "ready")
    .map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...toolPages,
  ];
}
