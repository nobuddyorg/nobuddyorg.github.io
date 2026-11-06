import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

const screenshots: ToolScreenshot[] = [
  {
    src: "grid-light.png",
    alt: "PeekBuddy log: every change to a watched folder, newest first, with a gap row and the rows that closed it",
    text: "The log lists every change in the folders you watch, newest first, and new rows arrive live. A gap, such as the time the engine was not running, is a row of its own, followed by the changes found when PeekBuddy compared the folder with what it knew before. Filter by name, kind and time.",
  },
  {
    src: "details-dark.png",
    alt: "PeekBuddy in the dark theme with the details pane open on a selected row",
    text: "Select a row to see everything stored about it: local and UTC time, kind, source, the watched root, the path, size and attributes. Nothing is opened or read: PeekBuddy never looks at the content of your files.",
  },
  {
    src: "watches-light.png",
    alt: "The Watches tab listing a watched folder with its state",
    text: "Add or remove folders, pause a watch and see its state in words: PeekBuddy tells you when a watch is not live instead of silently missing changes.",
  },
  {
    src: "settings-dark.png",
    alt: "The Settings tab with the retention, theme and autostart options",
    text: "Retention limits, the theme and autostart (off until you switch it on). The settings file is plain text, and the diagnostics preview shows what would be copied before anything leaves your PC.",
  },
];

const techStack: TechStackItem[] = [
  { name: "Rust", url: "https://www.rust-lang.org/" },
  { name: "egui", url: "https://www.egui.rs/" },
  { name: "SQLite", url: "https://www.sqlite.org/" },
  { name: "Tracy", url: "https://github.com/wolfpld/tracy" },
  { name: "cargo-nextest", url: "https://nexte.st/" },
  { name: "cargo-mutants", url: "https://mutants.rs/" },
  { name: "GitHub Actions", url: "https://github.com/features/actions" },
];

export default function PeekBuddyClient({
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
      githubLabel="PeekBuddy GitHub"
      githubText="View the repository on GitHub"
      imageDir="/images/peek-buddy"
      screenshots={screenshots}
      media="image"
      techStack={techStack}
      description={
        <>
          <p><strong>PeekBuddy</strong> silently watches your folders and logs every change in real time, so you can see what changed, when, and whether anything was missed. It is a single portable program for Windows 11 (x64 and arm64; Windows 10 22H2 on a best-effort basis): no installer, no login, no server, no tracking. The log never leaves your disk.</p>
          <br />
          <p><strong>Download.</strong> Releases are on <a href="https://github.com/nobuddyorg/PeekBuddy/releases" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white" title="PeekBuddy releases">GitHub</a>. The first versions are not code-signed: SmartScreen shows &quot;Unknown publisher&quot; (choose &quot;More info&quot;, then &quot;Run anyway&quot;) and Smart App Control blocks the program where it is on. Every release carries checksums and a GitHub attestation for each file; <a href="https://github.com/nobuddyorg/PeekBuddy/blob/main/docs/how-to/verify-download.md" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white" title="How to verify a download">here is how to verify them</a>.</p>
        </>
      }
    />
  );
}
