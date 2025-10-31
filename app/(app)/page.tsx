import { Pattern } from "@/components/pattern";
import BelajarInvestasi from "./components/belajar-investasi";
import FinancialMyths from "./components/financial-myths";
import { Footer } from "./components/footer";
import Hero from "./components/hero";
import InstagramCTA from "./components/instagram-cta";

export default function Home() {
  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <Hero />
      <BelajarInvestasi />
      <FinancialMyths />
      <InstagramCTA />
      <Footer />
    </main>
  );
}
