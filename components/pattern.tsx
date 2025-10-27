import { cn } from "@/lib/utils";
import Image from "next/image";

export function Pattern(props: { className?: string }) {
  return (
    <Image
      src="/pattern.png"
      alt="Background Image"
      width={1920}
      height={1080}
      className={cn(
        "absolute bottom-0 left-1/2 -z-10 h-full -translate-x-1/2",
        props.className,
      )}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    />
  );
}
