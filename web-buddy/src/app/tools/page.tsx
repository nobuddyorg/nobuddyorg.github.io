import { SITE_URL, TOOLS_DESCRIPTION } from "../constants";
import Header from "../components/Header";
import ToolGrid from "../components/ToolGrid";
import { createMetadata } from "../metadata";
import JsonLd, { type JsonLdData } from "../components/JsonLd";
import { tools, hasOwnPage } from "./tools";

const title = "The Buddy Compendium";
const slug = "/tools";
const url = `${SITE_URL}${slug}`;

const description = TOOLS_DESCRIPTION;

export const metadata = createMetadata({
  title,
  description,
  slug,
});

const pagedTools = tools.filter(hasOwnPage);

const jsonLd: JsonLdData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: pagedTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/tools/${tool.slug}`,
      name: tool.name,
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd id="jsonld-tools" data={jsonLd} />
      <Header />
      <main className="relative">
        <ToolGrid />
      </main>
    </>
  );
}
