import Container from "@/components/container";
import { Metadata } from "next";
import * as m from "@/lib/motion";
import { CardWithImage } from "../components/card-with-image";

export const metadata: Metadata = {
  title: "Kupas | Dompetin",
};

const CARDS = [
  {
    title: "Sektor mana yang paling cuan di bursa saham?",
    src: "/kupas/jumping.png",
    description:
      "Kalau kamu invest di tiap sektor, siapa yang bikin dompet paling tebal?",
    href: "/kupas/1",
  },
];

const KupasPage = () => {
  return (
    <>
      <Container className="max-w-4xl gap-20">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-lg md:text-2xl">Cerita dibalik data?</h2>
          <h1 className="flex flex-wrap items-center justify-center gap-3 text-4xl font-bold md:text-6xl">
            Yuk Kita{" "}
            <m.span
              initial={{
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
              className="text-primary"
            >
              {" "}
              Kupas
            </m.span>
          </h1>
          <p>
            Lewat visual, data dan insight, kita cari tahu fenomena keuangan di
            sekitar kita
          </p>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-8">
          {CARDS.map((card, i) => (
            <m.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mt-8"
            >
              <CardWithImage {...card} />
            </m.div>
          ))}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: CARDS.length * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <p className="text-2xl font-bold text-neutral-500 md:text-6xl">
              ...lebih banyak lagi segera hadir
            </p>
          </m.div>
        </div>
      </Container>
    </>
  );
};

export default KupasPage;
