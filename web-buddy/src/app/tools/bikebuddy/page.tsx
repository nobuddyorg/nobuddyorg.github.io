import { getToolPageData } from "../toolPage";
import BikeBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, github, metadata, jsonLd, jsonLdId } =
  getToolPageData("bikebuddy");

export { metadata };

export default function BikeBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <BikeBuddyClient title={title} githubUrl={github} />
      <Footer />
    </>
  );
}
