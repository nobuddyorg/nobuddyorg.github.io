"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { tools } from "../tools/tools";
import { useState, useEffect } from "react";
import BuddyName from "./BuddyName";

export const ITEMS_PER_PAGE = 6;

function toFlag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function staggerStyle(index: number): CSSProperties {
  return {
    animationDuration: "0.4s",
    animationDelay: `${index * 0.05}s`,
    "--fade-y": "20px",
  } as CSSProperties;
}

export default function ToolGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [renderedPage, setRenderedPage] = useState(1);

  useEffect(() => {
    const id = setTimeout(() => setRenderedPage(currentPage), 0);
    return () => clearTimeout(id);
  }, [currentPage]);

  const totalPages = Math.ceil(tools.length / ITEMS_PER_PAGE);
  const paginatedTools = tools.slice(
    (renderedPage - 1) * ITEMS_PER_PAGE,
    renderedPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="relative pt-20 md:pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1
            data-testid="tools-heading"
            className="text-center relative z-10 font-mono text-xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-black dark:text-white"
          >
            <span className="text-accent">$</span> nobuddy tools --list
            <span className="cmd-cursor text-accent" aria-hidden="true">
              _
            </span>
          </h1>
          <h2 className="text-center relative z-10 max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-200 mb-4 md:mb-8">
            Blending quirky charm with real-world usefulness for {"'everybuddy'"}
          </h2>
        </div>
      </div>
      <div className="relative pt-4 md:pt-6 pb-6">
        <section
          id="tools"
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6"
        >
          {paginatedTools.map((tool, index) => {
            const isReady = tool.status === "ready";

            const cardClasses = `group flex flex-col h-full rounded-2xl overflow-hidden border ${
              isReady
                ? "bg-white dark:bg-black border-1 border-neutral-400 dark:border-neutral-600 hover:border-black dark:hover:border-white shadow-sm dark:shadow-[0_2px_8px_rgba(255,255,255,0.05)] hover:shadow-md dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                : "bg-gray-200 dark:bg-neutral-800 border-neutral-600 border-dashed border-2 dark:border-neutral-400 dark:border-2 dark:border-dashed hover:border-black dark:hover:border-white transition-colors duration-300 cursor-pointer"
            }`;

            const cardInner = (
              <>
                <div
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#2d2d2d] border-b border-neutral-700"
                  data-testid={tool.status}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span
                    className={`ml-auto flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide ${
                      isReady ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isReady
                          ? "bg-emerald-400"
                          : "bg-amber-400 animate-pulse motion-reduce:animate-none"
                      }`}
                      aria-hidden="true"
                    />
                    {isReady ? "ready" : "building"}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-inner ${
                        tool.status !== "ready" ? "grayscale opacity-60" : ""
                      }`}
                    >
                      {tool.logo ? (
                        <Image
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-500">
                          {tool.name[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-mono font-semibold lowercase transition group-hover:text-black dark:group-hover:text-white flex items-baseline gap-1.5">
                      <span
                        className="text-neutral-400 dark:text-neutral-500 normal-case"
                        aria-hidden="true"
                      >
                        $
                      </span>
                      <BuddyName name={tool.name} />
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    {tool.tags.map((tag) => (
                      <span key={tag}>--{toFlag(tag)}</span>
                    ))}
                  </div>
                </div>
              </>
            );

            return (
              <div key={tool.slug} className="fade-in-up h-full" style={staggerStyle(index)}>
                {isReady ? (
                  <Link href={`/tools/${tool.slug}`} className={cardClasses}>
                    {cardInner}
                  </Link>
                ) : (
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClasses}
                    aria-label={`${tool.name} — in progress, view repository on GitHub`}
                  >
                    {cardInner}
                  </a>
                )}
              </div>
            );
          })}
          <div
            key={`page-bar-${currentPage}`}
            className="fade-in-up col-span-full"
            style={
              { animationDuration: "0.4s", "--fade-y": "20px" } as CSSProperties
            }
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </div>
    </>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav
      aria-label="Tools pagination"
      className="w-fit mx-auto rounded-2xl p-4 border bg-white/60 dark:bg-black/60 border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-[0_2px_8px_rgba(255,255,255,0.05)] backdrop-blur-sm"
    >
      <div className="flex justify-center gap-2 items-center text-sm">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:pointer-events-none"
        >
          ◀
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={`px-3 py-1 rounded-full transition ${
              page === currentPage
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-black ring-2 ring-black dark:ring-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:pointer-events-none"
        >
          ▶
        </button>
      </div>
    </nav>
  );
}
