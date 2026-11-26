"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Lightbox, type LightboxItem } from "@/components/site/lightbox";
import { cropStyle, statusLabel, WATERMARK_SCALE, type GalleryCategory, type ProjectImage, type ProjectStatus } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Filter = GalleryCategory | "all";
type StatusFilter = ProjectStatus | "all";
type Selection = { category: Filter; status: StatusFilter };
const FADE_MS = 200;
const GAP_PX = 16;

/** Filter pill: active = ink (white in dark mode); a pill with nothing to show is disabled. */
function Pill({ label, n, active, small, onClick }: { label: string; n: number; active: boolean; small?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={!active && n === 0}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border text-base font-semibold whitespace-nowrap transition-[background-color,border-color,color,opacity] duration-200 ease-arch disabled:opacity-40 motion-reduce:transition-none",
        small ? "px-3.5" : "px-4",
        active ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:border-ink/40",
      )}
    >
      {label}
      <span className={cn("text-sm font-medium tabular-nums", active ? "text-paper/70" : "text-slate")}>{n}</span>
    </button>
  );
}

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
  statuses,
  allLabel = "All",
  pageSize,
  loadMoreLabel = "Load more",
  filterLabel = "Filter projects",
}: {
  images: ProjectImage[];
  /** Omit to hide the filter bar. */
  categories?: GalleryCategory[];
  /** Status filter (All · Completed · Under construction); only images with a known status match. */
  statuses?: ProjectStatus[];
  allLabel?: string;
  /** Omit to show every image. */
  pageSize?: number;
  loadMoreLabel?: string;
  filterLabel?: string;
}) {
  const [filter, setFilter] = useState<Selection>({ category: "all", status: "all" });
  const [shown, setShown] = useState<Selection>({ category: "all", status: "all" });
  const [fading, setFading] = useState(false);
  const [count, setCount] = useState(pageSize ?? images.length);
  const [open, setOpen] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const topRef = useRef<HTMLDivElement>(null);

  const matches = (i: ProjectImage, sel: Selection) =>
    (sel.category === "all" || i.category === sel.category) && (sel.status === "all" || i.status === sel.status);
  const filtered = images.filter((i) => matches(i, shown));
  const visible = filtered.slice(0, count);
  const remaining = filtered.length - visible.length;

  function choose(change: Partial<Selection>) {
    const next = { ...filter, ...change };
    if (next.category === filter.category && next.status === filter.status) return;
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

  // Each pill's count reflects the other filter's current choice.
  const countFor = (sel: Selection) => images.filter((i) => matches(i, sel)).length;
  const tabs: { value: Filter; label: string; n: number }[] = categories
    ? [
        { value: "all" as Filter, label: allLabel, n: countFor({ ...filter, category: "all" }) },
        ...categories.map((c) => ({ value: c as Filter, label: c as string, n: countFor({ ...filter, category: c }) })),
      ]
    : [];
  const statusTabs: { value: StatusFilter; label: string; n: number }[] = statuses
    ? [
        { value: "all" as StatusFilter, label: "Any status", n: countFor({ ...filter, status: "all" }) },
        ...statuses.map((st) => ({ value: st as StatusFilter, label: statusLabel[st], n: countFor({ ...filter, status: st }) })),
      ]
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
      {(tabs.length > 0 || statusTabs.length > 0) && (
        <div className="sticky top-(--header-h) z-30 -mx-(--pad) flex flex-col gap-1.5 border-b border-line bg-concrete/90 px-(--pad) py-3 backdrop-blur-md">
          {tabs.length > 0 && (
            <div role="group" aria-label={filterLabel} className="scrollbar-none -my-1 flex min-w-0 gap-2 overflow-x-auto py-1">
              {tabs.map((t) => (
                <Pill key={t.value} label={t.label} n={t.n} active={t.value === filter.category} onClick={() => choose({ category: t.value })} />
              ))}
            </div>
          )}
          {statusTabs.length > 0 && (
            <div role="group" aria-label="Filter by status" className="scrollbar-none -my-1 flex gap-2 overflow-x-auto py-1">
              {statusTabs.map((t) => (
                <Pill key={t.value} label={t.label} n={t.n} small active={t.value === filter.status} onClick={() => choose({ status: t.value })} />
              ))}
            </div>
          )}
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
