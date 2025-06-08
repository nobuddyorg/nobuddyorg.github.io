"use client";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-400 dark:text-gray-600 px-4 sm:px-6">
            <p>
                Crafted with ♥️ by{" "}
                <a
                    href="https://nobuddy.org"
                    target="_blank"
                    rel="noopener"
                    className="underline hover:text-black transition"
                >
                    nobuddy
                </a>{" "}
                • Open source on{" "}
                <a
                    href="https://github.com/nobuddyorg"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-black transition"
                >
                    GitHub
                </a>
            </p>
        </footer>
    );
}
