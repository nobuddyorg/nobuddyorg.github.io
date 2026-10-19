import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

const screenshots: ToolScreenshot[] = [
  {
    src: "trail.webp",
    alt: "A Trail at a Glance",
    text: "Pick a trail and see its caches on the map in walking order, with the number of caches, the walk's length and time, caches per hour, the nearest parking and a warning for caches with recent DNFs or maintenance requests. Export it as GPX for another navigation app.",
  },
  {
    src: "trails.webp",
    alt: "Your Pocket Query, Ranked",
    text: "Import a Pocket Query .zip or .gpx, or share it to the app from your phone. PowerTrailBuddy links caches that are close to each other, splits long chains into walks of the length you choose and ranks them by caches per hour. Set your own limits for difficulty, terrain, gaps and trail size, or pick a preset.",
  },
  {
    src: "walk.webp",
    alt: "Walk It Cache by Cache",
    text: "Start a guided walk from either end or any cache: the next cache with distance, a compass arrow and a \"you're close\" alert. Mark found, not found or skip, and export field notes to log the whole walk at once. Progress is kept if you close the app, and with walking routes on, distances follow real footpaths.",
  },
];

const techStack: TechStackItem[] = [
  { name: "Next.js", url: "https://nextjs.org/" },
  { name: "React", url: "https://react.dev/" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
  { name: "Leaflet", url: "https://leafletjs.com/" },
  { name: "OpenStreetMap", url: "https://www.openstreetmap.org/" },
  { name: "PWA", url: "https://web.dev/progressive-web-apps/" },
  { name: "Vitest", url: "https://vitest.dev/" },
  { name: "Playwright", url: "https://playwright.dev/" },
  { name: "Stryker", url: "https://stryker-mutator.io/" },
  { name: "GitHub Pages", url: "https://pages.github.com/" },
];

export default function PowerTrailBuddyClient({
  title,
  githubUrl,
  liveUrl,
}: {
  title: string;
  githubUrl: string;
  liveUrl?: string;
}) {
  return (
    <ToolClientPage
      title={title}
      githubUrl={githubUrl}
      liveUrl={liveUrl}
      githubLabel="PowerTrailBuddy GitHub"
      githubText="View the repository on GitHub"
      imageDir="/images/powertrail-buddy"
      screenshots={screenshots}
      media="image"
      techStack={techStack}
      description={
        <p><strong>PowerTrailBuddy</strong> finds the geocache power trails hiding in your own Geocaching.com Pocket Query and guides you through one on foot. It only reads files you downloaded yourself: no login, no server, no tracking. Install it on your phone, and it works offline with the map tiles you have viewed. Available in German and English. Not affiliated with Groundspeak / Geocaching HQ.</p>
      }
    />
  );
}
