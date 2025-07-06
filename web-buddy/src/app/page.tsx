import { SITE_URL, SITE_NAME, GITHUB_URL } from "./globals";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToolGrid from "./page-toolgrid";
import { createMetadata } from "./metadata";
import { tools } from "./tools";
import PageWrapper from "./components/PageWrapper";
import Link from "next/link";

const title = SITE_NAME;
const slug = "/";
const url = `${SITE_URL}${slug}`;

const description = `A growing collection of useful web tools with unique personality and practical features for creative problem-solving, including ${tools
  .map((tool) => tool.name)
  .join(", ")}.`;

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

function Hero() {
  return (
    <section
      className="relative pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 text-center overflow-hidden"
      aria-label="Introduction section"
    >
    <svg
      className="absolute -top-20 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] opacity-100 pointer-events-none"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="71"
        cy="61"
        r="111"
        className="fill-[#FFF7DC] dark:fill-[#FCD34D]"
      />
      <circle
        cx="244"
        cy="106"
        r="139"
        className="fill-[#FFE9B8] dark:fill-[#FBBF24]"
      />
      <circle
        cx="400"
        cy="150"
        r="139"
        className="fill-[#FFD285] dark:fill-[#F59E0B]"
      />
      <circle
        cx="316"
        cy="305"
        r="139"
        className="fill-[#F6B73C] dark:fill-[#D97706]"
      />
      <circle
        cx="170"
        cy="319"
        r="139"
        className="fill-[#E09E27] dark:fill-[#B45309]"
      />
    </svg>

      <h1 className="relative z-10 text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-black dark:text-white">
        {SITE_NAME}
      </h1>
      <h2 className="relative z-10 max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-8">
        Blending quirky charm with real-world usefulness for {"'everybuddy'"}
      </h2>
      <Link
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 inline-block bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-900 transition"
        aria-label="Follow Nobuddyorg on GitHub"
      >
        Follow on GitHub
      </Link>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <PageWrapper metadata={metadata} jsonLd={jsonLd} />
      <Header />
      <main>
        <Hero />
        <ToolGrid />
      </main>
      <Footer />
    </>
  );
}
