import { Circles } from "@/components/circles";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const InstagramCTA = () => (
  <Container className="md:mt-12">
    <div className="bg-secondary relative rounded-4xl">
      <div className="absolute bottom-0 left-0 size-70 md:size-90">
        <Image
          src={`/home/eating.png`}
          alt="Wallet Image"
          fill
          sizes="100%"
          className="object-cover z-10"
        />
      </div>
      <div className="relative flex w-full items-center justify-end overflow-clip rounded-4xl bg-transparent p-6">
        <div className="z-20 flex w-full flex-col gap-4 pb-40 md:ml-62 md:max-w-lg md:py-12">
          <h2 className="text-end text-3xl font-bold text-pretty text-white md:text-4xl">
            Yuk Belajar Finansial dari Kehidupan Sehari-hari!
          </h2>
          <Button
            variant={`white`}
            size="sm"
            className="text-secondary ml-auto"
          >
            Ikuti kami di Instagram <ChevronRight />
          </Button>
        </div>

        <Circles
          className="absolute -right-30 -bottom-40 size-90"
          color="#601679"
        />
      </div>
    </div>
  </Container>
);

export default InstagramCTA;
