import { SITE_URL, AUTHOR_NAME, GITHUB_URL } from "../globals";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 py-3 md:py-6 text-center text-sm text-gray-400 dark:text-gray-600 px-4 sm:px-6">
      <p>
        Crafted with ♥️ by{" "}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener"
          className="underline hover:text-black transition"
          title="home"
        >
          {AUTHOR_NAME}
        </a>{" "}
        • Open source on{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-black transition"
          title="github"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
