import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientHome from "./client";

export const metadata = {
  title: "The Buddy Compendium - by nobuddy",
  description: "Blending quirky charm with real-world usefulness for everybuddy.",
  openGraph: {
    title: "The Buddy Compendium - by nobuddy",
    description: "Blending quirky charm with real-world usefulness for everybuddy.",
    url: "https://nobuddy.org",
    siteName: "The Buddy Compendium",
    images: [
      {
        url: "https://nobuddy.org/nobuddy_logo_preview.webp",
        width: 1280,
        height: 640,
        alt: "The Buddy Compendium Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Buddy Compendium - by nobuddy",
    description: "Blending quirky charm with real-world usefulness for everybuddy.",
    image: "https://nobuddy.org/nobuddy_logo_preview.webp",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <ClientHome />
      </main>
      <Footer />
    </>
  );
}
