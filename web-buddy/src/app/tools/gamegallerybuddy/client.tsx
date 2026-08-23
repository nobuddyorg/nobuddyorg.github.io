import Image from "next/image";
import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

const imageDir = "/images/gamegallery-buddy";

const screenshots: ToolScreenshot[] = [
  {
    src: "start-page.webp",
    alt: "Collection Form",
    text: "Enter a BoardGameGeek username and dial in cover size, overflow, and repeat passes. Toggle name overlays, BGG links, shuffle order, and whether to include previously owned games. Every option doubles as a /collection query parameter, so a specific look can be bookmarked or shared directly.",
  },
  {
    src: "sample-wallpaper.webp",
    alt: "Generated Wallpaper",
    text: "Every game in the collection tiled edge-to-edge into a single wallpaper. Hover the top-right corner on this page to reveal a settings icon and tweak the same options in place, or head back to the start page for a different username.",
  },
];

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
    <ToolClientPage
      title={title}
      githubUrl={githubUrl}
      githubLabel="game gallery github"
      githubText="View the code on GitHub or run it locally"
      imageDir={imageDir}
      screenshots={screenshots}
      media="image"
      techStack={techStack}
      description={
        <>
          <p>
            <strong>GameGalleryBuddy</strong> turns your board game
            collection into a wallpaper. Just enter your BoardGameGeek
            username and customize the layout: choose cover size, show or
            hide names, shuffle the order, and more.
          </p>
          <p>
            Requires a tiny bit of dev experience to run locally, but
            everything is explained in the README file.
          </p>
          <Image
            src={`${imageDir}/powered-by-bgg.webp`}
            alt="Powered by BGG"
            width={140}
            height={41}
            className="h-auto"
          />
        </>
      }
    />
  );
}
