"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Lightbox, type LightboxItem } from "@/components/site/lightbox";
import { cropStyle, WATERMARK_SCALE, type GalleryCategory, type ProjectImage } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Filter = GalleryCategory | "all";
const FADE_MS = 200;
const GAP_PX = 16;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Shortest-column-first distribution from the known ratios. Items only ever append to a column,
 * so "Load more" adds to the bottom and never moves what is already on screen.
 */
function distribute(items: ProjectImage[], cols: number) {
  const heights = new Array(cols).fill(0);
  const out: { img: ProjectImage; index: number }[][] = Array.from({ length: cols }, () => []);
  items.forEach((img, index) => {
    const c = heights.indexOf(Math.min(...heights));
    out[c].push({ img, index });
    heights[c] += img.height / img.width + GAP_PX / 400;
  });
  return out;
}

/**
 * Masonry gallery with optional sticky category filters, "Load more" paging and the shared
 * lightbox (which moves through the whole current filter). Three column layouts (1 / 2 / 3)
 * are rendered and shown per breakpoint with CSS, so there is no layout jump on hydration;
 * lazy images in the hidden layouts (display:none) are never fetched.
 */
export function MasonryGallery({
  images,
  categories,
  allLabel = "All",
  pageSize,
  loadMoreLabel = "Load more",
  filterLabel = "Filter projects",
}: {
  images: ProjectImage[];
  /** Omit to hide the filter bar. */
  categories?: GalleryCategory[];
  allLabel?: string;
  /** Omit to show every image. */
  pageSize?: number;
  loadMoreLabel?: string;
  filterLabel?: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState<Filter>("all");
  const [fading, setFading] = useState(false);
  const [count, setCount] = useState(pageSize ?? images.length);
  const [open, setOpen] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = shown === "all" ? images : images.filter((i) => i.category === shown);
  const visible = filtered.slice(0, count);
  const remaining = filtered.length - visible.length;

  function choose(next: Filter) {
    if (next === filter) return;
    setFilter(next);
    window.clearTimeout(timer.current);
    const swap = () => {
      setShown(next);
      setCount(pageSize ?? images.length);
      // If the filter bar is stuck (gallery scrolled), bring the grid's top back into view.
      const top = topRef.current;
      if (top) {
        const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 78;
        const y = top.getBoundingClientRect().top + window.scrollY - headerH;
        if (window.scrollY > y) window.scrollTo({ top: y, behavior: reducedMotion() ? "auto" : "smooth" });
      }
    };
    if (reducedMotion()) {
      swap();
      return;
    }
    setFading(true);
    timer.current = window.setTimeout(() => {
      swap();
      requestAnimationFrame(() => setFading(false));
    }, FADE_MS);
  }

  const counts = new Map<Filter, number>([["all", images.length]]);
  categories?.forEach((c) => counts.set(c, images.filter((i) => i.category === c).length));
  const tabs: { value: Filter; label: string }[] = categories
    ? [{ value: "all", label: allLabel }, ...categories.filter((c) => counts.get(c)).map((c) => ({ value: c as Filter, label: c }))]
    : [];

  const tile = ({ img, index }: { img: ProjectImage; index: number }, sizes: string) => {
    const crop = cropStyle(img);
    return (
      <Reveal key={img.id}>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => setOpen(index)}
          className="reveal-item group relative block w-full overflow-hidden rounded-sm bg-concrete-2"
          style={{ aspectRatio: `${img.width} / ${img.height}` }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            placeholder="blur"
            blurDataURL={img.blurDataURL}
            className="scale-(--base-scale) object-cover transition-transform duration-700 ease-arch group-hover:scale-(--hover-scale) motion-reduce:transition-none motion-reduce:group-hover:scale-(--base-scale)"
            style={
              {
                ...crop,
                "--base-scale": crop ? WATERMARK_SCALE : 1,
                "--hover-scale": (crop ? WATERMARK_SCALE : 1) * 1.04,
              } as CSSProperties
            }
          />
          {/* Category label fades in on hover / focus */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 ease-arch group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          />
          <span
            aria-hidden
            className="absolute bottom-4 left-4 translate-y-1 type-chip text-white opacity-0 transition-[opacity,transform] duration-300 ease-arch group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
          >
            {img.category}
          </span>
          <span className="sr-only">Open larger image</span>
        </button>
      </Reveal>
    );
  };

  const items: LightboxItem[] = filtered.map((i) => ({
    key: i.id,
    src: i.src,
    alt: i.alt,
    title: i.category,
    meta: i.location ?? undefined,
  }));

  return (
    <>
      {categories && (
        <div
          role="group"
          aria-label={filterLabel}
          className="sticky top-(--header-h) z-30 -mx-(--pad) border-b border-line bg-concrete/90 px-(--pad) py-3 backdrop-blur-md"
        >
          <div className="scrollbar-none -my-1 flex gap-2 overflow-x-auto py-1">
            {tabs.map((t) => {
              const active = t.value === filter;
              return (
                <button
                  key={t.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(t.value)}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-base font-semibold whitespace-nowrap transition-[background-color,border-color,color] duration-200 ease-arch motion-reduce:transition-none",
                    active ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:border-ink/40",
                  )}
                >
                  {t.label}
                  <span className={cn("text-sm font-medium tabular-nums", active ? "text-paper/70" : "text-slate")}>{counts.get(t.value)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {`Showing ${visible.length} of ${filtered.length} images`}
      </p>

      <div
        ref={topRef}
        className={cn(
          "mt-8 transition-opacity duration-200 ease-arch motion-reduce:transition-none",
          fading && "opacity-0",
        )}
      >
        <div className="flex flex-col gap-4 md:hidden">{visible.map((img, index) => tile({ img, index }, "100vw"))}</div>
        <div className="hidden gap-4 md:flex lg:hidden">
          {distribute(visible, 2).map((col, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-4">
              {col.map((t) => tile(t, "50vw"))}
            </div>
          ))}
        </div>
        <div className="hidden gap-4 lg:flex">
          {distribute(visible, 3).map((col, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-4">
              {col.map((t) => tile(t, "(min-width: 1320px) 390px, 33vw"))}
            </div>
          ))}
        </div>
      </div>

      {remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((n) => n + (pageSize ?? images.length))}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink px-6 text-base font-semibold text-ink transition-colors duration-300 ease-arch hover:bg-ink hover:text-paper motion-reduce:transition-none"
          >
            {loadMoreLabel}
            <span className="text-sm font-medium text-current/70 tabular-nums">({remaining})</span>
          </button>
        </div>
      )}

      <Lightbox items={items} index={open} onIndex={setOpen} />
    </>
  );
}
