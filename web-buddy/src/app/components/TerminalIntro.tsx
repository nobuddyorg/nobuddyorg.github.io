"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import type { CSSProperties } from "react";
import { SITE_NAME, GITHUB_URL, SITE_DESCRIPTION } from "../constants";
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

type Frame = { lines: ScriptLine[]; delay: number };

// Each frame is a full snapshot of the terminal's lines plus how long to
// wait before showing it — flattening the whole "type a line, tick the
// loading bar, pause, type the next line" choreography into one linear
// list turns the old phase/lineIndex/loadingIndex state machine (four
// separate effects) into a single "advance to the next frame" effect.
function buildFrames(): Frame[] {
  const frames: Frame[] = [{ lines: [], delay: 0 }];
  const last = () => frames[frames.length - 1].lines;
  const push = (line: ScriptLine, delay: number) =>
    frames.push({ lines: [...last(), line], delay });
  const pause = (delay: number) => frames.push({ lines: last(), delay });

  push({ role: "cmd", text: "initialize --buddyverse" }, 700);
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

// Both hints at and performs the page-by-page snap scroll, so the
// paging behavior itself is discoverable (#544) rather than something a
// visitor has to stumble into via a wheel gesture.
function scrollToNextPage(button: HTMLElement) {
  const slider = button.closest<HTMLElement>(".manifesto-slider");
  if (!slider) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  slider.scrollBy({
    top: slider.clientHeight,
    behavior: reduceMotion ? "auto" : "smooth",
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

function Hero() {
  return (
    <section
      className="relative pb-3 sm:pb-5 md:pb-8 max-w-4xl mx-auto px-4 md:px-6 text-center"
      aria-label="Introduction section"
    >
      <h1 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-2 sm:mb-4 md:mb-4 text-black dark:text-white">
        {SITE_NAME}
      </h1>

      <h2 className="block relative z-10 max-w-3xl mx-auto text-sm sm:text-lg md:text-xl text-neutral-800 dark:text-neutral-100 mb-4 sm:mb-6 md:mb-4">
        {SITE_DESCRIPTION}
      </h2>

      {/* Skipped on mobile portrait: the intro is already tight on
          vertical space there, and this action is one tap away in the
          header's own GitHub link. */}
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

export default function TerminalIntro({ active }: { active: boolean }) {
  const [frameIndex, setFrameIndex] = useState(0);

  // Render the completed terminal instantly on repeat visits within the
  // same session instead of replaying the ~4s typing animation every time.
  // useLayoutEffect (not useEffect) so this resolves before the browser
  // paints the empty, server-rendered terminal.
  // Must run post-mount (sessionStorage doesn't exist during SSR); a lazy
  // useState initializer would run on the server too and mismatch on
  // hydration.
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

  // A click or keypress anywhere fast-forwards straight to the finished
  // state instead of forcing visitors to sit through the whole animation.
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

  return (
    <div className="flex flex-col items-center px-4 pt-16 sm:pt-20 md:pt-20">
      <Hero />

      <div className="w-full max-w-3xl mb-6 sm:mb-8 md:mb-6 rounded-lg overflow-clip shadow-lg border border-neutral-800 bg-[#1a1a1a]">
        <div className="flex items-center space-x-2 px-3 py-2 bg-[#2d2d2d] border-b border-neutral-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* grid + the same [grid-area:1/1] on both children stacks them in
            one cell, so the box's height comes from the invisible sizer
            (always the complete transcript) rather than the real content —
            which is what's growing line by line. Without this, the box
            visibly grows throughout the whole typing animation, not just
            at the final line. */}
        <div className="grid py-5 sm:py-8 md:py-6 px-4 sm:px-5 md:px-6 font-mono text-green-400 text-xs sm:text-base md:text-lg bg-[#1a1a1a] text-left">
          <div aria-hidden="true" className="invisible [grid-area:1/1]">
            {frames[lastFrame].lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                <LineText line={line} />
              </div>
            ))}
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

      {/* Fixed to the viewport, not anchored below the terminal: the
          intro's own content height is already tuned right up against
          the footer-clearance budget every viewport size has to fit
          within (#541/#546/#548), so anything that adds to *that* flow
          re-blows the budget on shorter viewports (confirmed: broke it
          again at 1280x720 — Playwright's own default test viewport —
          on the first attempt). A fixed position costs nothing in that
          budget regardless of content height. Gated on `active` (this
          page is the one currently in view) so it doesn't stay pinned on
          screen once scrolled past the intro. */}
      <button
        type="button"
        onClick={(e) => scrollToNextPage(e.currentTarget)}
        aria-label="Scroll to the next page"
        className={`scroll-hint fixed bottom-14 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 ${active && isWaiting ? "fade-in-up" : "invisible"}`}
        style={fadeInStyle}
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
