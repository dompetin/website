// Import global styles and fonts
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./(app)/globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "404 - Tidak Ditemukan | Dopmetin",
  description: "Halaman yang anda cari tidak dapat ditemukan",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold md:text-5xl">
            404 - Tidak Ditemukan
          </h1>
          <p>Halaman yang anda cari tidak dapat ditemukan</p>
          <Button asChild className="mt-4">
            <Link href={"/"}>
              <Home /> Kembali ke Beranda
            </Link>
          </Button>
        </main>
      </body>
    </html>
  );
}
