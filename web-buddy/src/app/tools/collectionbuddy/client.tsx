import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

const imageDir = "/images/collection-buddy";

const screenshots: ToolScreenshot[] = [
  {
    src: "login",
    alt: "Secure Authentication",
    text: "Get started with secure authentication powered by Supabase and Google OAuth. Sign up or log in with ease to access your personal collection catalog. Your data is protected and always available when you need it. No need to share any details, just use your existing Google Account",
  },
  {
    src: "preview",
    alt: "Collection Overview",
    text: "View your entire collection at a glance with beautiful card layouts. Each item displays essential information like title, descriptions, location, and images. Perfect for getting a quick overview of your treasures.",
  },
  {
    src: "pagination",
    alt: "Smart Navigation",
    text: "Navigate through large collections effortlessly with smooth pagination. Browse hundreds or thousands of items without performance issues. Find what you're looking for quickly and efficiently. And if you don't find the item you are looking for, just use the search box. You can search for any text on the cards, even location and tags.",
  },
  {
    src: "map",
    alt: "Location Mapping",
    text: "Track where your items are located or where you found them with integrated mapping features. Perfect for collectors who want to remember acquisition locations. Especially useful for remembering: 'Hm, I found this at the flea market in 2020.' when you come to the same spot again.",
  },
];

const techStack: TechStackItem[] = [
  { name: "Next.js", url: "https://nextjs.org/" },
  { name: "React", url: "https://reactjs.org/" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
  { name: "Framer Motion", url: "https://www.framer.com/motion/" },
  { name: "Supabase", url: "https://supabase.com/" },
  { name: "PostgreSQL", url: "https://www.postgresql.org/" },
  { name: "Authentication", url: "https://supabase.com/docs/guides/auth" },
  { name: "Storage", url: "https://supabase.com/docs/guides/storage" },
  {
    name: "Static Site",
    url: "https://nextjs.org/docs/advanced-features/static-html-export",
  },
  { name: "GitHub Pages", url: "https://pages.github.com/" },
  { name: "Collections", url: "https://en.wikipedia.org/wiki/Collecting" },
  { name: "PWA", url: "https://web.dev/progressive-web-apps/" },
  { name: "Open Street Map", url: "https://www.openstreetmap.org/" },
];

export default function CollectionBuddyClient({
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
      githubLabel="collection github"
      githubText="View the repository on GitHub and start organizing your collection"
      imageDir={imageDir}
      preview={{
        src: `${imageDir}/preview.mp4`,
        poster: `${imageDir}/preview-poster.jpg`,
        label: "CollectionBuddy animated preview",
      }}
      screenshots={screenshots}
      media="video"
      techStack={techStack}
      description={
        <>
          <p><strong>CollectionBuddy</strong> is your elegant solution for cataloging personal collections. Whether you&apos;re organizing stamps, coins, trading cards, or any other collectibles, CollectionBuddy provides a beautiful and intuitive interface to keep track of your treasures.</p>
          <p>Built with modern web technologies like Next.js, React, and Supabase, it offers a seamless experience for adding, viewing, and managing your collection items. The responsive design works perfectly on desktop and mobile devices and can even be installed as a PWA app on your phone.</p>
        </>
      }
    />
  );
}
