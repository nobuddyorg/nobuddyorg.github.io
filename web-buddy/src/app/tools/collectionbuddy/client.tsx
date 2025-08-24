"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const screenshots = [
  {
    src: "login.gif",
    alt: "Secure Authentication",
    text: "Get started with secure authentication powered by Supabase and Google OAuth. Sign up or log in with ease to access your personal collection catalog. Your data is protected and always available when you need it. No need to share any details, just use your existing Google Account",
  },
  {
    src: "preview.gif",
    alt: "Collection Overview",
    text: "View your entire collection at a glance with beautiful card layouts. Each item displays essential information like title, descriptions, location, and images. Perfect for getting a quick overview of your treasures.",
  },
  {
    src: "pagination.gif",
    alt: "Smart Navigation",
    text: "Navigate through large collections effortlessly with smooth pagination. Browse hundreds or thousands of items without performance issues. Find what you're looking for quickly and efficiently. And if you don't find the item you are looking for, just use the search box. You can search for any text on the cards, even location and tags.",
  },
  {
    src: "map.gif",
    alt: "Location Mapping",
    text: "Track where your items are located or where you found them with integrated mapping features. Perfect for collectors who want to remember acquisition locations. Especially useful for remembering: 'Hm, I found this at the flea market in 2020.' when you come to the same spot again.",
  },
];

function AnimatedPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-12 rounded-xl overflow-hidden shadow-lg"
    >
      <Image
        src="/images/collection-buddy/preview.webp"
        alt="Collection Buddy animated preview"
        width={1200}
        height={600}
        className="w-full h-auto rounded-xl"
      />
    </motion.div>
  );
}

function TechStackSection() {
  const techStack = [
    { name: "Next.js", url: "https://nextjs.org/" },
    { name: "React", url: "https://reactjs.org/" },
    { name: "TypeScript", url: "https://www.typescriptlang.org/" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
    { name: "Framer Motion", url: "https://www.framer.com/motion/" },
    { name: "Supabase", url: "https://supabase.com/" },
    { name: "PostgreSQL", url: "https://www.postgresql.org/" },
    { name: "Authentication", url: "https://supabase.com/docs/guides/auth" },
    { name: "Storage", url: "https://supabase.com/docs/guides/storage" },
    { name: "Static Site", url: "https://nextjs.org/docs/advanced-features/static-html-export" },
    { name: "GitHub Pages", url: "https://pages.github.com/" },
    { name: "Collections", url: "https://en.wikipedia.org/wiki/Collecting" },
    { name: "PWA", url: "https://web.dev/progressive-web-apps/" },
    { name: "Open Street Map", url: "https://www.openstreetmap.org/" }
  ];

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
        Tech Stack
      </h2>
      <ul className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 dark:text-gray-300">
        {techStack.map(({ name, url }) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black dark:hover:text-white"
              title={name}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DescriptionSection() {
  return (
    <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      <p>
        <strong>Collection Buddy</strong> is your elegant solution for cataloging personal collections. Whether you&apos;re organizing stamps, coins, trading cards, or any other collectibles, Collection Buddy provides a beautiful and intuitive interface to keep track of your treasures.
      </p>
      <p>
        Built with modern web technologies like Next.js, React, and Supabase, it offers a seamless experience for adding, viewing, and managing your collection items. The responsive design works perfectly on desktop and mobile devices and can even be installed as a PWA app on your phone.
      </p>
      <br />
      <p>
        🔗{" "}
        <a
          href="https://github.com/nobuddyorg/CollectionBuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
          title="collection github"
        >
          View the repository on GitHub and start organizing your collection
        </a>
      </p>
    </section>
  );
}

function ScreenshotsSection() {
  return (
    <section className="mt-20 space-y-16">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
        Screenshots
      </h2>

      {screenshots.map(({ src, alt, text }, index) => {
        const isEven = index % 2 === 0;
        return (
          <motion.div
            key={alt}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row ${
              !isEven ? "md:flex-row-reverse" : ""
            } items-center gap-8`}
          >
            <Image
              src={`/images/collection-buddy/${src}`}
              alt={alt}
              width={300}
              height={200}
              className="rounded-xl shadow-md w-full md:w-1/2"
            />
            <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed md:w-1/2">
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                {alt}
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{text}</p>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

interface CollectionBuddyClientProps {
  title: string;
}

export default function CollectionBuddyClient({
  title,
}: CollectionBuddyClientProps) {
  return (
    <main className="min-h-screen pt-36 pb-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-10 border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-xl">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-10 text-center">
          {title}
        </h1>
        <AnimatedPreview />
        <DescriptionSection />
        <ScreenshotsSection />
        <TechStackSection />
      </div>
    </main>
  );
}