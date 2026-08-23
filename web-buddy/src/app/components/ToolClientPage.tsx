import type { ReactNode } from "react";
import ToolPageShell from "./ToolPageShell";
import ToolScreenshots, { ToolScreenshot } from "./ToolScreenshots";
import ToolTechStack, { TechStackItem } from "./ToolTechStack";

interface ToolClientPageProps {
  title: string;
  githubUrl: string;
  githubLabel: string;
  githubText: string;
  description: ReactNode;
  imageDir: string;
  screenshots: ToolScreenshot[];
  media: "image" | "video";
  techStack: TechStackItem[];
}

export default function ToolClientPage({
  title,
  githubUrl,
  githubLabel,
  githubText,
  description,
  imageDir,
  screenshots,
  media,
  techStack,
}: ToolClientPageProps) {
  return (
    <ToolPageShell title={title}>
      <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {description}
        <br />
        <p>
          🔗{" "}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black dark:hover:text-white"
            title={githubLabel}
          >
            {githubText}
          </a>
        </p>
      </section>
      <ToolScreenshots
        screenshots={screenshots}
        imageDir={imageDir}
        media={media}
      />
      <ToolTechStack items={techStack} />
    </ToolPageShell>
  );
}
