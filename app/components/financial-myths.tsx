import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const CONTENT = [
  {
    src: "placeholder.svg",
    title: "Pahamin Dompet",
    description: "Belajar literasi keuangan gak harus ribet",
  },
  {
    src: "placeholder.svg",
    title: "Kupas Dompet",
    description: "Melawan mitos finansial dengan fakta dan data",
  },
];

const FinancialMyths = () => (
  <Container className="">
    <div>
      {CONTENT.map((section) => (
        <Section key={section.title} {...section} />
      ))}
    </div>
    <Separator className="data-[orientation=horizontal]:h-[2px] mt-10" />
  </Container>
);

const Section = (props: (typeof CONTENT)[number]) => (
  <div className="p-2 flex gap-16 items-center max-w-3xl mx-auto">
    <div className="size-35 relative shrink-0 bg-neutral-200">
      <Image
        src={props.src}
        alt={props.title}
        fill
        className="object-contain"
      />
    </div>

    <div>
      <h3 className="text-primary font-bold text-3xl">{props.title}</h3>
      <p className="text-muted-foreground text-xl">{props.description}</p>
    </div>
  </div>
);

export default FinancialMyths;
