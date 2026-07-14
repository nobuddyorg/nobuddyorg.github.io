import TerminalIntro from "./components/TerminalIntro";
import ManifestoScroll from "./components/ManifestoScroll";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JsonLd, { type JsonLdData } from "./components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./constants";
import { createMetadata } from "./metadata";
import CirclesBackground from "./components/CirclesBackground";

const title = SITE_NAME;
const slug = "/";
const url = `${SITE_URL}${slug}`;

const description = SITE_DESCRIPTION;

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
      <JsonLd id="jsonld-home" data={jsonLd} />
      <Header />
      <main className="text-black dark:text-white overflow-x-hidden">
        <section className="min-h-screen">
          <CirclesBackground variant="page2" />
          <TerminalIntro />
        </section>
        <ManifestoScroll />
      </main>
      <Footer />
    </>
  );
}
