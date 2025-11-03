import { forwardRef } from "react";
import * as m from "@/lib/motion";
import { cn } from "@/lib/utils";

type CirclesProps = {
  className?: string;
  color?: string;
};

function adjustHex(hexColor: string, amount: number) {
  if (!hexColor.startsWith("#")) {
    return hexColor;
  }

  const normalized = hexColor.replace("#", "");

  if (!(normalized.length === 3 || normalized.length === 6)) {
    return hexColor;
  }

  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const num = Number.parseInt(value, 16);

  if (Number.isNaN(num)) {
    return hexColor;
  }

  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;

  // Blend the channel toward white (amount > 0) or black (amount < 0)
  const mix = (channel: number) => {
    const target = amount > 0 ? 255 : 0;
    const blended = Math.round(channel + (target - channel) * Math.abs(amount));
    const clamped = Math.max(0, Math.min(255, blended));

    return clamped.toString(16).padStart(2, "0");
  };

  return `#${mix(r)}${mix(g)}${mix(b)}`;
}

export const Circles = forwardRef<HTMLDivElement, CirclesProps>(
  ({ className, color = "#a267dd" }, ref) => {
    // First darken the base color, then create lighter shades from it
    const baseColor = adjustHex(color, -0.2);
    const shades = [0.35, 0.15, 0.05].map((step) => adjustHex(baseColor, step));

    return (
      <div ref={ref} className={cn("pointer-events-none", className)}>
        <div className="relative h-full w-full">
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ backgroundColor: shades[0] }}
            className="absolute inset-0 rounded-full"
          />
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            style={{ backgroundColor: shades[1] }}
            className="absolute inset-[12%] rounded-full"
          />
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            style={{ backgroundColor: shades[2] }}
            className="absolute inset-[24%] rounded-full"
          />
        </div>
      </div>
    );
  },
);

Circles.displayName = "Circles";
