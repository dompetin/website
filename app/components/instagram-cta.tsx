import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const InstagramCTA = () => (
  <Container className="">
    <div className="w-full rounded-3xl relative flex justify-end items-center p-6 bg-secondary">
      <div className="size-70 absolute bottom-0 left-0 bg-neutral-200">
        <Image
          src={`/placeholder.svg`}
          alt="Wallet Image"
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>

      <div className="ml-62 max-w-xl flex flex-col w-full gap-2 py-12">
        <h2 className="text-3xl text-end text-white font-bold">
          Yuk Belajar Finansial dari Kehidupan Sehari-hari!
        </h2>
        <Button variant={`white`} size="sm" className="ml-auto">
          Ikuti kami di Instagram <ChevronRight />
        </Button>
      </div>
    </div>
  </Container>
);

export default InstagramCTA;
