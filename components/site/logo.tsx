import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Header lockup: the client's gold "abis" monogram (raster, from abis_construction_logo_square.webp)
 * with the name set as live text beside it. At header size the logo's own 3D wordmark is only
 * ~7px tall and smudges on 1× screens, so the name is typeset in ink instead: sharp at any DPI.
 * The full raster lockup (/brand/abis-logo.webp) is for larger uses (footer, OG image, PDFs).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="The ABIS Construction, home"
      className={cn("inline-flex min-h-11 items-center gap-3 rounded-sm", className)}
    >
      <Image
        src="/brand/abis-mark.webp"
        alt=""
        width={517}
        height={240}
        loading="eager"
        sizes="96px"
        className="h-9 w-auto lg:h-10"
      />
      <span aria-hidden className="border-l border-line pl-3 font-display leading-none text-ink uppercase">
        <span className="block text-[13px] font-extrabold tracking-[0.12em] lg:text-[14px]">The ABIS</span>
        <span className="mt-1 block text-[10px] font-semibold tracking-[0.24em] text-slate lg:text-[11px]">
          Construction
        </span>
      </span>
    </Link>
  );
}
