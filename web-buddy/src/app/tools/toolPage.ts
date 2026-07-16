import { SITE_URL, AUTHOR_NAME } from "../constants";
import { createMetadata } from "../metadata";
import { tools } from "./tools";
import type { JsonLdData } from "../components/JsonLd";

export function getToolPageData(slug: string) {
  const tool = tools.find((t) => t.slug === slug);
  const path = `/tools/${slug}`;
  const url = `${SITE_URL}${path}`;

  const title = tool?.name ?? "";
  const description = tool?.description ?? "";
  const image = tool?.previewImage;

  const metadata = createMetadata({
    title,
    subtitle: tool?.tagline,
    description,
    slug: path,
    image,
  });

  const jsonLd: JsonLdData = {
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

  return { title, metadata, jsonLd, jsonLdId: `jsonld-${slug}` };
}
