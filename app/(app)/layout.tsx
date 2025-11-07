import Navbar from "@/components/navbar";
import { MotionProvider } from "@/lib/motion";
import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dompetin | Menyederhanakan Visualisasi Investasi",
  description:
    "Platform edukasi untuk memvisualisasikan investasi dan keuangan pribadi Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.className} ${jetbrains.variable} antialiased`}
      >
        <MotionProvider>
          <Navbar />
          {children}
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
