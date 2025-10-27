import { Pattern } from "@/components/pattern";
import GuidedPortofolio from "../components/guided-portofolio";

const InvestmentReturnSimulationPage = () => {
  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <GuidedPortofolio />
      <Pattern className="h-auto opacity-50" />
    </main>
  );
};

export default InvestmentReturnSimulationPage;
