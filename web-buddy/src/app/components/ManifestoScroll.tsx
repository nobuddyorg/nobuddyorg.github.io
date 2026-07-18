"use client";

import { useEffect, useRef, useState } from "react";

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
    body: `No big team, no investors, no corporate goals. Just some developers shipping tools out of curiosity and frustration. Some ideas are polished, others are experimental. If something breaks or feels unfinished, it’s probably because it was released too early. That’s part of the fun. This space is intentionally imperfect. It's a sandbox for ideas that might not fit anywhere else. It’s about freedom, creativity, and the joy of building without pressure.`,
  },
];

const sectionCount = ideas.length + 1; // + call-to-action

// Eases the section you *stopped* in to fill the viewport, but only after
// scrolling settles — it never intercepts an active scroll (so, unlike the
// old CSS scroll-snap, there's no scroll-jacking or keyboard trap, #413).
// The intro/terminal section isn't registered here, so stopping to read it
// is never yanked into the manifesto.
function snapToStoppedSection(refs: (HTMLElement | null)[]) {
  const vh = window.innerHeight;
  const viewportCenter = window.scrollY + vh / 2;
  for (const el of refs) {
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.height > vh + 4) continue; // taller than the viewport: can't center
    const top = rect.top + window.scrollY;
    if (viewportCenter < top || viewportCenter >= top + rect.height) continue;
    const target = top + rect.height / 2 - vh / 2;
    if (Math.abs(target - window.scrollY) > 3) {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
    return;
  }
}

// One shared observer drives both the reveal animation and the dot rail —
// `active` tracks whichever section is currently centered (for the dots),
// while `revealed` latches true the first time a section appears and never
// clears, so already-seen content stays revealed on scroll-away. Sections
// receive a `register` callback rather than the ref array itself, so they
// never mutate a value owned by the parent hook directly.
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
        setActive((prev) => {
          const next = [...prev];
          for (const entry of entries) {
            const i = refs.current.indexOf(entry.target as HTMLElement);
            if (i !== -1) next[i] = entry.isIntersecting;
          }
          return next;
        });
        setRevealed((prev) => {
          let changed = false;
          const next = [...prev];
          for (const entry of entries) {
            const i = refs.current.indexOf(entry.target as HTMLElement);
            if (i !== -1 && entry.isIntersecting && !next[i]) {
              next[i] = true;
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => snapToStoppedSection(refs.current), 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
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
      className={`manifesto-section min-h-screen snap-center flex flex-col justify-center items-center text-center px-6 py-10 ${revealed ? "in-view" : ""}`}
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
      className={`manifesto-section h-screen snap-center flex flex-col justify-center items-center text-center p-10 ${revealed ? "in-view" : ""}`}
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

// Purely a visual scroll-position affordance — the section headings already
// convey where you are, so this stays out of the accessibility tree rather
// than adding redundant, constantly-changing announcements.
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
    <div className="manifesto-gradient">
      {ideas.map((idea, i) => (
        <ManifestoSection
          key={idea.title}
          register={register(i)}
          revealed={revealed[i]}
          {...idea}
        />
      ))}
      <CallToActionSection
        register={register(ideas.length)}
        revealed={revealed[ideas.length]}
      />
      <ScrollDots active={active} />
    </div>
  );
}
