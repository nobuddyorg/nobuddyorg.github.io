import ToolPageShell from "../../components/ToolPageShell";
import ToolScreenshots, {
  ToolScreenshot,
} from "../../components/ToolScreenshots";
import ToolTechStack, { TechStackItem } from "../../components/ToolTechStack";

const imageDir = "/images/ridemerge-buddy";

const screenshots: ToolScreenshot[] = [
  {
    src: "login",
    alt: "Strava Login",
    text: "Login securely with Strava OAuth. No additional credentials required. Your data stays safe and synced automatically with your Strava account.",
  },
  {
    src: "table",
    alt: "Activity Table",
    text: "View your recent Strava activities in a detailed table. Click a row to see full details, including distance, duration, elevation, and route map. Easily see the most relevant data about your activities for quick analysis.",
  },
  {
    src: "merge",
    alt: "Merge Activities",
    text: "Select multiple activities and merge them into a new one. Merged activities are highlighted for clarity. This helps clean up duplicates or combine segmented rides effortlessly. Check out the full project at https://github.com/nobuddyorg/RideMergeBuddy for setup instructions and source code.",
  },
];

const techStack: TechStackItem[] = [
  { name: "Angular", url: "https://angular.io/" },
  { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
  { name: "Groovy", url: "https://groovy-lang.org/" },
  { name: "Strava API", url: "https://developers.strava.com/" },
  { name: "Google Maps API", url: "https://developers.google.com/maps" },
  { name: "Gradle", url: "https://gradle.org/" },
];

function DescriptionSection() {
  return (
    <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      <p>
        <strong>RideMergeBuddy</strong> lets you view and merge your Strava activities seamlessly. Select multiple rides or runs, merge them into a new activity, and track everything in one place.
      </p>
      <br />
      <p>
        🔗{" "}
        <a
          href="https://github.com/nobuddyorg/RideMergeBuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
          title="RideMergeBuddy GitHub"
        >
          View the repository on GitHub
        </a>
      </p>
    </section>
  );
}

interface RideMergeBuddyClientProps {
  title: string;
}

export default function RideMergeBuddyClient({
  title,
}: RideMergeBuddyClientProps) {
  return (
    <ToolPageShell title={title}>
      <DescriptionSection />
      <ToolScreenshots
        screenshots={screenshots}
        imageDir={imageDir}
        media="video"
      />
      <ToolTechStack items={techStack} />
    </ToolPageShell>
  );
}
