import Container from "@/components/container";
import { Pattern } from "@/components/pattern";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import Image from "next/image";

const CARDS: KupasCardProps[] = [
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
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <Container className="max-w-4xl gap-20">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-lg md:text-2xl">Cerita dibalik data?</h2>
          <h1 className="text-4xl font-bold md:text-6xl">
            Yuk Kita <span className="text-primary">Kupas</span>
          </h1>
          <p>
            Lewat visual, data dan insight, kita cari tahu fenomena keuangan di
            sekitar kita
          </p>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-8">
          {CARDS.map((card) => (
            <KupasCard key={card.href} {...card} />
          ))}
          <div className="flex items-center">
            <p className="text-2xl font-bold text-neutral-500 md:text-6xl">
              ...lebih banyak lagi segera hadir
            </p>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  );
};

interface KupasCardProps {
  title: string | React.ReactNode;
  src?: string;
  description: string | React.ReactNode;
  href: string | Route;
}

const KupasCard = (props: KupasCardProps) => (
  <div className="grid auto-rows-fr rounded-3xl bg-white shadow-lg">
    <div className="bg-purple relative rounded-t-3xl">
      {props.src && (
        <div className="absolute -top-10 left-0 aspect-square w-full sm:-top-20 sm:max-md:left-1/2 sm:max-md:w-1/2 sm:max-md:-translate-x-1/2">
          <Image
            src={props.src}
            alt={`Dompetin | ${props.title} Cover Image`}
            fill
            sizes="10%"
            className="object-contain"
          />
        </div>
      )}
    </div>
    <div className="z-20 flex flex-col items-center gap-4 rounded-b-3xl bg-white p-6 text-center">
      <h3 className="text-2xl font-bold">{props.title}</h3>
      <p className="text-sm">{props.description}</p>
      <Button asChild>
        <Link href={props.href as Route}>
          Lihat Selengkapnya <ChevronRight />
        </Link>
      </Button>
    </div>
  </div>
);
export default KupasPage;
