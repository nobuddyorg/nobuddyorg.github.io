import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from "./constants";

const DEFAULT_IMAGE = "/nobuddy_logo_preview.webp";
const DEFAULT_IMAGE_WIDTH = 1280;
const DEFAULT_IMAGE_HEIGHT = 640;

export function createMetadata({
  title,
  description,
  slug = "",
  image = DEFAULT_IMAGE,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
}: {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
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
          width: imageWidth,
          height: imageHeight,
          alt: `${title} preview`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    // No site/creator: no X/Twitter account is controlled by this project,
    // and @nobuddy would likely attribute shared pages to an unrelated
    // account. The card renders fine without them.
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteImage],
    },
  };
}
