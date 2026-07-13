import "./globals.css";
import { Inter } from "next/font/google";
import EmojiBackground from "./components/EmojiBackground";
import MotionProvider from "./components/MotionProvider";

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
      <body className="relative overflow-x-hidden">
        <EmojiBackground />
        <MotionProvider>
          <div className="relative">
            <div className="relative z-10">{children}</div>
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
