import { getToolPageData } from "../toolPage";
import ThrashBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, metadata, jsonLd, jsonLdId } = getToolPageData("thrashbuddy");

export { metadata };

export default function ThrashBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <ThrashBuddyClient title={title} />
      <Footer />
    </>
  );
}
