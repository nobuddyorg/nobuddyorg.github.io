import { SITE_URL, TOOLS_DESCRIPTION } from "../constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToolGrid from "../components/ToolGrid";
import { createMetadata } from "../metadata";
import JsonLd, { type JsonLdData } from "../components/JsonLd";
import CirclesBackground from "../components/CirclesBackground";
import { tools } from "./tools";

const title = "The Buddy Compendium";
const slug = "/tools";
const url = `${SITE_URL}${slug}`;

const description = TOOLS_DESCRIPTION;

export const metadata = createMetadata({
  title,
  description,
  slug,
});

const readyTools = tools.filter((tool) => tool.status === "ready");

const jsonLd: JsonLdData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: readyTools.map((tool, index) => ({
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
      <main>
        <CirclesBackground variant="tools" />
        <ToolGrid />
      </main>
      <Footer />
    </>
  );
}
