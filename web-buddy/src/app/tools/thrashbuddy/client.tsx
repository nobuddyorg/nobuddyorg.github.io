"use client";

import ToolPageShell from "../../components/ToolPageShell";
import ToolAnimatedPreview from "../../components/ToolAnimatedPreview";
import ToolScreenshots, {
  ToolScreenshot,
} from "../../components/ToolScreenshots";
import ToolTechStack, { TechStackItem } from "../../components/ToolTechStack";

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
    text: "Simulate large-scale traffic using k6 across multiple Kubernetes pods of your desired sizes (number of agents, CPU and Memory). Thrash Buddy can create loads on your system that you might not be ready for: take care!.",
  },
  {
    src: "dashboard.webp",
    alt: "Real-Time Dashboard",
    text: "Monitor your app's performance in real time with Grafana dashboards powered by Prometheus. See metrics like response time and throughput at a glance.",
  },
  {
    src: "eks.webp",
    alt: "Kubernetes Integration",
    text: "Thrash Buddy integrates seamlessly with Kubernetes, and thus allowing you to run it on many cloud providers and on-premises. The cloud tools may offer additional support to you.",
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

function DescriptionSection() {
  return (
    <section className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      <p>
        <strong>Thrash Buddy</strong> is your go-to solution for cloud-native performance testing. Whether you&apos;re preparing for a product launch or scaling your infrastructure, Thrash Buddy helps you simulate real-world load with confidence.
      </p>
      <p>
        Built on top of powerful tools like k6, Prometheus, and Grafana, it enables distributed load testing across Kubernetes clusters, giving you deep insights into how your app performs under pressure.
      </p>
      <br />
      <p>
        🔗{" "}
        <a
          href="https://github.com/nobuddyorg/ThrashBuddy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
          title="thrash github"
        >
          View the repository on GitHub and try it out on your infrastructure
        </a>
      </p>
    </section>
  );
}

interface ThrashBuddyClientProps {
  title: string;
}

export default function ThrashBuddyClient({
  title,
}: ThrashBuddyClientProps) {
  return (
    <ToolPageShell title={title}>
      <ToolAnimatedPreview
        src="/images/thrash-buddy/preview.mp4"
        poster="/images/thrash-buddy/preview-poster.jpg"
        label="Thrash Buddy animated preview"
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
