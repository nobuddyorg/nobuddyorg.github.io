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
  {
    slug: "qrbuddy",
    name: "QR Buddy",
    description:
      "Read QR-codes from images on your phone or PC, using a simple web app. You don't need camera access, this is local storage only.",
    logo: "/logos/qr.webp",
    previewImage: "",
    tags: [
      "Kotlin",
      "Mobile",
      "Image Processing",
      "Camera",
      "Files",
      "Local",
    ],
    github: `${GITHUB_URL}/FairBuddy`,
    status: "coming_soon",
  },
  {
    slug: "karmabudddy",
    name: "Karma Buddy",
    description:
      "Track your karma points with a fun and engaging app. Compete with friends and see who has the highest karma score.",
    logo: "/logos/karma.webp",
    previewImage: "",
    tags: [
      "Social",
      "Java",
      "AI",
      "Hugging Face",
      "Mobile",
      "Humor",
      "Gamification",
    ],
    github: `${GITHUB_URL}/KarmaBuddy`,
    status: "coming_soon",
  },
  {
    slug: "peekbuddy",
    name: "Peek Buddy",
    description:
      "Silently watches your folders and logs every change in real time. This way you detect all changes on your system.",
    logo: "/logos/peek.webp",
    previewImage: "",
    tags: [
      "Electron",
      "Desktop",
      "Filesystem",
      "Monitoring",
      "JavaScript",
      "Tools"
    ],
    github: `${GITHUB_URL}/PeekBuddy`,
    status: "coming_soon",
  }
];
