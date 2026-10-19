import { getToolPageData } from "../toolPage";
import PowerTrailBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";

const { title, github, liveUrl, metadata, jsonLd, jsonLdId } =
  getToolPageData("powertrailbuddy");

export { metadata };

export default function PowerTrailBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <PowerTrailBuddyClient title={title} githubUrl={github} liveUrl={liveUrl} />
    </>
  );
}
