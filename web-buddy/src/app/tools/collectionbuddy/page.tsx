import { SITE_URL, AUTHOR_NAME } from "../../globals";
import { createMetadata } from "../../metadata";
import { tools } from "../tools";
import CollectionBuddyClient from "./client";
import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const slug = "collectionbuddy";
const path = `/tools/${slug}`;

const tool = tools.find((t) => t.slug === slug);

const title = tool?.name ?? "";
const titleFull = `${title} - A tool to organize and track your collected items`;
const description = tool?.description ?? "";
const image = tool?.previewImage;
const url = `${SITE_URL}${path}`;
const authorName = AUTHOR_NAME;

export const metadata = createMetadata({
  title: titleFull,
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
  ...(image ? { image: image } : {}),
};

export default function CollectionBuddyPage() {
  return (
    <>
      <PageWrapper metadata={metadata} jsonLd={jsonLd} />
      <Header />
      <CollectionBuddyClient title={title} />
      <Footer />
    </>
  );
}
