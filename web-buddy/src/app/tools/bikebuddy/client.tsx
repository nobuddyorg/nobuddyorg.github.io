import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

const imageDir = "/images/bike-buddy";

const screenshots: ToolScreenshot[] = [
  {
    src: "map.webp",
    alt: "Heatmap Overview",
    text: "See every tour you've ever ridden on a single heatmap, with cycling and motorcycling routes color-blended by frequency. Filter to what's currently in view, toggle photo pins, and jump straight into any tour from the sidebar.",
  },
  {
    src: "upload.webp",
    alt: "Upload a GPX Tour",
    text: "Drag and drop a .gpx file straight from your bike computer or phone, give it a name and optional description, and Bike Buddy takes care of the rest, parsing the track and adding it to your heatmap in seconds.",
  },
  {
    src: "detail.webp",
    alt: "Tour Details & Photos",
    text: "Every tour keeps its date, distance, and a gallery of photos you attach along the way. Drop in JPEGs or PNGs to pin memories to the ride, or edit and delete tours as your archive grows.",
  },
];

const techStack: TechStackItem[] = [
  { name: "Azure Functions", url: "https://azure.microsoft.com/en-us/products/functions" },
  { name: "Cosmos DB", url: "https://azure.microsoft.com/en-us/products/cosmos-db" },
  { name: "Azure Blob Storage", url: "https://azure.microsoft.com/en-us/products/storage/blobs" },
  { name: "Leaflet", url: "https://leafletjs.com/" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "OpenTofu", url: "https://opentofu.org/" },
  { name: "Docker", url: "https://www.docker.com/" },
  { name: "GitHub Pages", url: "https://pages.github.com/" },
];

export default function BikeBuddyClient({
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
      githubLabel="BikeBuddy GitHub"
      githubText="View the repository on GitHub"
      imageDir={imageDir}
      screenshots={screenshots}
      media="image"
      techStack={techStack}
      description={
        <p><strong>BikeBuddy</strong> turns your GPX tours, cycling or motorcycling, into a living heatmap of every road you&apos;ve ever ridden. Upload a track, attach photos from along the way, and watch your personal riding history build up on the map.</p>
      }
    />
  );
}
