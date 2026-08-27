"use client";

import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { GITHUB_URL } from "../constants";
import { prefersReducedMotion } from "../utils";
import Link from "next/link";

const SESSION_KEY = "terminalIntroPlayed";

const fadeInStyle = {
  animationDuration: "0.3s",
  "--fade-y": "0px",
} as CSSProperties;

const loadingSteps = [
  "[░░░░░░░░░░]",
  "[█░░░░░░░░░]",
  "[██░░░░░░░░]",
  "[███░░░░░░░]",
  "[████░░░░░░]",
  "[█████░░░░░]",
  "[██████░░░░]",
  "[███████░░░]",
  "[████████░░]",
  "[█████████░]",
  "[██████████]",
];

type ScriptLine = { text: string; role: "cmd" | "echo" | "output" };

const moreLoadingMessages = [
  "Untangling cables...",
  "Herding electrons...",
  "Befriending the firewall...",
  "Rebooting the universe...",
  "Brewing digital coffee...",
  "Conjuring random bugs...",
  "Aligning bits and bytes...",
  "Tuning flux capacitors...",
  "Negotiating with APIs...",
  "Painting rainbows in binary...",
  "Unpacking Schrödinger’s cat...",
  "Faking latency...",
  "Stirring the entropy pot...",
  "Decoding squirrel chatter...",
  "Reading error messages out loud...",
  "Compiling jokes...",
  "Feeding the gremlins...",
  "Pretending to work...",
  "Enabling sarcasm mode...",
  "Fuzzing the logic gates...",
];

const shuffled = [...moreLoadingMessages].sort(() => 0.5 - Math.random());
const [loadingMessage, msg1, msg2] = shuffled.slice(0, 3);

// Deterministic (no Math.random), unlike msg1/msg2/loadingMessage, so the
// ghost sizer below renders the same text on the server and the client —
// also a safe upper bound for its height.
const maxWidthPlaceholder = moreLoadingMessages.reduce((longest, msg) =>
  msg.length > longest.length ? msg : longest
);

type Frame = { lines: ScriptLine[]; delay: number };

// Each frame is a full snapshot of the terminal's lines plus a delay,
// so playback is a single "advance to the next frame" effect.
function buildFrames(): Frame[] {
  const frames: Frame[] = [{ lines: [], delay: 0 }];
  const last = () => frames[frames.length - 1].lines;
  const push = (line: ScriptLine, delay: number) =>
    frames.push({ lines: [...last(), line], delay });
  const pause = (delay: number) => frames.push({ lines: last(), delay });

  push({ role: "cmd", text: "nobuddy init" }, 700);
  push({ role: "echo", text: msg1 }, 500);
  push({ role: "echo", text: `${loadingMessage} ${loadingSteps[0]}` }, 0);
  for (let i = 1; i < loadingSteps.length; i++) {
    frames.push({
      lines: [
        ...last().slice(0, -1),
        { role: "echo", text: `${loadingMessage} ${loadingSteps[i]}` },
      ],
      delay: 80,
    });
  }
  pause(700);
  push({ role: "cmd", text: "sync nobuddy.org" }, 700);
  push({ role: "echo", text: msg2 }, 500);
  push({ role: "output", text: "↳ You’ve reached The Buddy Compendium." }, 500);
  return frames;
}

const frames = buildFrames();
const lastFrame = frames.length - 1;

// Same shape as frames[lastFrame].lines, with maxWidthPlaceholder instead
// of the random text.
const sizerLines: ScriptLine[] = [
  { role: "cmd", text: "nobuddy init" },
  { role: "echo", text: maxWidthPlaceholder },
  {
    role: "echo",
    text: `${maxWidthPlaceholder} ${loadingSteps[loadingSteps.length - 1]}`,
  },
  { role: "cmd", text: "sync nobuddy.org" },
  { role: "echo", text: maxWidthPlaceholder },
  { role: "output", text: "↳ You’ve reached The Buddy Compendium." },
];

function scrollToNextPage(button: HTMLElement) {
  const slider = button.closest<HTMLElement>(".manifesto-slider");
  if (!slider) return;
  slider.scrollBy({
    top: slider.clientHeight,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

function LineText({ line }: { line: ScriptLine }) {
  return (
    <>
      {line.role === "cmd" && (
        <>
          <span className="text-blue-400">nobuddy</span>
          <span className="text-purple-400"> /org/nobuddy: </span>
        </>
      )}
      {line.text}
    </>
  );
}

// Built once — sizerLines never changes after module load.
const sizerContent = sizerLines.map((line, i) => (
  <div key={i} className="whitespace-pre-wrap break-words">
    <LineText line={line} />
  </div>
));

function Hero() {
  return (
    <section
      className="relative pb-3 sm:pb-5 md:pb-6 max-w-4xl mx-auto px-4 md:px-6 text-center"
      aria-label="Introduction section"
    >
      <h1
        data-testid="hero-heading"
        className="relative z-10 font-mono text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-3 sm:mb-5 md:mb-4 text-black dark:text-white"
      >
        <span className="text-[var(--accent-hero)]">$</span> nobuddy init
        <span
          className="cmd-cursor text-[var(--accent-hero)]"
          aria-hidden="true"
        >
          _
        </span>
      </h1>

      <h2
        data-testid="hero-subtitle"
        className="block relative z-10 max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-neutral-800 dark:text-neutral-100 mb-4 sm:mb-6 md:mb-3"
      >
        Merge GPX tracks. Load-test at scale. Wallpaper your board game
        shelf. Open source, mildly overengineered, built for fun.
      </h2>

      {/* Hidden on mobile: header already has a GitHub link. */}
      <Link
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-block relative z-10 bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-2.5 md:px-8 md:py-3 text-sm sm:text-base rounded-full shadow-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition"
        aria-label="Follow Nobuddyorg on GitHub"
        title="follow on github"
      >
        Follow on GitHub
      </Link>
    </section>
  );
}

function TerminalIntro({ active }: { active: boolean }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const scrollHintRef = useRef<HTMLButtonElement>(null);

  // useLayoutEffect: resolves before first paint. sessionStorage isn't
  // available during SSR, so this can't be a lazy useState initializer.
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sessionStorage.getItem(SESSION_KEY)) setFrameIndex(lastFrame);
  }, []);

  useEffect(() => {
    if (frameIndex >= lastFrame) return;
    const t = setTimeout(
      () => setFrameIndex((i) => i + 1),
      frames[frameIndex + 1].delay
    );
    return () => clearTimeout(t);
  }, [frameIndex]);

  // Click or keypress anywhere skips straight to the finished state.
  useEffect(() => {
    const skip = () => setFrameIndex(lastFrame);
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useEffect(() => {
    if (frameIndex === lastFrame) sessionStorage.setItem(SESSION_KEY, "1");
  }, [frameIndex]);

  const { lines } = frames[frameIndex];
  const isWaiting = frameIndex === lastFrame;
  const showHint = active && isWaiting;

  // Move focus off the button before it becomes aria-hidden/unfocusable.
  useEffect(() => {
    if (!showHint) scrollHintRef.current?.blur();
  }, [showHint]);

  return (
    <div className="flex flex-col items-center px-4 pt-20 md:pt-28 pb-14 sm:pb-16 md:pb-20">
      <Hero />

      <div
        data-testid="terminal-window"
        className="w-full max-w-3xl mb-6 sm:mb-8 md:mb-6 rounded-lg overflow-clip shadow-lg border border-neutral-800 bg-[#1a1a1a]"
      >
        <div className="flex items-center space-x-2 px-3 py-2 bg-[#2d2d2d] border-b border-neutral-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Stacked via grid so the box's height comes from the (fixed-size)
            sizer, not the growing real content. */}
        <div className="grid py-5 sm:py-8 md:py-4 px-4 sm:px-5 md:px-6 font-mono text-green-400 text-xs sm:text-base md:text-lg bg-[#1a1a1a] text-left">
          <div aria-hidden="true" className="invisible [grid-area:1/1]">
            {sizerContent}
            <div className="mt-8">Scroll down to continue...</div>
          </div>

          <div className="[grid-area:1/1]" data-testid="terminal-output">
            {lines.map((line, i) => (
              <div
                key={i}
                className="fade-in-up whitespace-pre-wrap break-words"
                style={fadeInStyle}
              >
                <LineText line={line} />
              </div>
            ))}
            {isWaiting && (
              <div className="fade-in-up mt-8" style={fadeInStyle}>
                <span className="text-yellow-400 animate-pulse motion-reduce:animate-none">
                  Scroll down to continue...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed, so it costs nothing in the padding budget above. Only
          shown while `active` (this page is in view) — see globals.css's
          .scroll-hint rule for the rest. */}
      <button
        ref={scrollHintRef}
        type="button"
        onClick={(e) => scrollToNextPage(e.currentTarget)}
        aria-label="Scroll to the next page"
        aria-hidden={!showHint}
        tabIndex={showHint ? 0 : -1}
        data-testid="scroll-hint"
        className={`scroll-hint fixed bottom-14 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black shadow-lg hover:bg-gray-900 dark:hover:bg-gray-100 ${showHint ? "" : "scroll-hint-hidden"}`}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}

// Memoized: the parent re-renders on every section's scroll transition,
// not just this one.
export default memo(TerminalIntro);
