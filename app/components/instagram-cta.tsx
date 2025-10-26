import { Circles } from "@/components/circles";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const InstagramCTA = () => (
  <Container className="">
    <div className="relative">
      <div className="size-70 bg-secondary md:size-90 absolute bottom-0 left-0">
        <Image
          src={`/home/eating.png`}
          alt="Wallet Image"
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>
      <div className="w-full rounded-4xl bg-transparent relative flex justify-end overflow-clip items-center p-6">
        <div className="md:ml-62 z-20 md:max-w-lg flex flex-col w-full gap-4 pb-40 md:py-12">
          <h2 className="text-3xl md:text-4xl text-end text-white text-pretty font-bold">
            Yuk Belajar Finansial dari Kehidupan Sehari-hari!
          </h2>
          <Button
            variant={`white`}
            size="sm"
            className="ml-auto text-secondary"
          >
            Ikuti kami di Instagram <ChevronRight />
          </Button>
        </div>

        <Circles
          className="size-90 absolute -right-30 -bottom-40"
          color="#601679"
        />
      </div>
    </div>
  </Container>
);

export default InstagramCTA;
