import { getToolPageData } from "../toolPage";
import ThrashBuddyClient from "./client";
import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, metadata, jsonLd } = getToolPageData("thrashbuddy");

export { metadata };

export default function ThrashBuddyPage() {
  return (
    <>
      <PageWrapper metadata={metadata} jsonLd={jsonLd} />
      <Header />
      <ThrashBuddyClient title={title} />
      <Footer />
    </>
  );
}
