import type { CSSProperties } from "react";
import Image from "next/image";
import ToolPageShell from "../../components/ToolPageShell";
import ToolTechStack, { TechStackItem } from "../../components/ToolTechStack";

const preview = {
  src: "/images/gamegallery-buddy/preview.webp",
  alt: "Board game wallpaper preview",
  text: "GameGalleryBuddy creates a beautiful wallpaper using all board games from your BoardGameGeek collection. Just enter your BGG username and enjoy a personalized background!",
};

const techStack: TechStackItem[] = [
  { name: "BoardGameGeek", url: "https://boardgamegeek.com/" },
  { name: "Groovy", url: "https://groovy-lang.org/" },
  { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
  { name: "Gradle", url: "https://gradle.org/" },
];

export default function GameGalleryBuddyClient({
  title,
  githubUrl,
}: {
  title: string;
  githubUrl: string;
}) {
  return (
    <ToolPageShell title={title}>
      <div
        className="fade-in-up mb-12 rounded-xl overflow-hidden shadow-lg"
        style={
          { animationDuration: "0.8s", "--fade-y": "30px" } as CSSProperties
        }
      >
        <Image
          src={preview.src}
          alt={preview.alt}
          width={1200}
          height={600}
          className="w-full h-auto rounded-xl"
        />
      </div>

      <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
        <p>
          <strong>GameGalleryBuddy</strong> turns your board game collection
          into a wallpaper. Just enter your BoardGameGeek username and
          customize the layout: choose cover size, show or hide names, shuffle
          the order, and more.
        </p>
        <p>
          Requires a tiny bit of dev experience to run locally, but everything
          is explained in the README file.
        </p>
        <Image
          src={`/images/gamegallery-buddy/powered-by-bgg.webp`}
          alt="powered by bgg"
          width={1200}
          height={352}
          className="w-full h-auto rounded-xl"
        />
        <p>
          🔗{" "}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black dark:hover:text-white"
            title="game gallery github"
          >
            View the code on GitHub or run it locally
          </a>
        </p>
      </section>
      <ToolTechStack items={techStack} />
    </ToolPageShell>
  );
}
