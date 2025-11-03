import { Circles } from "@/components/circles";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as m from "@/lib/motion";

const InstagramCTA = () => (
  <Container className="md:mt-12">
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-secondary relative rounded-4xl"
    >
      <m.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 size-70 md:size-90"
      >
        <Image
          src={`/home/eating.png`}
          alt="Wallet Image"
          fill
          sizes="100%"
          className="z-10 object-cover"
        />
      </m.div>
      <div className="relative flex w-full items-center justify-end overflow-clip rounded-4xl bg-transparent p-6">
        <div className="z-20 flex w-full flex-col gap-4 pb-40 md:ml-62 md:max-w-lg md:py-12">
          <m.h2
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="text-end text-3xl font-bold text-pretty text-white md:text-4xl"
          >
            Yuk Belajar Finansial dari Kehidupan Sehari-hari!
          </m.h2>
          <Button
            variant={`white`}
            size="sm"
            className="text-secondary ml-auto"
            asChild
          >
            <Link
              href={`https://www.instagram.com/dompetin.aja/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ikuti kami di Instagram <ChevronRight />
            </Link>
          </Button>
        </div>

        <Circles
          className="absolute -right-30 -bottom-40 size-90"
          color="#601679"
        />
      </div>
    </m.div>
  </Container>
);

export default InstagramCTA;
