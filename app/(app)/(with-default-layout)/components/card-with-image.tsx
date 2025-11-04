import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

interface CardWithImageProps {
  title: string | React.ReactNode;
  src?: string;
  description: string | React.ReactNode;
  href: string | Route;
}

export const CardWithImage = (props: CardWithImageProps) => (
  <div className="grid auto-rows-fr rounded-3xl bg-white shadow-lg">
    <div className="bg-purple relative rounded-t-3xl">
      {props.src && (
        <div className="absolute -top-10 left-0 aspect-square w-full sm:-top-20 sm:max-md:left-1/2 sm:max-md:w-1/2 sm:max-md:-translate-x-1/2">
          <Image
            src={props.src}
            alt={`Dompetin | ${props.title} Cover Image`}
            fill
            sizes="10%"
            className="object-contain"
          />
        </div>
      )}
    </div>
    <div className="z-20 flex flex-col items-center gap-4 rounded-b-3xl bg-white p-6 text-center">
      <h3 className="text-2xl font-bold">{props.title}</h3>
      <p className="text-sm">{props.description}</p>
      <Button asChild transition={"scale"}>
        <Link href={props.href as Route}>
          Lihat Selengkapnya <ChevronRight />
        </Link>
      </Button>
    </div>
  </div>
);
