import { Circles } from "@/components/circles";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as m from "@/lib/motion";

const BelajarInvestasi = () => (
  <Container className="overflow-x-clip text-center xl:overflow-x-visible">
    <m.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-primary text-3xl font-bold md:text-5xl"
    >
      Belajar investasi tanpa risiko
    </m.h2>
    <m.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    >
      Bangun portofoliomu sendiri dan lihat bagaimana uangmu bisa tumbuh dari
      berbagai instrumen mulai dari emas, saham, hingga reksa dana.
    </m.p>

    <div className="mt-16 grid grid-cols-1 gap-4 text-start md:grid-cols-2">
      <CardPortofolio />
      <CardImbal />
    </div>

    <Separator className="mt-10 data-[orientation=horizontal]:h-[2px]" />
  </Container>
);

const CardPortofolio = () => (
  <m.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="relative rounded-3xl bg-linear-to-tl from-pink-300 to-pink-200 shadow-xl"
  >
    <div className="relative h-full overflow-hidden rounded-3xl p-10">
      <div className="flex h-full flex-col justify-between gap-6 *:z-10 md:ml-30">
        <h3 className="w-full text-xl font-bold text-white md:text-3xl">
          Mau coba bikin{" "}
          <span className="text-secondary">portofoliomu sendiri?</span>
        </h3>
        <Button asChild variant={`secondary`} className="group ml-auto">
          <Link href="/simulasi-portofolio">
            Simulasikan Sekarang{" "}
            <ChevronRight className="transition-transform ease-out group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <Circles
        color="#f9a8d4"
        className="absolute -right-30 -bottom-30 size-80"
      />
    </div>

    <Image
      src={`/home/vespa.png`}
      alt="Wally Vespa"
      width={250}
      height={250}
      className="absolute bottom-0 -left-20 max-md:hidden"
    />
  </m.div>
);

const CardImbal = () => (
  <m.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
    className="relative rounded-3xl bg-linear-to-tl from-purple-300 to-purple-200 shadow-xl"
  >
    <div className="relative h-full overflow-hidden rounded-3xl p-10">
      <div className="flex h-full flex-col justify-between gap-6 *:z-10 md:mr-20">
        <h3 className="w-full text-xl font-bold md:text-3xl">
          atau mau coba nabung di{" "}
          <span className="text-secondary">di satu aset aja?</span>
        </h3>

        <Button asChild variant={`secondary`} className="group ml-auto">
          <Link href="/simulasi-imbal-hasil">
            Simulasikan Sekarang{" "}
            <ChevronRight className="transition-transform ease-out group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <Circles className="absolute -bottom-30 -left-30 size-80" />
    </div>

    <Image
      src={`/home/cooking.png`}
      alt="Wally Cooking"
      width={250}
      height={250}
      className="absolute -right-20 bottom-0 max-md:hidden"
    />
  </m.div>
);

export default BelajarInvestasi;
