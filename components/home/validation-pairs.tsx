"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Lightbox, type LightboxItem } from "@/components/site/lightbox";
import { cn } from "@/lib/utils";

type Shot = { src: string; alt: string; crop?: { position: string; origin: string } };
type Pair = {
  name: string;
  location: string;
  design: Shot;
  built: Shot & { label: string };
};

const SIZES = "(min-width: 1320px) 584px, (min-width: 768px) 50vw, 100vw";

/** Watermark crop: 1.1 from the corner opposite the mark (same approach as the other galleries). */
const cropStyle = (s: Shot): CSSProperties | undefined =>
  s.crop ? { objectPosition: s.crop.position, transformOrigin: s.crop.origin } : undefined;

function Pill({ children, tone }: { children: string; tone: "dark" | "gold" }) {
  return (
    <span
      className={cn(
        "absolute top-3 left-3 rounded-full px-3 py-1.5 type-chip lg:top-4 lg:left-4",
        tone === "dark" ? "bg-black/70 text-white backdrop-blur-sm" : "bg-gold text-ink-fixed",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Before/after pairs. Desktop: design left, built right, a gold arrow on the gap. Mobile: stacked,
 * arrow pointing down. On scroll-in the design fades in, then the built image slides in from the
 * right (CSS `.reveal-fade` / `.reveal-from-right`, off under reduced motion). Each image opens
 * the shared lightbox, which steps through all images in order.
 */
export function ValidationPairs({ pairs, designLabel }: { pairs: readonly Pair[]; designLabel: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const items: LightboxItem[] = pairs.flatMap((p) => [
    { key: `${p.name}-design`, src: p.design.src, alt: p.design.alt, title: p.name, label: designLabel, meta: p.location },
    { key: `${p.name}-built`, src: p.built.src, alt: p.built.alt, title: p.name, label: p.built.label, meta: p.location },
  ]);

  const shot = (s: Shot, index: number, label: string, tone: "dark" | "gold", reveal: string) => (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => setOpen(index)}
      className={cn("group relative block aspect-[16/10] w-full overflow-hidden rounded-sm bg-white/5", reveal)}
    >
      <Image
        src={s.src}
        alt={s.alt}
        fill
        sizes={SIZES}
        className={cn(
          "object-cover transition-transform duration-700 ease-arch motion-reduce:transition-none",
          s.crop ? "scale-110 group-hover:scale-[1.155] motion-reduce:group-hover:scale-110" : "group-hover:scale-105 motion-reduce:group-hover:scale-100",
        )}
        style={cropStyle(s)}
      />
      <Pill tone={tone}>{label}</Pill>
      <span className="sr-only">Open larger image</span>
    </button>
  );

  return (
    <>
      <ul className="mt-12 space-y-20 lg:mt-16">
        {pairs.map((p, i) => (
          <li key={p.name}>
            <Reveal>
              <div className="relative grid gap-2 md:grid-cols-2">
                {shot(p.design, i * 2, designLabel, "dark", "reveal-fade")}
                {shot(p.built, i * 2 + 1, p.built.label, "gold", "reveal-from-right")}
                {/* Arrow on the gap: right on desktop, down when stacked */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-ink-fixed ring-4 ring-night"
                >
                  <ArrowRight strokeWidth={1.5} className="size-5 max-md:rotate-90" />
                </span>
              </div>
              <p className="mt-5 font-display text-xl leading-tight font-medium tracking-[-0.015em] text-white">{p.name}</p>
              <p className="mt-1 text-base text-mist">{p.location}</p>
            </Reveal>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={open} onIndex={setOpen} />
    </>
  );
}
