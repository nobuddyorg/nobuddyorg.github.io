import Link from "next/link";
import { AUTHOR_NAME, GITHUB_URL } from "../constants";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 py-3 md:py-6 text-center text-sm text-gray-600 dark:text-gray-400 px-4 sm:px-6">
      <p>
        Crafted with ♥️ by{" "}
        <Link
          href="/"
          className="underline hover:text-black dark:hover:text-white transition"
          title="home"
        >
          {AUTHOR_NAME}
        </Link>{" "}
        • Open source on{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-black dark:hover:text-white transition"
          title="github"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
