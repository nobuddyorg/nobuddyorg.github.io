"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { tools } from "./tools";

const MotionLink = motion(Link); 

function Hero() {
    return (
        <section className="relative pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 text-center overflow-hidden">
            <svg
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] opacity-100 pointer-events-none"
                viewBox="0 0 528 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="71" cy="61" r="111" className="fill-[#FCFAFF] dark:fill-[#1e1b4b]" />
                <circle cx="244" cy="106" r="139" className="fill-[#F9F0FF] dark:fill-[#312e81]" />
                <circle cx="400" cy="150" r="139" className="fill-[#EEE4FE] dark:fill-[#3730a3]" />
                <circle cx="316" cy="305" r="139" className="fill-[#DDD6FE] dark:fill-[#4f46e5]" />
                <circle cx="170" cy="319" r="139" className="fill-[#CABFFD] dark:fill-[#6366f1]" />
            </svg>

            <h1 className="relative z-10 text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-black dark:text-white">
                The Buddy Compendium
            </h1>
            <h2 className="relative z-10 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-200 mb-8">
                Blending quirky charm with real-world usefulness for {'\'everybuddy\''}
            </h2>
            <Link
                href="https://github.com/nobuddyorg"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-block bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-900 transition"
            >
                Follow on GitHub
            </Link>
        </section>
    );
}

function ToolGrid() {
    return (
        <section
            id="tools"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 mb-28"
        >
            {tools.map((tool, index) => {
                const isReady = tool.status === "ready";

                const cardClasses = `group block rounded-2xl p-6 border ${
                    isReady
                        ? "bg-white dark:bg-black border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white shadow-sm dark:shadow-[0_2px_8px_rgba(255,255,255,0.05)] hover:shadow-md dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        : "bg-gray-100 dark:bg-neutral-900 border-gray-200 dark:border-neutral-950 opacity-60 cursor-not-allowed"
                }`;

                const cardInner = (
                    <>
                        <div className="flex items-center gap-4 mb-4" data-testid={tool.status}>
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
                            <h3 className="text-lg font-semibold transition group-hover:text-black dark:group-hover:text-white">
                                {tool.name}
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
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                        >
                            <MotionLink href={`/tools/${tool.slug}`} className={cardClasses}>
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
        </section>
    );
}

export default function ClientHome() {
    return (
        <>
            <Hero />
            <ToolGrid />
        </>
    );
}
