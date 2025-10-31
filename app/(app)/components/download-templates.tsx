import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CARDS = [
  {
    title: "Template Budget Finansial dan Manajemen Finansial",
    href: "#",
  },
  {
    title: "Template2 Budget Finansial dan Manajemen Finansial",
    href: "#",
  },
  {
    title: "Template3 Budget Finansial dan Manajemen Finansial",
    href: "#",
  },
];

const DownloadTemplates = () => {
  return (
    <Container>
      <p className="text-center text-xl">
        Mau coba terapin pengetahuan finansialmu ke dunia nyata?
      </p>
      <h2 className="text-primary text-center text-3xl font-bold md:text-5xl">
        Yuk, download template gratis dari Dompetin
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map((card) => (
          <DownloadCard key={card.title} {...card} />
        ))}
      </div>
    </Container>
  );
};

const DownloadCard = (props: { title: string; src?: string; href: string }) => (
  <Card className="bg-primary text-background rounded-3xl">
    <CardHeader>
      <CardTitle className="border-background border-b pb-3">
        {props.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="relative">
      <div className="relative my-6 h-40">
        <div className="bg-secondary/50 absolute inset-0 z-0 h-40 -translate-y-6 scale-90 overflow-clip rounded-3xl" />
        <div className="bg-secondary absolute inset-0 z-10 h-40 -translate-y-3 scale-95 overflow-clip rounded-3xl" />
        <div className="absolute inset-0 z-20 h-40 overflow-clip rounded-3xl bg-white"></div>
      </div>

      <Button
        asChild
        variant={"white"}
        size={"icon"}
        className="border-accent absolute right-4 bottom-0 z-20 border shadow-md"
      >
        <Link
          href={props.href}
          target="_blank"
          rel="noopener noreferer"
          className=""
        >
          <ArrowUpRight />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default DownloadTemplates;
