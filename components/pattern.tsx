import { cn } from "@/lib/utils";
import Image from "next/image";

export function Pattern(props: { className?: string }) {
  return (
    <Image
      src="/pattern.png"
      alt="Background Image"
      width={1920}
      height={1080}
      className={cn("absolute bottom-0 left-0 h-full -z-10", props.className)}
    />
  );
}
