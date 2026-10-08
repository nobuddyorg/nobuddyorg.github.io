import { getToolPageData } from "../toolPage";
import ExposureBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";

const { title, github, liveUrl, metadata, jsonLd, jsonLdId } =
  getToolPageData("exposurebuddy");

export { metadata };

export default function ExposureBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <ExposureBuddyClient title={title} githubUrl={github} liveUrl={liveUrl} />
    </>
  );
}
