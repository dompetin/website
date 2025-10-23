import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const BelajarInvestasi = () => (
  <Container className="text-center">
    <h2 className="text-3xl font-bold text-primary">
      Belajar investasi tanpa risiko
    </h2>
    <p>
      Bangun portofoliomu sendiri dan lihat bagaimana uangmu bisa tumbuh dari
      berbagai instrumen mulai dari emas, saham, hingga reksa dana.
    </p>

    <div className="grid grid-cols-1 text-start md:grid-cols-2 gap-4">
      <CardPortofolio />
      <CardImbal />
    </div>

    <Separator className="data-[orientation=horizontal]:h-[2px] mt-10" />
  </Container>
);

const CardPortofolio = () => (
  <div className="rounded-xl flex flex-col justify-between gap-6 bg-gradient-to-tl from-pink-300 to-pink-200 p-6">
    <h3 className="font-bold text-2xl">Mau coba bikin portofoliomu sendiri?</h3>
    <Button asChild className="ml-auto">
      <Link href="/simulasi-portofolio">Simulasikan Sekarang</Link>
    </Button>
  </div>
);

const CardImbal = () => (
  <div className="rounded-xl flex flex-col justify-between gap-6 bg-gradient-to-tl from-purple-300 to-purple-200 p-6">
    <h3 className="font-bold text-2xl">
      Mau lihat hasil dari emas, saham, dan lainnya?
    </h3>
    <Button asChild className="ml-auto">
      <Link href="/simulasi-imbal-hasil">Simulasikan Sekarang</Link>
    </Button>
  </div>
);

export default BelajarInvestasi;
