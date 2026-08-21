import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

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
    text: "Select multiple activities and merge them into a new one. Merged activities are highlighted for clarity. This helps clean up duplicates or combine segmented rides effortlessly.",
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

export default function RideMergeBuddyClient({
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
      githubLabel="RideMergeBuddy GitHub"
      githubText="View the repository on GitHub"
      imageDir={imageDir}
      screenshots={screenshots}
      media="video"
      techStack={techStack}
      description={
        <p><strong>RideMergeBuddy</strong> lets you view and merge your Strava activities seamlessly. Select multiple rides or runs, merge them into a new activity, and track everything in one place.</p>
      }
    />
  );
}
