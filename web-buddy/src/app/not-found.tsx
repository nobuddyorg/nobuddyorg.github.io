import type { Metadata } from "next";
import Link from "next/link";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Page Not Found - nobuddy.org",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 pt-20 md:pt-32 pb-28">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 md:mb-6 text-black dark:text-white">
          404
        </h1>
        <p className="max-w-xl text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
          This page doesn&apos;t exist, or has wandered off somewhere.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition"
            title="home"
          >
            Back to Home
          </Link>
          <Link
            href="/tools"
            className="border border-gray-400 dark:border-gray-600 text-black dark:text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
            title="tools"
          >
            Browse the Tools
          </Link>
        </div>
      </main>
    </>
  );
}
