import { createMetadata } from "../../metadata";
import { tools } from "../../tools";
import ProcrastinationBuddyClient from "./client";

const tool = tools.find((t) => t.slug === "procrastinationbuddy");

export const metadata = createMetadata({
  title: tool?.name ?? "Procrastination Buddy",
  description:
    tool?.description ??
    "A fun and quirky productivity tool to help you procrastinate with style.",
  slug: "/tools/procrastinationbuddy",
  image: tool?.logo,
});

export default function ProcrastinationBuddyPage() {
  return <ProcrastinationBuddyClient />;
}
