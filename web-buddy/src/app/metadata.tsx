import type { Metadata } from "next";

const siteName = "The Buddy Compendium";
const siteUrl = "https://nobuddy.org";

export function createMetadata({
  title,
  description,
  slug = "",
  image = "/nobuddy_logo_preview.webp",
}: {
  title: string;
  description: string;
  slug?: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${slug}`;
  const fullTitle = `${title} - by nobuddy`;
  const absoluteImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
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
    },
  };
}
