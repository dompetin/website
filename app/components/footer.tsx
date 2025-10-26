import { Pattern } from "@/components/pattern";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
] as const;

const Footer = () => (
  <footer className="bg-secondary relative overflow-clip text-background flex flex-col md:flex-row md:justify-between gap-8 pt-40 px-6 md:px-14 py-12 mt-40">
    <div
      className="absolute -top-20 left-1/2 z-30 -translate-x-1/2 bg-background w-[150vw] md:w-[102vw] h-40"
      style={{ borderRadius: "0 0 50% 50%" }}
    />

    <div className="space-y-4 z-20">
      <div className="flex items-center gap-2">
        <Image src={"/logo.svg"} alt="Dompetin Logo" width={40} height={40} />
        <p className="font-bold text-xl text-white">Dompetin</p>
      </div>

      <p>
        Ada uang sisa? <strong>Dompetin Aja</strong>
      </p>

      <div>
        <Instagram />
      </div>
    </div>

    <div className="flex flex-col z-20 justify-center gap-2 md:pl-10 md:border-l border-background *:font-bold">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="mx-4 text-white hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </div>

    <Pattern className="z-10 h-auto -bottom-30 bg-gradient-to-b from-secondary to-transparent opacity-30" />
  </footer>
);

export { Footer };
