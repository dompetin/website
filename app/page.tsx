import DiyPortofolio from "./components/diy-portofolio";
import GuidedPortofolio from "./components/guided-portofolio";
import Hero from "./components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <GuidedPortofolio />
      <DiyPortofolio />
    </>
  );
}
