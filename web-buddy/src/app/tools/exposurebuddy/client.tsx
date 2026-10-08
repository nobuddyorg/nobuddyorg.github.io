import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

const screenshots: ToolScreenshot[] = [
  {
    src: "main.webp",
    alt: "Pick Your Burst",
    text: "Choose a burst of photos shot from one spot, pick an output size, and combine. The scene comes out sharp while whatever moved fades into a ghost, and all of it happens in your browser.",
  },
];

const techStack: TechStackItem[] = [
  { name: "Next.js", url: "https://nextjs.org/" },
  { name: "React", url: "https://react.dev/" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
  { name: "Web Workers", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" },
  { name: "PWA", url: "https://web.dev/progressive-web-apps/" },
  { name: "Vitest", url: "https://vitest.dev/" },
  { name: "Playwright", url: "https://playwright.dev/" },
  { name: "GitHub Pages", url: "https://pages.github.com/" },
];

export default function ExposureBuddyClient({
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
      githubLabel="ExposureBuddy GitHub"
      githubText="View the repository on GitHub"
      imageDir="/images/exposure-buddy"
      screenshots={screenshots}
      media="image"
      techStack={techStack}
      description={
        <p><strong>ExposureBuddy</strong> turns a burst of phone photos into a long exposure. It lines every photo up on the static scene and stacks them: the houses stay sharp, whatever moved fades into a translucent ghost, and headlights become light trails. Everything runs in your browser, so your photos never leave the device.</p>
      }
    />
  );
}
