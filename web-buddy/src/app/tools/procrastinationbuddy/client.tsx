"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const screenshots = [
  {
    src: "frontend-light.webp",
    alt: "Frontend Light",
    text: "A calm and sunny interface that feels just productive enough to make you feel like you are doing something. Ideal for morning procrastination.",
  },
  {
    src: "frontend-dark.webp",
    alt: "Frontend Dark",
    text: "Soft and moody for those quiet moments when you want to avoid everything while pretending to be focused.",
  },
  {
    src: "settings-light.webp",
    alt: "Settings",
    text: "Play around with switches and sliders. Nothing urgent, nothing life changing, just something to tinker with while avoiding the real stuff.",
  },
  {
    src: "help-light.webp",
    alt: "Help",
    text: "Explore the help section to feel like you are making progress. It may not solve anything, but it feels like a step in the right direction.",
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
        src="/images/procrastination-buddy/buddy-preview.webp"
        alt="Procrastination Buddy animated preview"
        width={1200}
        height={600}
        className="w-full h-auto rounded-xl"
      />
    </motion.div>
  );
}

function DescriptionSection() {
  return (
    <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      <p>
        Meet <strong>Procrastination Buddy</strong>, the app that gently
        encourages you to do absolutely nothing important. Instead of pushing
        you to focus, it invites you to take a breath, relax, and enjoy the art
        of doing less.
      </p>
      <p>
        Feel like slowing down for no good reason? You are in the right place.
      </p>
      <br />
      <p>
        🔗{" "}
        <a
          href="https://github.com/nobuddyorg/ProcrastinationBuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
        >
          View the repository on GitHub and try it out on your machine
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
              src={`/images/procrastination-buddy/${src}`}
              alt={alt}
              width={300}
              height={200}
              className="rounded-xl shadow-md w-full md:w-1/2"
            />
            <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed md:w-1/2">
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                {alt}
              </h3>
              <p>{text}</p>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

interface ProcrastinationBuddyClientProps {
  title: string;
}

export default function ProcrastinationBuddyClient({
  title,
}: ProcrastinationBuddyClientProps) {
  return (
    <main className="min-h-screen pt-36 pb-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-10 border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-xl">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-10 text-center">
          {title}
        </h1>
        <AnimatedPreview />
        <DescriptionSection />
        <ScreenshotsSection />
      </div>
    </main>
  );
}
