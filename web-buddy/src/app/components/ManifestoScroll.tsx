"use client";

import { useEffect, useRef, useState } from "react";
import TerminalIntro from "./TerminalIntro";

const ideas = [
  {
    emoji: "🧸",
    title: "Software can be useful and weird",
    body: `Every Buddy is designed to solve a real problem, but always with a twist. Whether it's merging GPS tracks or generating board game wallpapers, the functionality comes first. If the interface makes you smile, it’s a bonus. We believe that utility doesn't have to be boring. Playful design can spark joy and curiosity, even in the most mundane tasks. It's about making tools that work well and feel good to use.`,
  },
  {
    emoji: "🎛️",
    title: "Fueled by hype, grounded in curiosity",
    body: `This is a playground for whatever tech looks shiny today. Next.js, Tailwind, k6, Docker, AWS, even Groovy. If it's fun to build with, it’s fair game. These tools exist to experiment, not to optimize. The stack changes when the mood does. It’s not about chasing trends for the sake of relevance. It’s about exploring what’s possible, learning by doing, and embracing the chaos of modern development. Curiosity drives everything here.`,
  },
  {
    emoji: "📦",
    title: "Fork it, run it, improve it",
    body: `All tools are fully open source and self-contained. You can clone them, spin them up locally, or deploy in the cloud with minimal effort. There is no lock-in, no tracking, and no nonsense. Every Buddy is yours to use or change as you like. Contributions are welcome, and experimentation is encouraged. Whether you're fixing a bug, adding a feature, or just poking around, you're part of the process. The code is yours. Make it better or make it weird.`,
  },
  {
    emoji: "🚀",
    title: "This is a hobby project",
    body: `Started as a handful of fun side projects – now some have grown into tools people actually rely on. No big team, no investors, no corporate goals, just developers building what they wish existed. Still no pressure, still no deadlines. Just less duct tape than it used to be.`,
  },
];

const sectionCount = ideas.length + 2; // + intro + call-to-action

// One observer drives both: `active` tracks the centered section (dots),
// `revealed` latches true once and stays true (reveal animation).
function useManifesto() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState<boolean[]>(() =>
    Array(sectionCount).fill(false)
  );
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    Array(sectionCount).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Resolved once, shared by both updates below.
        const changes = entries
          .map((entry) => ({
            index: refs.current.indexOf(entry.target as HTMLElement),
            isIntersecting: entry.isIntersecting,
          }))
          .filter((change) => change.index !== -1);

        setActive((prev) => {
          const next = [...prev];
          for (const { index, isIntersecting } of changes) {
            next[index] = isIntersecting;
          }
          return next;
        });
        setRevealed((prev) => {
          let changed = false;
          const next = [...prev];
          for (const { index, isIntersecting } of changes) {
            if (isIntersecting && !next[index]) {
              next[index] = true;
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
      { threshold: 0.55 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const register = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { register, active, revealed };
}

function ManifestoSection({
  register,
  revealed,
  emoji,
  title,
  body,
}: (typeof ideas)[number] & {
  register: (el: HTMLElement | null) => void;
  revealed: boolean;
}) {
  return (
    <section
      ref={register}
      className={`manifesto-section min-h-dvh snap-center flex flex-col justify-center items-center text-center px-6 pt-16 sm:pt-20 pb-14 sm:pb-16 md:pb-20 ${revealed ? "in-view" : ""}`}
    >
      <div className="manifesto-emoji text-6xl mb-6">{emoji}</div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
      <p className="max-w-xl text-base sm:text-lg text-gray-800 dark:text-gray-200">
        {body}
      </p>
    </section>
  );
}

function CallToActionSection({
  register,
  revealed,
}: {
  register: (el: HTMLElement | null) => void;
  revealed: boolean;
}) {
  return (
    <section
      ref={register}
      className={`manifesto-section min-h-dvh snap-center flex flex-col justify-center items-center text-center px-10 pt-16 sm:pt-20 pb-14 sm:pb-16 md:pb-20 ${revealed ? "in-view" : ""}`}
    >
      <div className="manifesto-cta-text text-xl sm:text-2xl mb-6">
        Explore the tools. Adopt a Buddy.
      </div>
      <a
        href="/tools"
        className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-lg font-semibold hover:opacity-90 transition"
        title="tools"
      >
        Launch /tools →
      </a>
    </section>
  );
}

// Decorative only — headings already convey scroll position.
function ScrollDots({ active }: { active: boolean[] }) {
  const activeIndex = active.lastIndexOf(true);
  return (
    <div className="manifesto-dots" aria-hidden="true">
      {active.map((_, i) => (
        <span
          key={i}
          className={`manifesto-dot ${i === activeIndex ? "active" : ""}`}
        />
      ))}
    </div>
  );
}

export default function ManifestoScroll() {
  const { register, active, revealed } = useManifesto();

  return (
    <>
      {/* tabIndex + aria-label: nested scroll containers aren't otherwise
          keyboard-focusable. */}
      <div
        className="manifesto-slider"
        tabIndex={0}
        aria-label="Manifesto: what nobuddy.org is about"
      >
        <div className="manifesto-gradient">
          <section
            className="relative min-h-dvh snap-center hero-glow overflow-hidden"
            ref={register(0)}
          >
            <div className="absolute -z-10 top-[62%] -left-56 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full bg-sky-400/30 dark:bg-violet-500/30 blur-[100px] pointer-events-none" />
            <TerminalIntro active={active[0]} />
          </section>
          {ideas.map((idea, i) => (
            <ManifestoSection
              key={idea.title}
              register={register(i + 1)}
              revealed={revealed[i + 1]}
              {...idea}
            />
          ))}
          <CallToActionSection
            register={register(ideas.length + 1)}
            revealed={revealed[ideas.length + 1]}
          />
        </div>
      </div>
      <ScrollDots active={active} />
    </>
  );
}
