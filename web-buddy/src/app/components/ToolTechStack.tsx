export interface TechStackItem {
  name: string;
  url: string;
}

export default function ToolTechStack({ items }: { items: TechStackItem[] }) {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
        Tech Stack
      </h2>
      <ul className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 dark:text-gray-300">
        {items.map(({ name, url }) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black dark:hover:text-white"
              title={name}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
