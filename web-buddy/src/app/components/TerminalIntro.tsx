"use client";

import { useEffect, useLayoutEffect, useState, useCallback } from "react";
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

type ScriptLine = {
  text: string;
  role: "cmd" | "echo" | "output";
};

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

const scriptLines: ScriptLine[] = [
  { role: "cmd", text: "initialize --buddyverse" },
  { role: "echo", text: msg1 },
  { role: "echo", text: `${loadingMessage} ${loadingSteps[0]}` },
  { role: "cmd", text: "sync nobuddy.org" },
  { role: "echo", text: msg2 },
  { role: "output", text: "↳ You’ve reached The Buddy Compendium." },
];

function buildCompletedLines(): ScriptLine[] {
  return scriptLines.map((line) =>
    line.text.startsWith(loadingMessage)
      ? { ...line, text: `${loadingMessage} ${loadingSteps[loadingSteps.length - 1]}` }
      : line
  );
}

type Phase = "lines" | "loading" | "wait";

function Hero() {
  return (
    <section
      className="relative pb-5 md:pb-20 max-w-4xl mx-auto px-4 md:px-6 text-center"
      aria-label="Introduction section"
    >
      <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 md:mb-6 text-black dark:text-white">
        {SITE_NAME}
      </h1>

      <h2 className="block relative z-10 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-200 mb-6 md:mb-8">
        {SITE_DESCRIPTION}
      </h2>

      <Link
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block relative z-10 bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-2.5 md:px-8 md:py-3 text-sm sm:text-base rounded-full shadow-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition"
        aria-label="Follow Nobuddyorg on GitHub"
        title="follow on github"
      >
        Follow on GitHub
      </Link>
    </section>
  );
}

export default function TerminalIntro() {
  const [lines, setLines] = useState<ScriptLine[]>([]);
  const [phase, setPhase] = useState<Phase>("lines");
  const [lineIndex, setLineIndex] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [skipAnimation, setSkipAnimation] = useState(false);

  const appendLine = useCallback((line: ScriptLine) => {
    setLines((prev) => [...prev, line]);
  }, []);

  const finishNow = useCallback(() => {
    setSkipAnimation(true);
    setLines(buildCompletedLines());
    setLineIndex(scriptLines.length);
    setLoadingIndex(loadingSteps.length - 1);
    setPhase("wait");
  }, []);

  // Render the completed terminal instantly on repeat visits within the
  // same session instead of replaying the ~5s typing animation every time.
  // useLayoutEffect (not useEffect) so this resolves before the browser
  // paints the empty, server-rendered terminal.
  useLayoutEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      finishNow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A click or keypress anywhere fast-forwards straight to the finished
  // state instead of forcing visitors to sit through the whole animation.
  useEffect(() => {
    if (skipAnimation) return;
    const handleSkip = () => finishNow();
    window.addEventListener("click", handleSkip);
    window.addEventListener("keydown", handleSkip);
    return () => {
      window.removeEventListener("click", handleSkip);
      window.removeEventListener("keydown", handleSkip);
    };
  }, [skipAnimation, finishNow]);

  useEffect(() => {
    if (phase === "wait") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [phase]);

  useEffect(() => {
    if (skipAnimation) return;

    if (phase === "lines" && lineIndex < scriptLines.length) {
      const current = scriptLines[lineIndex];

      if (current.text.startsWith(loadingMessage)) {
        const t = setTimeout(() => {
          appendLine(current);
          setPhase("loading");
        }, 0);
        return () => clearTimeout(t);
      }

      const delay = current.role === "cmd" ? 700 : 500;
      const t = setTimeout(() => {
        appendLine(current);
        setLineIndex((i) => i + 1);
      }, delay);
      return () => clearTimeout(t);
    }

    if (phase === "loading" && loadingIndex < loadingSteps.length - 1) {
      const t = setTimeout(() => {
        setLines((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            text: `${loadingMessage} ${loadingSteps[loadingIndex + 1]}`,
          };
          return copy;
        });
        setLoadingIndex((i) => i + 1);
      }, 80);
      return () => clearTimeout(t);
    }

    if (phase === "loading" && loadingIndex === loadingSteps.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setPhase("lines");
      }, 700);
      return () => clearTimeout(t);
    }

    if (phase === "lines" && lineIndex === scriptLines.length) {
      const t = setTimeout(() => setPhase("wait"), 0);
      return () => clearTimeout(t);
    }
  }, [phase, lineIndex, loadingIndex, appendLine, skipAnimation]);

  return (
    <div className="flex flex-col items-center px-4 pt-20 md:pt-32">
      <Hero />

      <div className="w-full max-w-3xl min-h-[340px] rounded-lg overflow-clip shadow-lg border border-neutral-800 bg-[#1a1a1a] mb-10">
        <div className="flex items-center space-x-2 px-3 py-2 bg-[#2d2d2d] border-b border-neutral-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <div className="py-10 px-6 font-mono text-green-400 text-lg bg-[#1a1a1a] text-left">
          {lines.map((line, i) => (
            <div key={i} className="fade-in-up whitespace-pre" style={fadeInStyle}>
              {line.role === "cmd" && (
                <>
                  <span className="text-blue-400">nobuddy</span>
                  <span className="text-purple-400"> /org/nobuddy: </span>
                </>
              )}
              {line.text}
            </div>
          ))}
          {phase === "wait" && (
            <div className="fade-in-up mt-8" style={fadeInStyle}>
              <span className="text-yellow-400 animate-pulse motion-reduce:animate-none">
                Scroll down to continue...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
