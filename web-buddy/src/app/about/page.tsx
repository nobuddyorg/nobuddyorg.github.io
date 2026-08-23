import Header from "../components/Header";
import { createMetadata } from "../metadata";
import JsonLd, { type JsonLdData } from "../components/JsonLd";
import { SITE_URL, LEGAL_AUTHOR, AUTHOR_NAME } from "../constants";

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

const jsonLd: JsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${title} - legal information about nobuddy.org, required on german websites.`,
  description,
  url,
  author: {
    "@type": "Person",
    name: AUTHOR_NAME,
  },
};

export { metadata };

function Option({
  flag,
  testId,
  children,
}: {
  flag: string;
  testId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-accent">{flag}</dt>
      <dd
        data-testid={testId}
        className="pl-4 text-gray-700 dark:text-gray-300"
      >
        {children}
      </dd>
    </div>
  );
}

function TerminalPanel({
  lang,
  usage,
  children,
}: {
  lang?: string;
  usage: string;
  children: React.ReactNode;
}) {
  return (
    <div
      lang={lang}
      className="rounded-2xl overflow-hidden border border-neutral-400 dark:border-neutral-600 bg-white dark:bg-black shadow-sm dark:shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#2d2d2d] border-b border-neutral-700">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
      </div>
      <div className="p-6 font-mono space-y-4">
        <p data-testid="about-usage" className="text-black dark:text-white">
          <span className="text-gray-500 dark:text-gray-400">Usage:</span>{" "}
          {usage}
        </p>
        <div className="pt-1 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 mt-3 mb-3">
            Options:
          </p>
          <dl className="space-y-3">{children}</dl>
        </div>
      </div>
    </div>
  );
}

function EnglishSection() {
  return (
    <TerminalPanel usage="nobuddy about --lang=en">
      <Option flag="--responsible">
        {LEGAL_AUTHOR}, Germany
      </Option>
      <Option flag="--contact" testId="about-contact">
        E-mail: info@nobuddy.org
        <br />
        Contact form:{" "}
        <a
          href="https://domaincontact.cloudflareregistrar.com/nobuddy.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
          title="contact"
        >
          domaincontact.cloudflareregistrar.com
        </a>
      </Option>
      <Option flag="--purpose" testId="about-purpose">
        This project is purely private and does not pursue any commercial
        interests.
      </Option>
      <Option flag="--disclaimer" testId="about-disclaimer">
        The contents of this site have been created with the greatest care.
        However, we assume no liability for the accuracy, completeness or
        up-to-dateness of the content.
      </Option>
    </TerminalPanel>
  );
}

function GermanSection() {
  return (
    <TerminalPanel lang="de" usage="nobuddy about --lang=de">
      <Option flag="--verantwortlich">
        {LEGAL_AUTHOR}, Deutschland
      </Option>
      <Option flag="--kontakt" testId="about-contact">
        E-Mail: info@nobuddy.org
        <br />
        Kontaktformular:{" "}
        <a
          href="https://domaincontact.cloudflareregistrar.com/nobuddy.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
          title="kontakt"
        >
          domaincontact.cloudflareregistrar.com
        </a>
      </Option>
      <Option flag="--zweck" testId="about-purpose">
        Dieses Projekt ist rein privat und verfolgt keine kommerziellen
        Interessen.
      </Option>
      <Option flag="--haftungsausschluss" testId="about-disclaimer">
        Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir
        jedoch keine Gewähr.
      </Option>
    </TerminalPanel>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd id="jsonld-about" data={jsonLd} />
      <Header />
      <main className="relative min-h-screen page-band">
        <div className="pt-20 md:pt-28 px-4 md:px-6">
          <h1
            data-testid="about-heading"
            className="text-center relative z-10 font-mono text-xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-black dark:text-white"
          >
            <span className="text-accent">$</span> nobuddy about --help
            <span className="cmd-cursor text-accent" aria-hidden="true">
              _
            </span>
          </h1>
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-12 pb-16">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <EnglishSection />
            <GermanSection />
          </section>
        </div>
      </main>
    </>
  );
}
