import { getToolPageData } from "../toolPage";
import ProcrastinationBuddyClient from "./client";
import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, metadata, jsonLd } = getToolPageData("procrastinationbuddy");

export { metadata };

export default function ProcrastinationBuddyPage() {
  return (
    <>
      <PageWrapper metadata={metadata} jsonLd={jsonLd} />
      <Header />
      <ProcrastinationBuddyClient title={title} />
      <Footer />
    </>
  );
}
