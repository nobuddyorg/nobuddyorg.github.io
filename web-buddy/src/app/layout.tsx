import "./globals.css";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-archivo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative overflow-x-hidden">
        <div className="relative">
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
