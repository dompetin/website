import { Pattern } from "@/components/pattern";
import GuidedPortofolio from "../components/guided-portofolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulasi Imbal Hasil | Dompetin",
};

const InvestmentReturnSimulationPage = () => {
  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <GuidedPortofolio />
    </main>
  );
};

export default InvestmentReturnSimulationPage;
