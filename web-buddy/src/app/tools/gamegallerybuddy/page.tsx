import { getToolPageData } from "../toolPage";
import GameGalleryBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, metadata, jsonLd, jsonLdId } = getToolPageData("gamegallerybuddy");

export { metadata };

export default function GameGalleryBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <GameGalleryBuddyClient title={title} />
      <Footer />
    </>
  );
}
