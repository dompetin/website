import BelajarInvestasi from "./components/belajar-investasi";
import FinancialMyths from "./components/financial-myths";
import Hero from "./components/hero";
import InstagramCTA from "./components/instagram-cta";
import DownloadTemplates from "./components/download-templates";

export default function Home() {
  return (
    <>
      <Hero />
      <BelajarInvestasi />
      <FinancialMyths />
      <DownloadTemplates />
      <InstagramCTA />
    </>
  );
}
