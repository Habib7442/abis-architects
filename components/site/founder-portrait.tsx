import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Camera } from "lucide-react";
import { site, type Person } from "@/lib/site";
import { cn } from "@/lib/utils";

/** A 3:4 portrait, or a marked placeholder until ABIS supplies the photo. */
function PortraitPhoto({ person, sizes }: { person: Person; sizes: string }) {
  const hasPhoto = existsSync(path.join(process.cwd(), "public", person.photo));
  if (hasPhoto) {
    return (
      // Portraits are transparent cut-outs, so the frame supplies a cool backdrop.
      // Dark mode: a faint radial glow behind the figure and a soft fade at the bottom, so the
      // cut-out's pale edge pixels blend into the panel instead of reading as a halo.
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-concrete-tint">
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,rgb(255_255_255/0.04),transparent_70%)] dark:block"
        />
        <Image
          src={person.photo}
          alt={`Portrait of ${person.name}, ${person.role} of ${site.name}`}
          fill
          sizes={sizes}
          className="object-cover object-top dark:mask-[linear-gradient(to_bottom,black_82%,transparent_100%)]"
        />
      </div>
    );
  }
  return (
    // PLACEHOLDER (AGENTS.md §8): visibly marked until the real photo is in /public
    <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-slate/40 bg-card text-slate">
      <Camera aria-hidden strokeWidth={1.5} className="size-8" />
      <span className="text-base font-medium">Portrait photo</span>
    </div>
  );
}

/** The founder's photo with a white name card overlapping its bottom-left corner (home page). */
export function FounderPortrait({ className, style }: { className?: string; style?: CSSProperties }) {
  const person = site.founder;
  return (
    <figure className={cn("relative mb-6 lg:mb-0", className)} style={style}>
      <PortraitPhoto person={person} sizes="(min-width: 1080px) 40vw, 100vw" />
      <figcaption className="absolute -bottom-6 left-4 rounded-sm border border-line bg-card px-5 py-3.5 shadow-[0_24px_60px_rgb(12_13_13/0.12)] lg:left-6">
        <span className="block font-display text-lg leading-tight font-medium tracking-[-0.02em] text-ink">
          {person.name}
        </span>
        <span className="mt-0.5 block text-base text-slate">{person.role}</span>
      </figcaption>
    </figure>
  );
}

/**
 * The two founders (brothers): same size, side by side, top-aligned, each with a white name
 * card overlapping the photo's bottom-left corner.
 */
export function FoundersPair({ className, style }: { className?: string; style?: CSSProperties }) {
  const people = [site.founder, site.coFounder];
  return (
    <div className={cn("grid grid-cols-2 items-start gap-3 pb-8 sm:gap-5", className)} style={style}>
      {people.map((person) => (
        <figure key={person.photo} className="relative">
          <PortraitPhoto person={person} sizes="(min-width: 1080px) 25vw, 50vw" />
          <figcaption className="absolute -bottom-8 left-2 max-w-[calc(100%-16px)] rounded-sm border border-line bg-card px-3 py-2.5 shadow-[0_24px_60px_rgb(12_13_13/0.12)] sm:left-4 sm:px-4 sm:py-3">
            <span className="block font-display text-base leading-tight font-medium tracking-[-0.02em] text-ink sm:text-lg">
              {person.name}
            </span>
            <span className="mt-0.5 block text-base leading-snug text-slate">{person.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
