import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as m from "@/lib/motion";
import { Separator } from "@/components/ui/separator";

const Hero = () => (
  <Container className="mt-30 gap-2">
    <div className="flex flex-col max-w-md gap-2">
      <m.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-2xl md:text-4xl font-medium"
      >
        Ada Uang Sisa?
      </m.h2>
      <m.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="text-5xl md:text-8xl font-bold"
      >
        <span className="text-primary">Dompetin</span> Aja!
      </m.h1>

      <p className="mt-10">Mau tau portofolio yang cocok untuk kamu?</p>
      <Button className="font-semibold w-fit" asChild>
        <Link href="/survey">
          Cari tahu sekarang
          <ArrowRight />
        </Link>
      </Button>
    </div>

    <Separator className="data-[orientation=horizontal]:h-[2px] mt-20" />
  </Container>
);

export default Hero;
