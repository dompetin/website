import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as m from "@/lib/motion";

// images are placed relative to /home/templates
const CARDS = [
  {
    title: "Template Budget Finansial dan Manajemen Finansial",
    src: "/budget.png",
    href: "https://docs.google.com/spreadsheets/d/1_uGwZjk9UdApDLu5CpTEDbM6Bzrlk2qEhI8BSG-QdSk/edit?gid=0#gid=0",
  },
  {
    title: "Tracker Portofolio Investasi",
    src: "/tracker.png",
    href: "https://docs.google.com/spreadsheets/d/14bc53zItZ6cvPJte5WlM9kADPKjG6Pp7ILgmoWH9UwI/edit?gid=0#gid=0",
  },
  {
    title: "Simulasi Pelunasan Uang",
  },
];

const DownloadTemplates = () => {
  return (
    <Container>
      <m.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center text-xl"
      >
        Mau coba terapin pengetahuan finansialmu ke dunia nyata?
      </m.p>
      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="text-primary text-center text-3xl font-bold md:text-5xl"
      >
        Yuk, download template gratis dari Dompetin
      </m.h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map((card, index) => (
          <DownloadCard key={card.title} {...card} index={index} />
        ))}
      </div>
    </Container>
  );
};

const DownloadCard = (props: {
  title: string;
  src?: string;
  href?: string;
  index: number;
}) => (
  <m.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.4, delay: props.index * 0.15, ease: "easeOut" }}
    className="h-full"
  >
    <Card className="bg-primary text-background h-full rounded-3xl">
      <CardHeader>
        <CardTitle className="border-background border-b pb-3 text-lg">
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={`relative ${props.href ? "mt-auto" : "my-auto"}`}>
        {props.href ? (
          <>
            <div className="relative my-6 h-40">
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 0.9 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.3,
                  delay: props.index * 0.15 + 0.1,
                  ease: "easeOut",
                }}
                className="bg-secondary/20 absolute inset-0 z-0 h-40 -translate-y-6 scale-90 overflow-clip rounded-3xl"
              />
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 0.95 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.3,
                  delay: props.index * 0.15 + 0.2,
                  ease: "easeOut",
                }}
                className="bg-secondary/50 absolute inset-0 z-10 h-40 -translate-y-3 scale-95 overflow-clip rounded-3xl"
              />
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.3,
                  delay: props.index * 0.15 + 0.3,
                  ease: "easeOut",
                }}
                className="bg-secondary absolute inset-0 z-20 h-40 overflow-clip rounded-3xl"
              >
                {props.src && (
                  <div className="relative h-full w-full">
                    <Image
                      src={`/home/templates${props.src}`}
                      alt={props.title}
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  </div>
                )}
              </m.div>
            </div>

            <Button
              asChild
              variant={"secondary"}
              size={"icon"}
              className="absolute right-4 bottom-0 z-20 shadow-md"
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
          </>
        ) : (
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.4,
              delay: props.index * 0.15,
              ease: "easeOut",
            }}
            className="text-background text-5xl font-bold"
          >
            Coming Soon
          </m.p>
        )}
      </CardContent>
    </Card>
  </m.div>
);

export default DownloadTemplates;
