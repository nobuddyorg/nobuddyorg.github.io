import type { Metadata } from "next";

interface PageWrapperProps {
  metadata: Metadata;
  jsonLd: object;
}

export default function PageWrapper({ jsonLd }: PageWrapperProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
