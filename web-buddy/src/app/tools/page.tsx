import { SITE_URL, SITE_NAME, TOOLS_DESCRIPTION } from "../constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToolGrid from "../components/ToolGrid";
import { createMetadata } from "../metadata";
import JsonLd, { type JsonLdData } from "../components/JsonLd";
import CirclesBackground from "../components/CirclesBackground";

const title = SITE_NAME;
const slug = "/tools";
const url = `${SITE_URL}${slug}`;

const description = TOOLS_DESCRIPTION;

export const metadata = createMetadata({
  title,
  description,
  slug,
});

const jsonLd: JsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  description,
  url,
};

export default function HomePage() {
  return (
    <>
      <JsonLd id="jsonld-tools" data={jsonLd} />
      <Header />
      <main>
        <CirclesBackground />
        <ToolGrid />
      </main>
      <Footer />
    </>
  );
}
