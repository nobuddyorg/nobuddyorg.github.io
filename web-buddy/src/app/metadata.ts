import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from "./constants";

const DEFAULT_IMAGE = "/nobuddy_logo_preview.webp";

// Google truncates SERP titles around ~60 chars, so the suffix stays short
// and a subtitle (e.g. a tool's tagline) is only appended when the combined
// title still fits the budget — otherwise it's dropped rather than
// truncated mid-word.
const TITLE_SUFFIX = " | nobuddy.org";
export const MAX_TITLE_LENGTH = 60;

export function createMetadata({
  title,
  subtitle,
  description,
  slug = "",
  image = DEFAULT_IMAGE,
}: {
  title: string;
  subtitle?: string;
  description: string;
  slug?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${slug}`;
  const withSubtitle = subtitle ? `${title} - ${subtitle}` : title;
  const baseTitle =
    (withSubtitle + TITLE_SUFFIX).length <= MAX_TITLE_LENGTH
      ? withSubtitle
      : title;
  const fullTitle = `${baseTitle}${TITLE_SUFFIX}`;
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
