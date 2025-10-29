"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const LINKS = [
  { name: "Simulasi", href: "/simulasi-imbal-hasil" },
  { name: "Akademi", href: "/pahamin" },
  { name: "Kupas", href: "/kupas" },
  { name: "Tentang Kami", href: "/tentang" },
] as const;

const Navbar = () => {
  return (
    <nav
      className={cn(
        `bg-background fixed inset-x-2 top-2 z-50 flex h-20 items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-out md:inset-x-6 md:top-4`,
      )}
    >
      <div className="flex w-full items-center justify-between px-6 sm:px-8">
        <Link
          href={`/`}
          className="text-secondary flex items-center text-lg font-bold"
        >
          <Image src="/logo.svg" alt="Dompetin" width={32} height={32} />
          Dompetin
        </Link>

        <DesktopLinks />
      </div>
    </nav>
  );
};

const DesktopLinks = () => {
  return (
    <div className="flex gap-1 max-md:hidden">
      {LINKS.map((link) => (
        <Button
          key={link.href}
          variant={"ghost"}
          asChild
          className={`font-bold text-neutral-700`}
        >
          <Link href={link.href}>{link.name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default Navbar;
