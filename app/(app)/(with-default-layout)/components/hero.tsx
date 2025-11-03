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
          className="text-5xl font-bold sm:text-7xl md:text-8xl"
        >
          <span className="text-primary">Dompetin</span> Aja!
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          className="md:mt-10"
        >
          Mau tau portofolio yang cocok untuk kamu?
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
        >
          <Button
            size={"xl"}
            className="group w-fit text-xl font-semibold max-md:mt-8"
            asChild
          >
            <Link href="/survey">
              <span className="max-sm:hidden">
                Lewat quiz Dompetin, yuk cari tahu!
              </span>
              <span className="sm:hidden">Yuk cari tahu!</span>
              <ArrowRight className="transition-transform ease-out group-hover:translate-x-1" />
            </Link>
          </Button>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
        className="relative size-100 max-md:hidden"
      >
        <Image
          src={`/home/walking.png`}
          alt="Wally Walking"
          sizes="100%"
          fill
          className="object-contain"
        />
      </m.div>
    </div>

    <Separator className="mt-20 data-[orientation=horizontal]:h-[2px]" />
  </Container>
);

export default Hero;
