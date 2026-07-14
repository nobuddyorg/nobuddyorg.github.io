import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from "./constants";

const DEFAULT_IMAGE = "/nobuddy_logo_preview.webp";

export function createMetadata({
  title,
  description,
  slug = "",
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description: string;
  slug?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${slug}`;
  const fullTitle = `${title} - crafted with love and fun by ${AUTHOR_NAME}`;
  const resolvedImage = image.trim() ? image : DEFAULT_IMAGE;
  const absoluteImage = resolvedImage.startsWith("http")
    ? resolvedImage
    : `${SITE_URL}${resolvedImage}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteImage,
          width: 1280,
          height: 640,
          alt: `${title} preview`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteImage],
      site: `@${AUTHOR_NAME}`,
      creator: `@${AUTHOR_NAME}`,
    },
  };
}
