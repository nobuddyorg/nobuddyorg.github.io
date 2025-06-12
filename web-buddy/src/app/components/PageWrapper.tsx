import Script from "next/script";
import type { Metadata } from "next";

interface PageWrapperProps {
  metadata: Metadata;
  jsonLd: object;
}

export default function PageWrapper({ metadata, jsonLd }: PageWrapperProps) {
  const rawTitle = metadata.title ?? "page";

  const titleString =
    typeof rawTitle === "string"
      ? rawTitle
      : Array.isArray(rawTitle)
      ? rawTitle.join(" ")
      : String(rawTitle);

  const id = `${titleString.toLowerCase().replace(/\s+/g, "-")}-jsonld`;

  return (
    <>
      <Script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
