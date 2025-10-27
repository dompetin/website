import { Pattern } from "@/components/pattern";
import DiyPortofolio from "../components/diy-portofolio";

const PortofolioSimulationPage = () => {
  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <DiyPortofolio />
      <Pattern className="h-auto opacity-50" />
    </main>
  );
};

export default PortofolioSimulationPage;
