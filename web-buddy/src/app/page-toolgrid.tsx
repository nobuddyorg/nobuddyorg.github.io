"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { tools } from "./tools";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 6;

const MotionLink = motion(Link);

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
      <section
        id="tools"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 mb-28"
      >
        {paginatedTools.map((tool, index) => {
          const isReady = tool.status === "ready";

          const cardClasses = `group block rounded-2xl p-6 border ${
            isReady
              ? "bg-white dark:bg-black border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white shadow-sm dark:shadow-[0_2px_8px_rgba(255,255,255,0.05)] hover:shadow-md dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              : "bg-gray-100 dark:bg-neutral-900 border-gray-200 dark:border-neutral-950 opacity-60 cursor-not-allowed"
          }`;

          const cardInner = (
            <>
              <div
                className="flex items-center gap-4 mb-4"
                data-testid={tool.status}
              >
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-inner">
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
                <h3 className="text-lg font-semibold transition group-hover:text-black dark:group-hover:text-white flex items-center gap-1">
                  {tool.name}
                  {tool.status !== "ready" && (
                    <span
                      className="grayscale text-lg"
                      role="img"
                      aria-label="under construction"
                    >
                      🏗️🚧
                    </span>
                  )}
                </h3>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {tool.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {(tool.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          );

          if (isReady) {
            return (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                }}
              >
                <MotionLink
                  href={`/tools/${tool.slug}`}
                  className={cardClasses}
                >
                  {cardInner}
                </MotionLink>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={cardClasses}
            >
              {cardInner}
            </motion.div>
          );
        })}
        <motion.div
          key={`page-bar-${currentPage}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="col-span-full"
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </motion.div>
      </section>
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
    <div className="w-fit mx-auto mt-0 rounded-2xl p-4 border bg-white/60 dark:bg-black/60 border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-[0_2px_8px_rgba(255,255,255,0.05)] backdrop-blur-sm">
      <div className="flex justify-center gap-2 items-center text-sm">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40"
        >
          ◀
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
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
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
