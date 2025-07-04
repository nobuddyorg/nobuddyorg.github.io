"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const screenshots = [
  {
    src: "frontend.webp",
    alt: "Easy Usage",
    text: "Deploy and manage your testing infrastructure with simple scripts and an intuitive frontend. Powerful under the hood, simple on the surface. The frontend helps you tackle complex tasks with ease.",
  },
  {
    src: "settings.webp",
    alt: "Distributed Load Testing",
    text: "Simulate large-scale traffic using k6 across multiple Kubernetes pods of your desired sizes (number of agents, CPU and Memory). Thrash Buddy can create loads on your system that you might not be ready for: take care!.",
  },
  {
    src: "dashboard.webp",
    alt: "Real-Time Dashboard",
    text: "Monitor your app's performance in real time with Grafana dashboards powered by Prometheus. See metrics like response time and throughput at a glance.",
  },
  {
    src: "eks.webp",
    alt: "Kubernetes Integration",
    text: "Thrash Buddy integrates seamlessly with Kubernetes, and thus allowing you to run it on many cloud providers and on-premises. The cloud tools may offer additional support to you.",
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
        src="/images/thrash-buddy/preview.webp"
        alt="Thrash Buddy animated preview"
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
        <strong>Thrash Buddy</strong> is your go-to solution for cloud-native performance testing. Whether you&apos;re preparing for a product launch or scaling your infrastructure, Thrash Buddy helps you simulate real-world load with confidence.
      </p>
      <p>
        Built on top of powerful tools like k6, Prometheus, and Grafana, it enables distributed load testing across Kubernetes clusters, giving you deep insights into how your app performs under pressure.
      </p>
      <br />
      <p>
        🔗{" "}
        <a
          href="https://github.com/nobuddyorg/ThrashBuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
        >
          View the repository on GitHub and try it out on your infrastructure
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
              src={`/images/thrash-buddy/${src}`}
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

interface ThrashBuddyClientProps {
  title: string;
}

export default function ThrashBuddyClient({
  title,
}: ThrashBuddyClientProps) {
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