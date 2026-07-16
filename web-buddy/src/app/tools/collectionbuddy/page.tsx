import { getToolPageData } from "../toolPage";
import CollectionBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, github, metadata, jsonLd, jsonLdId } =
  getToolPageData("collectionbuddy");

export { metadata };

export default function CollectionBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <CollectionBuddyClient title={title} githubUrl={github} />
      <Footer />
    </>
  );
}
