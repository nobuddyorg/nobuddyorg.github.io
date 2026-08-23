import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

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
    src: "download-new-model.webp",
    alt: "Model Selection",
    text: "Pick any Ollama model to generate your tasks, right down to the exact tag. Don't have it locally yet? ProcrastinationBuddy pulls it for you and shows a live download progress bar, the most productive-looking thing you'll do all day.",
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

export default function ProcrastinationBuddyClient({
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
      githubLabel="procrastination github"
      githubText="View the repository on GitHub and try it out on your machine"
      imageDir={imageDir}
      screenshots={screenshots}
      media="image"
      techStack={techStack}
      description={
        <>
          <p>Meet <strong>ProcrastinationBuddy</strong>, the app that gently encourages you to do absolutely nothing important. Instead of pushing you to focus, it invites you to take a breath, relax, and enjoy the art of doing less.</p>
          <p>Feel like slowing down for no good reason? You are in the right place.</p>
        </>
      }
    />
  );
}
