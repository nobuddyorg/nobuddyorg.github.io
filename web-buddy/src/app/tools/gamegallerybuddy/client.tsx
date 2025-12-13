"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const preview = {
  src: "/images/gamegallery-buddy/preview.webp",
  alt: "Board game wallpaper preview",
  text: "GameGalleryBuddy creates a beautiful wallpaper using all board games from your BoardGameGeek collection. Just enter your BGG username and enjoy a personalized background!",
};

function TechStackSection() {
  const techStack = [
    { name: "BoardGameGeek", url: "https://boardgamegeek.com/" },
    { name: "Groovy", url: "https://groovy-lang.org/" },
    { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
    { name: "Gradle", url: "https://gradle.org/" },
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

export default function GameGalleryBuddyClient({ title }: { title: string }) {
  return (
    <main className="min-h-screen pt-36 pb-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-10 border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-xl">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-10 text-center">
          {title}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 rounded-xl overflow-hidden shadow-lg"
        >
          <Image
            src={preview.src}
            alt={preview.alt}
            width={1200}
            height={600}
            className="w-full h-auto rounded-xl"
          />
        </motion.div>

        <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            <strong>Game Gallery Buddy</strong> turns your board game collection
            into a wallpaper. Just enter your BoardGameGeek username and
            customize the layout: choose cover size, show or hide names, shuffle
            the order, and more.
          </p>
          <p>
            Requires a tiny bit of dev experience to run locally, but everything
            is explained in the README file.
          </p>
          <Image
            src={`/images/gamegallery-buddy/powered-by-bgg.webp`}
            alt="powered by bgg"
            width={1200}
            height={352}
            className="w-full h-auto rounded-xl"
          />
          <p>
            🔗{" "}
            <a
              href="https://github.com/nobuddyorg/GameGalleryBuddy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black dark:hover:text-white"
              title="game gallery github"
            >
              View the code on GitHub or run it locally
            </a>
          </p>
        </section>
        <TechStackSection />
      </div>
    </main>
  );
}
