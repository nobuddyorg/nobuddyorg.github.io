import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientHome from "./client";
import { createMetadata } from "./metadata";
import { tools } from "./tools";
import Script from "next/script";

const title = "The Buddy Compendium";
const slug = "/";
const url = `https://nobuddy.org${slug}`;

function generateDescription() {
  const toolNames = tools.map((tool) => tool.name).join(", ");
  return `A growing collection of useful web tools with unique personality and practical features for creative problem-solving, including ${toolNames}.`;
}

const description = generateDescription();

export const metadata = createMetadata({
  title,
  description,
  slug,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: title,
  description,
  url,
};

export default function HomePage() {
  return (
    <>
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <ClientHome />
      </main>
      <Footer />
    </>
  );
}
