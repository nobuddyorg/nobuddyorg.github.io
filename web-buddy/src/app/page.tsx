import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientHome from "./client";
import { createMetadata } from "./metadata";
import { tools } from "./tools";

function generateDescription() {
  const toolNames = tools.map((tool) => tool.name).join(", ");
  return `A growing collection of useful web tools with unique personality and practical features for creative problem-solving, including ${toolNames}.`;
}

export const metadata = createMetadata({
  title: "The Buddy Compendium",
  description: generateDescription(),
  slug: "/",
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <ClientHome />
      </main>
      <Footer />
    </>
  );
}
