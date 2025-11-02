import { Pattern } from "@/components/pattern";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  {
    label: "Simulasi",
    href: "/simulasi-portofolio",
  },
  {
    label: "Akademi",
    href: "/akademi",
  },
  {
    label: "Kupas",
    href: "/kupas",
  },
  {
    label: "Tentang Kami",
    href: "/tentang",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
] as const;

const Footer = () => (
  <footer className="bg-secondary text-background relative mt-40 flex w-full flex-col gap-8 overflow-clip px-6 py-12 pt-40 md:flex-row md:justify-between md:px-14">
    <div
      className="bg-background absolute -top-20 left-1/2 z-30 h-40 w-[150vw] -translate-x-1/2 md:w-[102vw]"
      style={{ borderRadius: "0 0 50% 50%" }}
    />

    <div className="z-20 space-y-4">
      <div className="flex items-center gap-2">
        <Image src={"/logo.svg"} alt="Dompetin Logo" width={40} height={40} />
        <p className="text-xl font-bold text-white">Dompetin</p>
      </div>

      <p>
        Ada uang sisa? <strong>Dompetin Aja</strong>
      </p>

      <div>
        <Link
          href={"https://www.instagram.com/dompetin.aja/"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/80 transition-colors"
        >
          <Instagram />
        </Link>
      </div>
    </div>

    <div className="border-background z-20 flex flex-col justify-center gap-2 *:font-bold md:border-l md:pl-10">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-white hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </div>

    <Pattern className="from-secondary -bottom-30 z-10 h-auto bg-linear-to-b to-transparent opacity-10" />
  </footer>
);

export { Footer };
