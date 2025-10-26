"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS = [
  { name: "Simulasi", href: "/simulasi-imbal-hasil" },
  { name: "Akademi", href: "/pahamin" },
  { name: "Kupas", href: "/kupas" },
  { name: "Tentang Kami", href: "/tentang" },
] as const;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        `h-20 bg-background flex justify-center items-center fixed top-0 inset-x-0 transition-all duration-300 ease-out z-50`,
        isScrolled &&
          "shadow-lg top-2 inset-x-2 md:inset-x-6 md:top-6 rounded-full"
      )}>
      <div className="flex justify-between items-center w-full px-6 sm:px-8">
        <Link
          href={`/`}
          className="font-bold text-lg flex items-center text-secondary">
          <Image src="/logo.svg" alt="Dompetin" width={32} height={32} />
          Dompetin
        </Link>

        <DesktopLinks />
      </div>
    </nav>
  );
};

const DesktopLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 max-md:hidden">
      {LINKS.map((link) => (
        <Button
          key={link.href}
          variant={pathname === link.href ? "default" : "ghost"}
          asChild
          className={`font-bold ${
            pathname !== link.href && "text-neutral-600"
          }`}>
          <Link href={link.href}>{link.name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default Navbar;
