import { getToolPageData } from "../toolPage";
import GameGalleryBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";

const { title, github, liveUrl, metadata, jsonLd, jsonLdId } =
  getToolPageData("gamegallerybuddy");

export { metadata };

export default function GameGalleryBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <GameGalleryBuddyClient title={title} githubUrl={github} liveUrl={liveUrl} />
    </>
  );
}
