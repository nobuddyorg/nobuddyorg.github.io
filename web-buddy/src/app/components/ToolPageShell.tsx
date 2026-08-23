import BuddyName from "./BuddyName";

export default function ToolPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-16 md:pt-20 pb-28 px-4 sm:px-6 page-band">
      <div className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-10 border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-xl">
        <h1
          data-testid="tool-heading"
          className="font-mono text-2xl sm:text-3xl font-bold text-black dark:text-white mb-10 text-center"
        >
          <span className="text-accent">$</span>{" "}
          <span className="lowercase">
            <BuddyName name={title} />
          </span>
          <span className="cmd-cursor text-accent" aria-hidden="true">
            _
          </span>
        </h1>
        {children}
      </div>
    </main>
  );
}
