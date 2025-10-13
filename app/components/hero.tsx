import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => (
  <Container className="border-b-2 border-accent mt-20 gap-2">
    <div className="flex flex-col max-w-md gap-2">
      <h2 className="text-4xl font-medium">Ada Uang Sisa?</h2>
      <h1 className="text-7xl font-bold">
        <span className="text-primary">Dompetin</span> Aja!
      </h1>

      <p className="mt-10">Mau tau portofolio yang cocok untuk kamu?</p>
      <Button className="font-semibold w-fit" asChild>
        <Link href="/quiz">
          Cari tahu sekarang
          <ArrowRight />
        </Link>
      </Button>
    </div>
  </Container>
);

export default Hero;
