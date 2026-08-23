import ToolClientPage from "../../components/ToolClientPage";
import { ToolScreenshot } from "../../components/ToolScreenshots";
import { TechStackItem } from "../../components/ToolTechStack";

const imageDir = "/images/thrash-buddy";

const screenshots: ToolScreenshot[] = [
  {
    src: "frontend.webp",
    alt: "Easy Usage",
    text: "Deploy and manage your testing infrastructure with simple scripts and an intuitive frontend. Powerful under the hood, simple on the surface. The frontend helps you tackle complex tasks with ease.",
  },
  {
    src: "settings.webp",
    alt: "Distributed Load Testing",
    text: "Simulate large-scale traffic using k6 across multiple Kubernetes pods of your desired sizes (number of agents, CPU and Memory). ThrashBuddy can create loads on your system that you might not be ready for: take care!.",
  },
  {
    src: "dashboard.webp",
    alt: "Real-Time Dashboard",
    text: "Monitor your app's performance in real time with Grafana dashboards powered by Prometheus. See metrics like response time and throughput at a glance.",
  },
  {
    src: "eks.webp",
    alt: "Kubernetes Integration",
    text: "ThrashBuddy integrates seamlessly with Kubernetes, and thus allowing you to run it on many cloud providers and on-premises. The cloud tools may offer additional support to you.",
  },
];

const techStack: TechStackItem[] = [
  { name: "Groovy", url: "https://groovy-lang.org/" },
  { name: "k6", url: "https://k6.io/" },
  { name: "Grafana", url: "https://grafana.com/" },
  { name: "Prometheus", url: "https://prometheus.io/" },
  { name: "Testing", url: "https://en.wikipedia.org/wiki/Software_testing" },
  { name: "DevOps", url: "https://en.wikipedia.org/wiki/DevOps" },
  { name: "Cloud", url: "https://en.wikipedia.org/wiki/Cloud_computing" },
  { name: "Kubernetes", url: "https://kubernetes.io/" },
  { name: "Helm", url: "https://helm.sh/" },
  { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
  { name: "Gradle", url: "https://gradle.org/" },
  { name: "Docker", url: "https://www.docker.com/" },
  { name: "Minikube", url: "https://minikube.sigs.k8s.io/" },
];

export default function ThrashBuddyClient({
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
      githubLabel="thrash github"
      githubText="View the repository on GitHub and try it out on your infrastructure"
      imageDir={imageDir}
      screenshots={screenshots}
      media="image"
      techStack={techStack}
      description={
        <>
          <p><strong>ThrashBuddy</strong> is your go-to solution for cloud-native performance testing. Whether you&apos;re preparing for a product launch or scaling your infrastructure, ThrashBuddy helps you simulate real-world load with confidence.</p>
          <p>Built on top of powerful tools like k6, Prometheus, and Grafana, it enables distributed load testing across Kubernetes clusters, giving you deep insights into how your app performs under pressure.</p>
        </>
      }
    />
  );
}
