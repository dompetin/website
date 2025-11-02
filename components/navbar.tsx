"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const LINKS = [
  { name: "Simulasi", href: "/simulasi-portofolio" },
  { name: "Akademi", href: "/akademi" },
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

        <div className="flex items-center gap-2">
          <MobileLinks />
          <DesktopLinks />
        </div>
      </div>
    </nav>
  );
};

const MobileLinks = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-muted/70">
            <MenuIcon className="size-5" />
            <span className="sr-only">Buka menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="border-border inset-y-2 right-2 h-auto rounded-3xl p-0"
        >
          <SheetHeader className="border-border border-b p-6">
            <SheetTitle className="">
              <Link
                href={`/`}
                className="text-secondary flex items-center text-lg font-bold"
              >
                <Image src="/logo.svg" alt="Dompetin" width={32} height={32} />
                Dompetin
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 p-4">
            {LINKS.map((link) => (
              <SheetClose asChild key={link.href}>
                <Button
                  variant="ghost"
                  asChild
                  className="justify-start px-4 py-3 text-base font-semibold"
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
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
          className={`hover:text-primary text-sm font-bold text-neutral-700 hover:bg-transparent max-lg:px-2 lg:text-lg`}
        >
          <Link href={link.href}>{link.name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default Navbar;
