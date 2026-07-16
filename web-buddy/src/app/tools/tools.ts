import { GITHUB_URL } from "../constants";

interface Tool {
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  logo: string;
  previewImage?: string;
  // Real pixel dimensions of previewImage, used for the og:image /
  // twitter:image width and height. Omit when previewImage is unset (the
  // default fallback image's dimensions apply instead).
  previewImageWidth?: number;
  previewImageHeight?: number;
  tags: string[];
  github: string;
  status: "ready" | "coming_soon";
}

export const tools: Tool[] = [
  {
    slug: "procrastinationbuddy",
    name: "Procrastination Buddy",
    tagline: "A tool to help you embrace procrastination",
    description:
      "Avoid productivity with delightfully useless tasks. Built using Streamlit, Ollama AI, and Docker. Perfect for professional procrastinators.",
    logo: "/logos/procrastination.webp",
    previewImage: "/logos/procrastination_preview.png",
    previewImageWidth: 640,
    previewImageHeight: 320,
    tags: ["Productivity", "Humor", "AI", "Docker", "Streamlit", "Python"],
    github: `${GITHUB_URL}/ProcrastinationBuddy`,
    status: "ready",
  },
  {
    slug: "thrashbuddy",
    name: "Thrash Buddy",
    tagline:
      "A tool to push your web api/app to it's limits with load and performance testing",
    description:
      "Load-test your apps at scale using k6, Grafana, Prometheus, and AWS EKS. Fully cloud-native and containerized with Docker and Helm.",
    logo: "/logos/thrash.webp",
    previewImage: "/logos/thrash_preview.jpg",
    previewImageWidth: 1024,
    previewImageHeight: 1024,
    tags: ["DevOps", "Testing", "Cloud", "Kubernetes", "Groovy", "k6"],
    github: `${GITHUB_URL}/ThrashBuddy`,
    status: "ready",
  },
  {
    slug: "gamegallerybuddy",
    name: "Game Gallery Buddy",
    tagline: "A spring boot app for managing game galleries",
    description:
      "Generates a wallpaper using all board games from a BoardGameGeek user's collection. Customizable layout with many options.",
    logo: "/logos/gamegallery.webp",
    previewImage: "/logos/gamegallery_preview.png",
    previewImageWidth: 1364,
    previewImageHeight: 739,
    tags: [
      "Games",
      "BoardGameGeek",
      "Wallpapers",
      "Groovy",
      "Spring Boot",
      "Tools",
    ],
    github: `${GITHUB_URL}/GameGalleryBuddy`,
    status: "ready",
  },
  {
    slug: "collectionbuddy",
    name: "Collection Buddy",
    tagline: "A tool to organize and track your collected items",
    description:
      "A web-app catalog for your collected items. Organize and track stamps, coins, or any collectibles with an elegant interface.",
    logo: "/logos/collection.webp",
    previewImage: "",
    tags: [
      "Collections",
      "web-app",
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
    ],
    github: `${GITHUB_URL}/CollectionBuddy`,
    status: "ready",
  },
  {
    slug: "fairbuddy",
    name: "Fair Buddy",
    description:
      "Effortlessly split costs with friends. A social-friendly app for fair finance, powered by DynamoDB and designed for group sharing.",
    logo: "/logos/fair.webp",
    previewImage: "/logos/fair.png",
    previewImageWidth: 522,
    previewImageHeight: 521,
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
    slug: "ridemergebuddy",
    name: "Ride Merge Buddy",
    tagline: "View and merge your Strava activities",
    description:
      "Merge GPX tracks from multiple cycling sessions. Ideal for Strava users, activity aggregators, and route cleanup enthusiasts.",
    logo: "/logos/ridemerge.webp",
    previewImage: "/logos/ridemerge.png",
    previewImageWidth: 929,
    previewImageHeight: 929,
    tags: ["Cycling", "GPX", "Strava", "Tracking", "Angular", "Tools"],
    github: `${GITHUB_URL}/RideMergeBuddy`,
    status: "ready",
  },
  {
    slug: "powertrailbuddy",
    name: "Power Trail Buddy",
    description:
      "Find and visualize geocaching power trails with ease. Designed for efficiency-focused cachers who love long trails and rapid finds.",
    logo: "/logos/powertrail.webp",
    previewImage: "/logos/powertrail.png",
    previewImageWidth: 953,
    previewImageHeight: 954,
    tags: ["Geocaching", "Maps", "Navigation", "Trails", "Next.js", "Outdoor"],
    github: `${GITHUB_URL}/PowerTrailBuddy`,
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
      "Tools",
    ],
    github: `${GITHUB_URL}/PeekBuddy`,
    status: "coming_soon",
  },
];
