import Container from "@/components/container";
import { Pattern } from "@/components/pattern";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "../components/footer";
import type { AkademiArticle } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";

export const revalidate = 3600;

const COVER_IMAGES = [
  "/kupas/jumping.png",
  "/home/cooking.png",
  "/home/eating.png",
  "/home/laptop.png",
  "/home/walking.png",
  "/home/writing.png",
];

const AkademiPage = async () => {
  const articles = await getAkademiArticles();

  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <Container className="max-w-4xl gap-20">
        <div className="flex flex-col gap-4 text-center">
          <h3 className="text-lg md:text-2xl">
            Bingung mulai belajar manajemen keuangan dari mana
          </h3>
          <h2 className="text-4xl font-bold md:text-6xl">
            Yuk Belajar di
            <span className="text-primary"> Akademi </span>
            <span className="text-neutral-900">Dompetin</span>
          </h2>
          <p>
            Mulai perjalanan finansial di sini dari dasar menabung sampai
            strategi investasi
          </p>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-8">
          {articles.length > 0 &&
            articles.map((article, index) => (
              <AkademiCard
                key={article.slug}
                title={article.title}
                description={article.subtitle || ""}
                href={`/akademi/${article.slug}`}
                src={COVER_IMAGES[index % COVER_IMAGES.length]}
              />
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

async function getAkademiArticles() {
  const payload = await getPayload({ config });
  let articles: AkademiArticle[] = [];

  try {
    const { docs } = await payload.find({
      collection: "akademi-article",
      sort: "-createdAt",
    });
    articles = docs;
  } catch (err) {
    console.error("[ERR] Error fetching akademi articles: ", err);
  }

  return articles;
}

interface AkademiCardProps {
  title: string | React.ReactNode;
  src?: string;
  description: string | React.ReactNode;
  href: string | Route;
}

const AkademiCard = (props: AkademiCardProps) => (
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

export default AkademiPage;
