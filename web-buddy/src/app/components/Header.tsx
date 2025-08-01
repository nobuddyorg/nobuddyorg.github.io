import Link from "next/link";
import Image from "next/image";
import { AUTHOR_NAME, GITHUB_URL } from "../globals";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12 md:h-16 overflow-hidden">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-black dark:text-white"
        >
          <Image
            src="/logo-header.webp"
            alt="Web Buddy Logo"
            title="Web Buddy Logo"
            width={25}
            height={25}
            className="inline-block mr-2"
          />
          {AUTHOR_NAME}
        </Link>
        <div className="flex flex-wrap items-center space-x-4 sm:space-x-6">
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
