import { SITE_URL, AUTHOR_NAME } from "../constants";
import { createMetadata } from "../metadata";
import { tools } from "./tools";

export function getToolPageData(slug: string) {
  const tool = tools.find((t) => t.slug === slug);
  const path = `/tools/${slug}`;
  const url = `${SITE_URL}${path}`;

  const title = tool?.name ?? "";
  const description = tool?.description ?? "";
  const image = tool?.previewImage;
  const titleFull = tool?.tagline ? `${title} - ${tool.tagline}` : title;

  const metadata = createMetadata({
    title: titleFull,
    description,
    slug: path,
    image,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description,
    url,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    ...(image ? { image } : {}),
  };

  return { title, metadata, jsonLd };
}
