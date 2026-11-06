import { getToolPageData } from "../toolPage";
import PeekBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";

const { title, github, liveUrl, metadata, jsonLd, jsonLdId } =
  getToolPageData("peekbuddy");

export { metadata };

export default function PeekBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <PeekBuddyClient title={title} githubUrl={github} liveUrl={liveUrl} />
    </>
  );
}
