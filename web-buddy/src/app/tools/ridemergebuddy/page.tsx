import { getToolPageData } from "../toolPage";
import RideMergeBuddyClient from "./client";
import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, metadata, jsonLd } = getToolPageData("ridemergebuddy");

export { metadata };

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
