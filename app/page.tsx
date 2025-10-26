import BelajarInvestasi from "./components/belajar-investasi";
import FinancialMyths from "./components/financial-myths";
import { Footer } from "./components/footer";
import Hero from "./components/hero";
import InstagramCTA from "./components/instagram-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <BelajarInvestasi />
      <FinancialMyths />
      <InstagramCTA />
      <Footer />
    </>
  );
}
