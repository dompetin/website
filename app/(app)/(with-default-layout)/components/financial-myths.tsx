import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import * as m from "@/lib/motion";

const CONTENT = [
  {
    src: "/home/laptop.png",
    title: "Akademi Dompetin",
    description: "Belajar literasi keuangan gak harus ribet",
    href: "/akademi",
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
    <div className="mb-12 flex flex-col gap-8 xl:gap-20">
      {CONTENT.map((section, index) => (
        <Section key={section.title} {...section} index={index} />
      ))}
    </div>
    <Separator className="mt-10 data-[orientation=horizontal]:h-0.5" />
  </Container>
);

const Section = (props: (typeof CONTENT)[number] & { index: number }) => (
  <m.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.4, delay: props.index * 0.3, ease: "easeOut" }}
  >
    <Link
      href={props.href}
      className="relative mx-auto block w-full max-w-3xl transition-all ease-out hover:scale-105 hover:cursor-pointer hover:shadow-md active:scale-95"
    >
      <div className="absolute z-10 hidden xl:-bottom-12 xl:-left-20 xl:block">
        <div className="relative shrink-0 overflow-clip rounded-full bg-white xl:size-45">
          <Image
            src={props.src}
            alt={props.title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <h3 className="text-secondary flex w-fit translate-y-4 items-center gap-2 rounded-3xl bg-white px-12 py-3 text-center text-3xl font-bold shadow-xl xl:ml-20">
        <div className="relative size-10 shrink-0 overflow-clip rounded-full bg-white xl:hidden">
          <Image
            src={props.src}
            alt={props.title}
            fill
            className="object-contain"
          />
        </div>
        {props.title}
      </h3>

      <div className="bg-secondary rounded-3xl p-6 text-white">
        <p className="text-xl font-bold xl:ml-30">{props.description}</p>
      </div>
    </Link>
  </m.div>
);

export default FinancialMyths;
