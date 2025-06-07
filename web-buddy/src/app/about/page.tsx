"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-36 pb-28 px-4 sm:px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-10 text-center">
          About / Impressum
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
          {/* English Section */}
          <div className="rounded-2xl p-6 border bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 space-y-4">
            <h2 className="text-lg font-semibold mb-2">English</h2>
            <p>
              <strong>Content responsibility:</strong><br />
              Matthias Eggert<br />
              Germany
            </p>
            <p>
              <strong>Contact:</strong><br />
              E-mail: info@nobuddy.org<br />
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
              This project is purely private and does not pursue any commercial interests.
            </p>
            <p>
              <strong>Disclaimer:</strong><br />
              The contents of this site have been created with the greatest care. However, we assume no
              liability for the accuracy, completeness or up-to-dateness of the content.
            </p>
          </div>

          {/* German Section */}
          <div className="rounded-2xl p-6 border bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 space-y-4">
            <h2 className="text-lg font-semibold mb-2">Deutsch</h2>
            <p>
              <strong>Verantwortlich für den Inhalt:</strong><br />
              Matthias Eggert<br />
              Deutschland
            </p>
            <p>
              <strong>Kontakt:</strong><br />
              E-Mail: info@nobuddy.org<br />
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
              Dieses Projekt ist rein privat und verfolgt keine kommerziellen Interessen.
            </p>
            <p>
              <strong>Haftungsausschluss:</strong><br />
              Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
