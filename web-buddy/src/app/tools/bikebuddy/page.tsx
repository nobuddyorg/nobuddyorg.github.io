import { getToolPageData } from "../toolPage";
import BikeBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";

const { title, github, liveUrl, metadata, jsonLd, jsonLdId } =
  getToolPageData("bikebuddy");

export { metadata };

export default function BikeBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <BikeBuddyClient title={title} githubUrl={github} liveUrl={liveUrl} />
    </>
  );
}
