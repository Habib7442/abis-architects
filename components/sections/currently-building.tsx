"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StatusBadge } from "@/components/projects/status-badge";
import { Lightbox, type LightboxItem } from "@/components/site/lightbox";
import { currentlyBuilding } from "@/lib/projects";
import { cn } from "@/lib/utils";

const COPY = {
  title: "Currently building",
  lead: "Real sites, in progress right now.",
};

/**
 * "Currently building" row (prompts/011), shared by Home and /projects. Uses theme tokens only,
 * so it is dark inside an always-dark band ([data-theme="dark"]) and follows the page mode
 * elsewhere. Horizontal snap row (~3.5 cards desktop, ~1.2 mobile), arrow buttons on desktop,
 * hidden scrollbar. The Grand Villa card links to its page; the others open the lightbox.
 */
export function CurrentlyBuilding({ className, headingLevel = "h2" }: { className?: string; headingLevel?: "h2" | "h3" }) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [open, setOpen] = useState<number | null>(null);
  const Heading = headingLevel;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () =>
      setEdge({ start: row.scrollLeft <= 2, end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 2 });
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const row = rowRef.current;
    const card = row?.querySelector("li");
    if (!row || !card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduced ? "auto" : "smooth" });
  };

  // Lightbox moves through the photo cards only (the villa card is a link).
  const photos = currentlyBuilding.filter((b) => !b.href);
  const items: LightboxItem[] = photos.map(({ image }) => ({
    key: image.id,
    src: image.src,
    alt: image.alt,
    title: COPY.title,
    label: image.category,
    meta: image.location ?? undefined,
  }));

  const arrowBtn =
    "grid size-11 place-items-center rounded-full border border-line text-ink transition-[border-color,opacity] duration-300 ease-arch hover:border-ink disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none";

  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-6">
        <div>
          <Heading className="flex items-center gap-3 font-display text-[clamp(22px,2vw,28px)] leading-tight font-medium tracking-[-0.015em] text-ink">
            <span aria-hidden className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-[#e0893a] opacity-60 motion-safe:animate-ping" />
              <span className="relative size-2.5 rounded-full bg-[#e0893a]" />
            </span>
            {COPY.title}
          </Heading>
          <p className="mt-2 text-base text-slate">{COPY.lead}</p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" aria-label="Scroll back" disabled={edge.start} onClick={() => scroll(-1)} className={arrowBtn}>
            <ArrowLeft aria-hidden strokeWidth={1.5} className="size-5" />
          </button>
          <button type="button" aria-label="Scroll forward" disabled={edge.end} onClick={() => scroll(1)} className={arrowBtn}>
            <ArrowRight aria-hidden strokeWidth={1.5} className="size-5" />
          </button>
        </div>
      </div>

      <Reveal>
        <ul
          ref={rowRef}
          aria-label={COPY.title}
          className={cn(
            "scrollbar-none mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain lg:gap-5",
            // ~1.2 cards on phones, ~2.3 on tablets, ~3.5 on desktop
            "[--cards:1.2] md:[--cards:2.3] lg:[--cards:3.5]",
          )}
        >
          {currentlyBuilding.map((b, i) => {
            const img = b.image;
            const card = (
              <>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 768px) 42vw, 82vw"
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                  className="object-cover transition-transform duration-700 ease-arch group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <StatusBadge status="under-construction" className="absolute top-4 left-4" />
                {(img.location || b.title) && (
                  <>
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-5 text-left [text-shadow:0_1px_10px_rgb(0_0_0/0.5)]">
                      {b.title && <span className="block font-display text-lg leading-tight font-medium text-white">{b.title}</span>}
                      {img.location && <span className="mt-1 block text-base text-white/85">{img.location}</span>}
                    </span>
                  </>
                )}
                {b.href && (
                  <span
                    aria-hidden
                    className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white text-ink-fixed transition-transform duration-300 ease-arch group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  >
                    <ArrowUpRight strokeWidth={1.5} className="size-5" />
                  </span>
                )}
              </>
            );
            const boxClass = "group relative block aspect-[4/5] w-full overflow-hidden rounded-sm bg-concrete-2";
            return (
              <li
                key={img.id}
                className="reveal-item shrink-0 snap-start basis-[calc((100%-(var(--cards)-1)*1rem)/var(--cards))] lg:basis-[calc((100%-(var(--cards)-1)*1.25rem)/var(--cards))]"
                style={{ "--i": i } as CSSProperties}
              >
                {b.href ? (
                  <Link href={b.href} className={boxClass}>
                    {card}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`Open photo: ${img.alt}`}
                    onClick={() => setOpen(photos.indexOf(b))}
                    className={boxClass}
                  >
                    {card}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>

      <Lightbox items={items} index={open} onIndex={setOpen} noun="photo" />
    </div>
  );
}
