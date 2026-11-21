import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER wordmark. Replace with the client's vector logo (DESIGN §13) once supplied.
 * Ink on light surfaces; pass tone="gold" on dark surfaces.
 */
export function Logo({ tone = "ink", className }: { tone?: "ink" | "gold"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="The ABIS Architects, home"
      className={cn(
        "inline-flex min-h-11 items-center gap-2.5 rounded-sm",
        tone === "gold" ? "text-gold" : "text-ink",
        className,
      )}
    >
      <span
        aria-hidden
        className="font-display text-[22px] leading-none font-extrabold tracking-[-0.04em] lowercase [font-stretch:115%]"
      >
        abis
      </span>
      <span
        aria-hidden
        className="border-l border-current/25 pl-2 text-[9px] leading-[1.25] font-semibold tracking-[0.16em] uppercase"
      >
        The ABIS
        <br />
        Architects
      </span>
    </Link>
  );
}
