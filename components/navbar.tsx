import Link from "next/link";
import { Button } from "./ui/button";

const LINKS = [
  { name: "Simulasi", href: "/#simulasi" },
  { name: "Informasi", href: "/#informasi" },
] as const;

const Navbar = () => {
  return (
    <nav className="h-20 flex justify-center items-center fixed top-0 left-0 w-screen bg-white">
      <div className="flex justify-between items-center w-full px-6 sm:px-8">
        <h1 className="font-bold text-lg">Dompetin</h1>

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
