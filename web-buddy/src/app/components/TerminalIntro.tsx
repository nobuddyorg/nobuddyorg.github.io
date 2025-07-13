"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SITE_NAME, GITHUB_URL } from "../globals";
import Link from "next/link";

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
  { role: "echo", text: `${loadingMessage} ${loadingSteps[0]}` },
  { role: "cmd", text: "sync nobuddy.org" },
  { role: "echo", text: msg1 },
  { role: "echo", text: msg2 },
  { role: "output", text: "↳ You’ve reached The Buddy Compendium." },
];

type Phase = "lines" | "loading" | "wait";

function Hero() {
  return (
    <section
      className="relative pt-23 pb-20 max-w-4xl mx-auto px-4 sm:px-6 text-center"
      aria-label="Introduction section"
    >
      <h1 className="relative z-10 text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-black dark:text-white">
        {SITE_NAME}
      </h1>
      <h2 className="relative z-10 max-w-3xl mx-auto text-lg sm:text-xl text-neutral-750 dark:text-neutral-150 mb-8">
        NoBuddy is your gateway into a universe of useful, and either brilliant
        or useless tools. Built as a personal playground of code and curiosity,
        it’s a place where ideas go to have fun: from apps that help you
        procrastinate more creatively, to utilities that merge GPS tracks or
        generate wallpapers from your board game shelf.
      </h2>
      <Link
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 inline-block bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-900 transition"
        aria-label="Follow Nobuddyorg on GitHub"
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

  const appendLine = useCallback((line: ScriptLine) => {
    setLines((prev) => [...prev, line]);
  }, []);

  useEffect(() => {
    if (phase === "lines" && lineIndex < scriptLines.length) {
      const current = scriptLines[lineIndex];

      if (current.text.startsWith(loadingMessage)) {
        appendLine(current);
        setPhase("loading");
        return;
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
      setPhase("wait");
    }
  }, [phase, lineIndex, loadingIndex, appendLine]);

  return (
    <div className="flex flex-col items-center px-4 pt-12">
      <Hero />

      <div className="w-full max-w-3xl min-h-[400px] rounded-lg overflow-clip shadow-lg border border-neutral-800 bg-[#1a1a1a] mb-10">
        <div className="flex items-center space-x-2 px-3 py-2 bg-[#2d2d2d] border-b border-neutral-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <div className="py-12 px-6 font-mono text-green-400 text-lg bg-[#1a1a1a] text-left">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-pre"
            >
              {line.role === "cmd" && (
                <>
                  <span className="text-blue-400">nobuddy</span>
                  <span className="text-purple-400"> /org/nobuddy: </span>
                </>
              )}
              {line.text}
            </motion.div>
          ))}
          {phase === "wait" && (
            <motion.div
              className="mt-8 text-yellow-400 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Scroll down to continue...
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
