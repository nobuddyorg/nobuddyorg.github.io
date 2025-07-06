import { SITE_URL, AUTHOR_NAME } from "../../globals";
import { createMetadata } from "../../metadata";
import { tools } from "../../tools";
import GameGalleryBuddyClient from "./client";
import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const slug = "gamegallerybuddy";
const path = `/tools/${slug}`;

const tool = tools.find((t) => t.slug === slug);

const title = tool?.name ?? "";
const description = tool?.description ?? "";
const image = tool?.previewImage;
const url = `${SITE_URL}${path}`;
const authorName = AUTHOR_NAME;

export const metadata = createMetadata({
  title,
  description,
  slug: path,
  image,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: title,
  description,
  url,
  author: {
    "@type": "Person",
    name: authorName,
  },
  ...(image ? { image } : {}),
};

export default function GameGalleryBuddyPage() {
  return (
    <>
      <PageWrapper metadata={metadata} jsonLd={jsonLd} />
      <Header />
      <GameGalleryBuddyClient title={title} />
      <Footer />
    </>
  );
}
