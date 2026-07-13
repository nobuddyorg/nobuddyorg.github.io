import { getToolPageData } from "../toolPage";
import CollectionBuddyClient from "./client";
import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, metadata, jsonLd } = getToolPageData("collectionbuddy");

export { metadata };

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
