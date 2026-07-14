import { SITE_URL, SITE_NAME, TOOLS_DESCRIPTION } from "../globals";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToolGrid from "./page-toolgrid";
import { createMetadata } from "../metadata";
import PageWrapper from "../components/PageWrapper";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  description,
  url,
};

export default function HomePage() {
  return (
    <>
      <PageWrapper metadata={metadata} jsonLd={jsonLd} />
      <Header />
      <main>
        <CirclesBackground />
        <ToolGrid />
      </main>
      <Footer />
    </>
  );
}
