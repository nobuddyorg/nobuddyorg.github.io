"use client";

import { motion } from "framer-motion";

const ideas = [
  {
    emoji: "🧸",
    title: "Software can be useful and weird",
    body: `Every Buddy is designed to solve a real problem, but always with a twist. Whether it's merging GPS tracks or generating board game wallpapers, the functionality comes first. If the interface makes you smile, it’s a bonus. We believe that utility doesn't have to be boring. Playful design can spark joy and curiosity, even in the most mundane tasks. It's about making tools that work well and feel good to use.`,
    bg: "bg-red-100 dark:bg-red-900",
  },
  {
    emoji: "🎛️",
    title: "Fueled by hype, grounded in curiosity",
    body: `This is a playground for whatever tech looks shiny today. Next.js, Tailwind, k6, Docker, AWS, even Groovy. If it's fun to build with, it’s fair game. These tools exist to experiment, not to optimize. The stack changes when the mood does. It’s not about chasing trends for the sake of relevance. It’s about exploring what’s possible, learning by doing, and embracing the chaos of modern development. Curiosity drives everything here.`,
    bg: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    emoji: "📦",
    title: "Fork it, run it, improve it",
    body: `All tools are fully open source and self-contained. You can clone them, spin them up locally, or deploy in the cloud with minimal effort. There is no lock-in, no tracking, and no nonsense. Every Buddy is yours to use or change as you like. Contributions are welcome, and experimentation is encouraged. Whether you're fixing a bug, adding a feature, or just poking around, you're part of the process. The code is yours. Make it better or make it weird.`,
    bg: "bg-sky-100 dark:bg-sky-900",
  },
  {
    emoji: "🚀",
    title: "This is a hobby project",
    body: `No big team, no investors, no corporate goals. Just some developers shipping tools out of curiosity and frustration. Some ideas are polished, others are experimental. If something breaks or feels unfinished, it’s probably because it was released too early. That’s part of the fun. This space is intentionally imperfect. It's a sandbox for ideas that might not fit anywhere else. It’s about freedom, creativity, and the joy of building without pressure.`,
    bg: "bg-rose-100 dark:bg-rose-900",
  },
];

export default function ManifestoScroll() {
  return (
    <>
      {ideas.map(({ emoji, title, body, bg }, idx) => (
        <section
          key={idx}
          className={`snap-start h-screen flex flex-col justify-center items-center text-center p-10 ${bg}`}
        >
          <motion.div
            className="text-6xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {emoji}
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="max-w-xl text-base sm:text-lg text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {body}
          </motion.p>
        </section>
      ))}

      <section className="snap-start h-screen flex flex-col justify-center items-center text-center p-10 bg-lime-100 dark:bg-lime-900">
        <motion.div
          className="text-xl sm:text-2xl mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore the tools. Adopt a Buddy.
        </motion.div>
        <a
          href="/tools"
          className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-lg font-semibold hover:opacity-90 transition"
          title="tools"
        >
          Launch /tools →
        </a>
      </section>
    </>
  );
}
