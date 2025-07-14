import TerminalIntro from "./components/TerminalIntro";
import ManifestoScroll from "./components/ManifestoScroll";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";
import { SITE_URL, SITE_NAME } from "./globals";
import { createMetadata } from "./metadata";
import CirclesBackground from "./components/CirclesBackground";

const title = SITE_NAME;
const slug = "/";
const url = `${SITE_URL}${slug}`;

const description = "Explore nobuddy.org – a playground of creative tools, weird ideas & useful mini-apps. Built for curious minds, developers, and digital explorers."

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
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth text-black dark:text-white overflow-x-hidden">
        <section className="snap-start min-h-screen">
          <CirclesBackground variant="page2" />
          <TerminalIntro />
        </section>
        <ManifestoScroll />
      </main>
      <Footer />
    </>
  );
}
