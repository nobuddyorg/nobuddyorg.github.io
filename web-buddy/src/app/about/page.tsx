import { createMetadata } from "../metadata";
import AboutClient from "./client";

export const metadata = createMetadata({
  title: "About / Impressum",
  description:
    "Official About and Impressum page for The Buddy Compendium — legal information, contact details, and content responsibility by Matthias Eggert. A private, non-commercial web tools project.",
  slug: "/about",
});

export default function AboutPage() {
  return <AboutClient />;
}
