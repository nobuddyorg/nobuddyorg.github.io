import { getToolPageData } from "../toolPage";
import RideMergeBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, metadata, jsonLd, jsonLdId } = getToolPageData("ridemergebuddy");

export { metadata };

export default function RideMergeBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <RideMergeBuddyClient title={title} />
      <Footer />
    </>
  );
}
