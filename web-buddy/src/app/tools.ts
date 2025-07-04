import { GITHUB_URL } from "./globals"; // adjust path as needed

export const tools = [
  {
    slug: "procrastinationbuddy",
    name: "Procrastination Buddy",
    description:
      "Avoid productivity with delightfully useless tasks. Built using Streamlit, Ollama AI, and Docker. Perfect for professional procrastinators.",
    logo: "/logos/procrastination.webp",
    previewImage: "/logos/procrastination_preview.png",
    tags: ["Productivity", "Humor", "AI", "Docker", "Streamlit", "Python"],
    github: `${GITHUB_URL}/ProcrastinationBuddy`,
    status: "ready",
  },
  {
    slug: "thrashbuddy",
    name: "Thrash Buddy",
    description:
      "Load-test your apps at scale using k6, Grafana, InfluxDB, and AWS EKS. Fully cloud-native and containerized with Docker and Helm.",
    logo: "/logos/thrash.webp",
    previewImage: "/logos/thrash_preview.png",
    tags: ["DevOps", "Testing", "Cloud", "Kubernetes", "Groovy", "k6"],
    github: `${GITHUB_URL}/ThrashBuddy`,
    status: "ready",
  },
  {
    slug: "fairbuddy",
    name: "Fair Buddy",
    description:
      "Effortlessly split costs with friends. A social-friendly app for fair finance, powered by DynamoDB and designed for group sharing.",
    logo: "/logos/split.webp",
    previewImage: "/logos/split_preview.png",
    tags: [
      "Finance",
      "Social",
      "Sharing",
      "Groups",
      "Java",
      "Serverless",
      "Mobile",
    ],
    github: `${GITHUB_URL}/FairBuddy`,
    status: "coming_soon",
  },
];
