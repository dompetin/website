import { Pattern } from "@/components/pattern";
import Container from "@/components/container";
import { Accordion } from "@/components/ui/accordion";
import { DepositoItem } from "./components/deposito-item";
import { EmasItem } from "./components/emas-item";
import { ObligasiItem } from "./components/obligasi-item";
import { ReksadanaItem } from "./components/reksadana-item";
import { SahamItem } from "./components/saham-item";
import { CryptoItem } from "./components/crypto-item";

const PahaminPage = () => {
  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />

      <Container className="gap-12">
        <div className="space-y-2 text-center">
          <p className="text-lg md:text-2xl">
            Sebelum uang sisamu di-
            <span className="text-primary font-bold">Dompetin</span>,
          </p>
          <p className="text-primary text-3xl font-bold md:text-5xl">
            Pahami dulu cara mainnya.
          </p>
        </div>

        <div className="rounded-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            <DepositoItem />
            <EmasItem />
            <ObligasiItem />
            <ReksadanaItem />
            <SahamItem />
            <CryptoItem />
          </Accordion>
        </div>
      </Container>
    </main>
  );
};

export default PahaminPage;
