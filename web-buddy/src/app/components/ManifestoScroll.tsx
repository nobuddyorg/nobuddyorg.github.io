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

// Distance (as a fraction of the viewport) a scroll must cover away from
// the current page before it commits to the adjacent one. Small enough that
// one ordinary scroll gesture flips a whole page — the "page scroll" feel —
// without a tiny nudge accidentally triggering it.
const PAGE_COMMIT = 0.2;

// Snaps one page per gesture, but only after scrolling settles — it never
// intercepts an active scroll (so, unlike the old CSS scroll-snap, there's
// no scroll-jacking or keyboard trap, #413). Anchored on the page you last
// landed on: a modest scroll in either direction commits to the neighbour,
// a big fling lands on the nearest. The intro/terminal section isn't a page
// here, so stopping to read it is never yanked into the manifesto.
function pageSnap(refs: (HTMLElement | null)[], pageRef: { current: number }) {
  const vh = window.innerHeight;
  const y = window.scrollY;

  // Scroll position at which each section is centered in the viewport.
  const tops = refs.map((el) => {
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.height > vh * 1.5) return null; // too tall to page cleanly
    return rect.top + y + rect.height / 2 - vh / 2;
  });

  const firstTop = tops.find((t): t is number => t != null);
  if (firstTop === undefined) return;

  // Still up in the intro/terminal: leave scrolling completely free.
  if (y < firstTop - vh * 0.5) {
    pageRef.current = -1;
    return;
  }

  let nearest = -1;
  let nearestDist = Infinity;
  tops.forEach((t, i) => {
    if (t == null) return;
    const dist = Math.abs(t - y);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = i;
    }
  });

  let target = nearest;
  const cur = pageRef.current;
  const curTop = cur >= 0 ? tops[cur] : null;
  if (curTop != null && Math.abs(y - curTop) <= vh * 1.2) {
    const delta = y - curTop;
    if (delta > vh * PAGE_COMMIT && cur + 1 < tops.length && tops[cur + 1] != null) {
      target = cur + 1;
    } else if (delta < -vh * PAGE_COMMIT && cur - 1 >= 0 && tops[cur - 1] != null) {
      target = cur - 1;
    } else {
      target = cur;
    }
  }
  if (target < 0) return;

  pageRef.current = target;
  const ty = tops[target];
  if (ty != null && Math.abs(ty - y) > 3) {
    window.scrollTo({ top: ty, behavior: "smooth" });
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
    const pageRef = { current: -1 };
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => pageSnap(refs.current, pageRef), 120);
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
