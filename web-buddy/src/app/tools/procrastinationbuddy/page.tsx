import { getToolPageData } from "../toolPage";
import ProcrastinationBuddyClient from "./client";
import JsonLd from "../../components/JsonLd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { title, github, metadata, jsonLd, jsonLdId } =
  getToolPageData("procrastinationbuddy");

export { metadata };

export default function ProcrastinationBuddyPage() {
  return (
    <>
      <JsonLd id={jsonLdId} data={jsonLd} />
      <Header />
      <ProcrastinationBuddyClient title={title} githubUrl={github} />
      <Footer />
    </>
  );
}
