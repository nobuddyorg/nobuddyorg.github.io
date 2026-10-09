import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

const screenshots: ToolScreenshot[] = [
  {
    src: "before-after.webp",
    alt: "Before and After",
    text: "One frame split down the middle: on the left a single photo from a burst of an ice hockey warm-up with the skaters in motion, on the right the long exposure, where the same rink is empty apart from faint ghosts. The static scene stays sharp, whatever moved fades away.",
  },
  {
    src: "picker.webp",
    alt: "Pick Your Burst",
    text: "Choose a burst of photos shot from one spot, leave out single frames, optionally mark the one the others should line up on, and pick an output size. Nothing is uploaded, the photos are only read by your browser.",
  },
  {
    src: "progress.webp",
    alt: "Aligning and Stacking",
    text: "Each photo is matched against the reference with feature detection and RANSAC, warped onto the static scene and stacked in Web Workers. A photo that doesn't line up or is blurred is left out and reported instead of being blended in.",
  },
  {
    src: "result.webp",
    alt: "Tune the Result",
    text: "Adjust ghosts, motion blur and glow with live sliders, or switch to light trails to keep headlights at full strength. Compare against an original, then save the JPEG with the burst's shooting date or hand it to your phone's share sheet.",
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
