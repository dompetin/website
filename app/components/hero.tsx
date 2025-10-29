import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as m from "@/lib/motion";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Hero = () => (
  <Container className="gap-2">
    <div className="flex items-center justify-between gap-8">
      <div className="flex max-w-md flex-col gap-2">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-2xl font-medium md:text-4xl"
        >
          Ada Uang Sisa?
        </m.h2>
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-bold md:text-8xl"
        >
          <span className="text-primary">Dompetin</span> Aja!
        </m.h1>

        <p className="md:mt-10">Mau tau portofolio yang cocok untuk kamu?</p>
        <Button size={"lg"} className="w-fit font-semibold max-md:mt-8" asChild>
          <Link href="/survey">
            Cari tahu sekarang
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="relative size-100 max-md:hidden">
        <Image
          src={`/home/walking.png`}
          alt="Wally Walking"
          sizes="100%"
          fill
          className="object-contain"
        />
      </div>
    </div>

    <Separator className="mt-20 data-[orientation=horizontal]:h-[2px]" />
  </Container>
);

export default Hero;
