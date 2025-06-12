import { createMetadata } from "../metadata";
import AboutClient from "./client";
import PageWrapper from "../components/PageWrapper";

const title = "About / Impressum";
const description =
  "Official About and Impressum page for The Buddy Compendium — legal information, contact details, and content responsibility by Matthias Eggert. A private, non-commercial web tools project.";
const slug = "/about";
const url = `https://nobuddy.org${slug}`;
const authorName = "Matthias Eggert";

const metadata = createMetadata({
  title,
  description,
  slug,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url,
  author: {
    "@type": "Person",
    name: authorName,
  },
};

export { metadata };

export default function AboutPage() {
  return (
    <PageWrapper
      metadata={metadata}
      jsonLd={jsonLd}
      ClientComponent={AboutClient}
    />
  );
}
