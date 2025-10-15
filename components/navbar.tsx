"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { name: "Simulasi", href: "/#simulasi" },
  { name: "Informasi", href: "/#informasi" },
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
        `h-20 bg-background/80 backdrop-blur-md flex justify-center items-center fixed top-0 inset-x-0 transition-all duration-300 ease-out z-50`,
        isScrolled && "shadow-md inset-x-6 top-6 rounded-2xl",
      )}
    >
      <div className="flex justify-between items-center w-full px-6 sm:px-8">
        <h1 className="font-bold text-lg text-primary">Dompetin</h1>

        <div className="flex gap-4">
          {LINKS.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
