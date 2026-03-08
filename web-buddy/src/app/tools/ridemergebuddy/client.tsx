"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const screenshots = [
  {
    src: "login.webp",
    alt: "Strava Login",
    text: "Login securely with Strava OAuth. No additional credentials required. Your data stays safe and synced automatically with your Strava account.",
  },
  {
    src: "table.webp",
    alt: "Activity Table",
    text: "View your recent Strava activities in a detailed table. Click a row to see full details, including distance, duration, elevation, and route map. Easily see the most relevant data about your activities for quick analysis.",
  },
  {
    src: "merge.webp",
    alt: "Merge Activities",
    text: "Select multiple activities and merge them into a new one. Merged activities are highlighted for clarity. This helps clean up duplicates or combine segmented rides effortlessly. Check out the full project at https://github.com/nobuddyorg/RideMergeBuddy for setup instructions and source code.",
  },
];

function TechStackSection() {
  const techStack = [
    { name: "Angular", url: "https://angular.io/" },
    { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
    { name: "Groovy", url: "https://groovy-lang.org/" },
    { name: "Strava API", url: "https://developers.strava.com/" },
    { name: "Google Maps API", url: "https://developers.google.com/maps" },
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

function DescriptionSection() {
  return (
    <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      <p>
        <strong>RideMergeBuddy</strong> lets you view and merge your Strava activities seamlessly. Select multiple rides or runs, merge them into a new activity, and track everything in one place.
      </p>
      <br />
      <p>
        🔗{" "}
        <a
          href="https://github.com/nobuddyorg/RideMergeBuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
          title="RideMergeBuddy GitHub"
        >
          View the repository on GitHub
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
              src={`/images/ridemerge-buddy/${src}`}
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

interface RideMergeBuddyClientProps {
  title: string;
}

export default function RideMergeBuddyClient({
  title,
}: RideMergeBuddyClientProps) {
  return (
    <main className="min-h-screen pt-36 pb-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-10 border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-xl">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-10 text-center">
          {title}
        </h1>
        <DescriptionSection />
        <ScreenshotsSection />
        <TechStackSection />
      </div>
    </main>
  );
}