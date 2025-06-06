"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { tools } from "./tools";

function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-black">
          nobuddy
        </Link>
        <div className="flex space-x-6">
          <Link href="#tools" className="text-gray-700 hover:text-black font-semibold transition">
            Tools
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-black font-semibold transition"
          >
            Contact
          </Link>
          <a
            href="https://github.com/nobuddyorg"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 hover:text-black font-semibold transition"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-36 pb-20 max-w-4xl mx-auto px-6 sm:px-8 text-center">
      {/* Background blobs */}
      <svg
        aria-hidden="true"
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] opacity-10 pointer-events-none"
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="71" cy="61" r="111" fill="#A78BFA" />
        <circle cx="244" cy="106" r="139" fill="#8B5CF6" />
        <circle cx="400" cy="150" r="139" fill="#C4B5FD" />
        <circle cx="316" cy="305" r="139" fill="#A78BFA" />
        <circle cx="170" cy="319" r="139" fill="#8B5CF6" />
      </svg>

      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-black relative z-10">
        The Buddy Compendium
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto relative z-10">
        A growing collection of delightfully weird tools — built by nobuddy, for nobuddy.
      </p>
      <Link
        href="https://github.com/nobuddyorg"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-900 transition"
      >
        Follow on GitHub
      </Link>
    </section>
  );
}

function ToolGrid() {
  return (
    <section
      id="tools"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 sm:px-8 mb-28"
    >
      {tools.map((tool, index) => (
        <motion.div
          key={tool.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="w-full"
        >
          <Link
            href={`/tools/${tool.slug}`}
            className="group block bg-white rounded-2xl p-6 border border-gray-200 hover:border-black shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-inner">
                {tool.logo ? (
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-6 h-6 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-500">
                    {tool.name[0]}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold group-hover:text-black transition">
                {tool.name}
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {tool.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10 text-center text-gray-400 text-sm max-w-6xl mx-auto px-6 sm:px-8">
      <p>
        Crafted with ♥️ by{" "}
        <a
          href="https://nobuddy.org"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-black transition"
        >
          nobuddy
        </a>{" "}
        • Open source on{" "}
        <a
          href="https://github.com/nobuddyorg"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-black transition"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ToolGrid />
        <Footer />
      </main>
    </>
  );
}
