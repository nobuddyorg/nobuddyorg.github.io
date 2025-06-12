import { createMetadata } from "../../metadata";
import { tools } from "../../tools";
import ProcrastinationBuddyClient from "./client";
import Script from "next/script";

const slug = "procrastinationbuddy";
const path = `/tools/${slug}`;
const defaultTitle = "Procrastination Buddy";
const defaultDescription =
  "A fun and quirky productivity tool to help you procrastinate with style.";

const tool = tools.find((t) => t.slug === slug);

const title = tool?.name ?? defaultTitle;
const description = tool?.description ?? defaultDescription;
const image = tool?.logo;
const url = `https://nobuddy.org${path}`;
const authorName = "Matthias Eggert";

export const metadata = createMetadata({
  title,
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
    name: authorName,
  },
  ...(image ? { image } : {}),
};

export default function ProcrastinationBuddyPage() {
  return (
    <>
      <Script
        id="procrastinationbuddy-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProcrastinationBuddyClient />
    </>
  );
}
