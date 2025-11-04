"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { Frown, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-2 text-center">
      <h2 className="text-5xl flex items-center gap-2 font-bold">Ups! Ada kesalahan terjadi <Frown className="size-12" /> </h2>
      <p className="text-muted-foreground">
        Sepertinya ada kesalahan yang terjadi. Silahkan coba lagi.
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="mt-4"
      >
        <RotateCcw />
        Coba Lagi
      </Button>
    </main>
  );
}
