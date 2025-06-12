import { createMetadata } from "../metadata";
import AboutClient from "./client";
import Script from "next/script";

const title = "About / Impressum";
const description =
  "Official About and Impressum page for The Buddy Compendium — legal information, contact details, and content responsibility by Matthias Eggert. A private, non-commercial web tools project.";
const slug = "/about";
const url = `https://nobuddy.org${slug}`;
const authorName = "Matthias Eggert";

export const metadata = createMetadata({
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

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
