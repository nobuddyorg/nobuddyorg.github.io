import Header from "../components/Header";
import Footer from "../components/Footer";
import { createMetadata } from "../metadata";
import PageWrapper from "../components/PageWrapper";
import { SITE_URL, LEGAL_AUTHOR, AUTHOR_NAME } from "../globals";
import CirclesBackground from "../components/CirclesBackground";

const title = "About / Impressum";
const description =
  "Official About and Impressum page for The Buddy Compendium — legal information, contact details, and content responsibility by Matthias Eggert. A private, non-commercial web tools project.";
const slug = "/about";
const url = `${SITE_URL}${slug}`;

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
    name: AUTHOR_NAME,
  },
};

export { metadata };

function EnglishSection() {
  return (
    <div className="rounded-2xl p-6 border-1 bg-white dark:bg-black border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 space-y-4">
      <h2 className="text-lg font-semibold mb-2">English</h2>
      <p>
        <strong>Content responsibility:</strong>
        <br />
        {LEGAL_AUTHOR}
        <br />
        Germany
      </p>
      <p>
        <strong>Contact:</strong>
        <br />
        E-mail: info@nobuddy.org
        <br />
        Contact form:{" "}
        <a
          href="https://domaincontact.cloudflareregistrar.com/nobuddy.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
        >
          domaincontact.cloudflareregistrar.com
        </a>
      </p>
      <p>
        This project is purely private and does not pursue any commercial
        interests.
      </p>
      <p>
        <strong>Disclaimer:</strong>
        <br />
        The contents of this site have been created with the greatest care.
        However, we assume no liability for the accuracy, completeness or
        up-to-dateness of the content.
      </p>
    </div>
  );
}

function GermanSection() {
  return (
    <div className="rounded-2xl p-6 border bg-white dark:bg-black border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 space-y-4">
      <h2 className="text-lg font-semibold mb-2">Deutsch</h2>
      <p>
        <strong>Verantwortlich für den Inhalt:</strong>
        <br />
        {LEGAL_AUTHOR}
        <br />
        Deutschland
      </p>
      <p>
        <strong>Kontakt:</strong>
        <br />
        E-Mail: info@nobuddy.org
        <br />
        Kontaktformular:{" "}
        <a
          href="https://domaincontact.cloudflareregistrar.com/nobuddy.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
        >
          domaincontact.cloudflareregistrar.com
        </a>
      </p>
      <p>
        Dieses Projekt ist rein privat und verfolgt keine kommerziellen
        Interessen.
      </p>
      <p>
        <strong>Haftungsausschluss:</strong>
        <br />
        Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir
        jedoch keine Gewähr.
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageWrapper metadata={metadata} jsonLd={jsonLd} />
      <Header />
      <main className="min-h-screen pt-36 pb-28 px-4 sm:px-6 max-w-5xl mx-auto">
        <CirclesBackground topOffset="-23.8rem" />
        <h1 className="text-center relative z-10 text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-black dark:text-white">
          About / Impressum
        </h1>
        <br />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
          <EnglishSection />
          <GermanSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
