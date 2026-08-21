import BuddyName from "./BuddyName";

export default function ToolPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-36 pb-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-10 border bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 shadow-xl">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-10 text-center">
          <BuddyName name={title} />
        </h1>
        {children}
      </div>
    </main>
  );
}
