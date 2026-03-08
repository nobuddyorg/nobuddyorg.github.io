import { SITE_URL, AUTHOR_NAME } from "../../globals";
import { createMetadata } from "../../metadata";
import { tools } from "../tools";
import RideMergeBuddyClient from "./client";
import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const slug = "ridemergebuddy";
const path = `/tools/${slug}`;

const tool = tools.find((t) => t.slug === slug);

const title = tool?.name ?? "RideMergeBuddy";
const titleFull = `${title} - View and merge your Strava activities`;
const description = tool?.description ?? "Manage, merge, and analyze your Strava activities in one place.";
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

export default function RideMergeBuddyPage() {
  return (
    <>
      <PageWrapper metadata={metadata} jsonLd={jsonLd} />
      <Header />
      <RideMergeBuddyClient title={title} />
      <Footer />
    </>
  );
}