import { Metadata } from "next";
import DiyPortofolio from "../components/diy-portofolio";

export const metadata: Metadata = {
  title: "Simulasi Portofolio | Dompetin",
};

const PortofolioSimulationPage = () => {
  return <DiyPortofolio />;
};

export default PortofolioSimulationPage;
