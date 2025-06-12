import "./globals.css";
import { Inter } from "next/font/google";
import EmojiBackground from "./components/EmojiBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-black relative overflow-hidden">
        <EmojiBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
