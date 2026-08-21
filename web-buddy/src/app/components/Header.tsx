import Link from "next/link";
import Image from "next/image";
import { GITHUB_URL } from "../constants";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-10 sm:h-12 md:h-16 overflow-hidden">
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 pb-1 text-lg sm:text-2xl font-display font-bold tracking-[-0.02em] text-foreground shrink-0"
        >
          <Image
            src="/logo-header.webp"
            // Decorative: the link's visible text ("nobuddy") is already
            // its accessible name. alt="" excludes the image from the
            // accessibility tree; no title either, since that also
            // contributes to the computed accessible name.
            alt=""
            width={25}
            height={25}
            className="shrink-0"
          />
          <span className="pb-0.5">
            <span className="border-b-2 border-foreground pb-px">no</span>
            <span className="text-accent">buddy</span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center space-x-3 sm:space-x-6 text-sm sm:text-base">
          <Link
            href="/tools"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold transition"
            title="tools"
          >
            Tools
          </Link>
          <Link
            href="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold transition"
            title="about"
          >
            About
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold transition"
            title="github"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
