"use client";

import ToolPageShell from "../../components/ToolPageShell";
import ToolAnimatedPreview from "../../components/ToolAnimatedPreview";
import ToolScreenshots, {
  ToolScreenshot,
} from "../../components/ToolScreenshots";
import ToolTechStack, { TechStackItem } from "../../components/ToolTechStack";

const imageDir = "/images/procrastination-buddy";

const screenshots: ToolScreenshot[] = [
  {
    src: "frontend-light.webp",
    alt: "Frontend Light",
    text: "A calm and sunny interface that feels just productive enough to make you feel like you are doing something. Ideal for morning procrastination.",
  },
  {
    src: "frontend-dark.webp",
    alt: "Frontend Dark",
    text: "Soft and moody for those quiet moments when you want to avoid everything while pretending to be focused.",
  },
  {
    src: "settings-light.webp",
    alt: "Settings",
    text: "Play around with switches and sliders. Nothing urgent, nothing life changing, just something to tinker with while avoiding the real stuff.",
  },
  {
    src: "help-light.webp",
    alt: "Help",
    text: "Explore the help section to feel like you are making progress. It may not solve anything, but it feels like a step in the right direction.",
  },
];

const techStack: TechStackItem[] = [
  { name: "Ollama", url: "https://ollama.com/" },
  {
    name: "AI",
    url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
  },
  { name: "Streamlit", url: "https://streamlit.io/" },
  { name: "Flask", url: "https://flask.palletsprojects.com/" },
  { name: "Python", url: "https://www.python.org/" },
  { name: "Docker", url: "https://www.docker.com/" },
  { name: "Docker Compose", url: "https://docs.docker.com/compose/" },
  { name: "PostgreSQL", url: "https://www.postgresql.org/" },
  { name: "Ruff", url: "https://docs.astral.sh/ruff/" },
  { name: "uv", url: "https://github.com/astral-sh/uv" },
];

function DescriptionSection() {
  return (
    <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      <p>
        Meet <strong>Procrastination Buddy</strong>, the app that gently
        encourages you to do absolutely nothing important. Instead of pushing
        you to focus, it invites you to take a breath, relax, and enjoy the art
        of doing less.
      </p>
      <p>
        Feel like slowing down for no good reason? You are in the right place.
      </p>
      <br />
      <p>
        🔗{" "}
        <a
          href="https://github.com/nobuddyorg/ProcrastinationBuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
          title="procrastination github"
        >
          View the repository on GitHub and try it out on your machine
        </a>
      </p>
    </section>
  );
}

interface ProcrastinationBuddyClientProps {
  title: string;
}

export default function ProcrastinationBuddyClient({
  title,
}: ProcrastinationBuddyClientProps) {
  return (
    <ToolPageShell title={title}>
      <ToolAnimatedPreview
        src={`${imageDir}/buddy-preview.mp4`}
        poster={`${imageDir}/buddy-preview-poster.jpg`}
        label="Procrastination Buddy animated preview"
      />
      <DescriptionSection />
      <ToolScreenshots
        screenshots={screenshots}
        imageDir={imageDir}
        media="image"
      />
      <ToolTechStack items={techStack} />
    </ToolPageShell>
  );
}
