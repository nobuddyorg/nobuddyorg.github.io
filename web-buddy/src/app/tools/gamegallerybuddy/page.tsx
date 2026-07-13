import { getToolPageData } from "../toolPage";
import GameGalleryBuddyClient from "./client";
import PageWrapper from "../../components/PageWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, metadata, jsonLd } = getToolPageData("gamegallerybuddy");

export { metadata };

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
