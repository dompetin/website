"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { name: "Simulasi", href: "/simulasi-imbal-hasil" },
  { name: "Akademi", href: "/akademi" },
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
        isScrolled && "shadow-lg inset-x-6 top-6 rounded-full",
      )}
    >
      <div className="flex justify-between items-center w-full px-6 sm:px-8">
        <Link href={`/`} className="font-bold text-lg text-primary">
          Dompetin
        </Link>

        <DesktopLinks />
      </div>
    </nav>
  );
};

const DesktopLinks = () => {
  return (
    <div className="flex gap-4 max-md:hidden">
      {LINKS.map((link) => (
        <Button key={link.href} variant="ghost" asChild>
          <Link href={link.href}>{link.name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default Navbar;
