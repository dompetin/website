import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CONTENT = [
  {
    src: "/home/laptop.png",
    title: "Pahamin Dompet",
    description: "Belajar literasi keuangan gak harus ribet",
    href: "/pahamin",
  },
  {
    src: "/home/writing.png",
    title: "Kupas Dompet",
    description: "Melawan mitos finansial dengan fakta dan data",
    href: "/kupas",
  },
];

const FinancialMyths = () => (
  <Container className="">
    <div className="">
      {CONTENT.map((section) => (
        <Section key={section.title} {...section} />
      ))}
    </div>
    <Separator className="mt-10 data-[orientation=horizontal]:h-[2px]" />
  </Container>
);

const Section = (props: (typeof CONTENT)[number]) => (
  <div className="mx-auto flex max-w-3xl items-center gap-6 p-2 max-md:flex-col max-md:items-center md:gap-16">
    <div className="relative size-45 shrink-0 overflow-clip rounded-full">
      <Image
        src={props.src}
        alt={props.title}
        fill
        className="object-contain"
      />
    </div>

    <div className="flex flex-col gap-2 max-md:items-center max-md:text-center">
      <h3 className="text-primary text-3xl font-bold">{props.title}</h3>
      <p className="text-muted-foreground text-2xl">{props.description}</p>
      <Button asChild variant={"secondary"} className="mt-6 w-fit">
        <Link href={props.href}>
          Mulai dari sini <ChevronRight />
        </Link>
      </Button>
    </div>
  </div>
);

export default FinancialMyths;
