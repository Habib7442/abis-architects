"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Lightbox, type LightboxItem } from "@/components/site/lightbox";
import { projectStatusLabel, type Project, type ProjectCategory, type ProjectStatus } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

const FADE_MS = 200;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Grid spans so every filter result tiles with no holes (the first card is always featured):
 * - lg, 3 columns: n%3==0 → featured 2×2; n%3==1 → featured full width, 2 rows;
 *   n%3==2 → featured 2×2 and the next card 1×2.
 * - md, 2 columns: featured full width, 2 rows; if the rest is odd, the last card spans 2.
 * - Mobile: one column, 4:3 cards.
 */
function spanClasses(i: number, n: number) {
  const md =
    i === 0 ? "md:col-span-2 md:row-span-2" : i === n - 1 && (n - 1) % 2 === 1 ? "md:col-span-2" : "md:col-span-1";
  let lg = "lg:col-span-1 lg:row-span-1";
  if (i === 0) lg = n % 3 === 1 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-2 lg:row-span-2";
  else if (i === 1 && n % 3 === 2) lg = "lg:col-span-1 lg:row-span-2";
  return cn(md, lg);
}

/** Watermark crop (1.1 from the opposite corner) with the 1.05 hover zoom on top. */
function imageStyle(p: Project): CSSProperties | undefined {
  const crop = p.image.crop;
  return crop ? { objectPosition: crop.position, transformOrigin: crop.origin } : undefined;
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 type-chip text-white backdrop-blur-sm">
      <span
        aria-hidden
        className={cn("size-2 rounded-full", status === "completed" ? "bg-success" : "bg-warning")}
      />
      {projectStatusLabel[status]}
    </span>
  );
}

function toLightboxItem(p: Project): LightboxItem {
  return {
    key: p.slug,
    src: p.image.src,
    alt: p.image.alt,
    title: p.name,
    label: p.category,
    meta:
      p.location || p.status ? (
        <>
          {p.location && <span>{p.location}</span>}
          {p.status && <StatusBadge status={p.status} />}
        </>
      ) : undefined,
  };
}

export function ProjectsGallery({
  projects,
  categories,
  allLabel,
}: {
  projects: Project[];
  categories: ProjectCategory[];
  allLabel: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState<Filter>("all");
  const [fading, setFading] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const visible = shown === "all" ? projects : projects.filter((p) => p.category === shown);
  const n = visible.length;

  function choose(next: Filter) {
    if (next === filter) return;
    setFilter(next);
    window.clearTimeout(timer.current);
    if (reducedMotion()) {
      setShown(next);
      return;
    }
    // Fade out, swap the cards, fade back in (opacity only).
    setFading(true);
    timer.current = window.setTimeout(() => {
      setShown(next);
      requestAnimationFrame(() => setFading(false));
    }, FADE_MS);
  }

  const tabs: { value: Filter; label: string }[] = [
    { value: "all", label: allLabel },
    ...categories.map((c) => ({ value: c as Filter, label: c })),
  ];

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-2 lg:mt-14">
        {tabs.map((t) => {
          const active = t.value === filter;
          return (
            <button
              key={t.value}
              type="button"
              aria-pressed={active}
              onClick={() => choose(t.value)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-5 text-base font-semibold transition-[background-color,border-color,color] duration-200 ease-arch motion-reduce:transition-none",
                active ? "border-white bg-white text-ink-fixed" : "border-white/35 text-white hover:border-white/70",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {`Showing ${n} ${n === 1 ? "project" : "projects"}`}
      </p>

      <Reveal>
        <ul
          className={cn(
            "mt-8 grid grid-cols-1 gap-4 md:auto-rows-[240px] md:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-3 lg:gap-5",
            "transition-opacity duration-200 ease-arch motion-reduce:transition-none",
            fading && "opacity-0",
          )}
        >
          {visible.map((p, i) => (
            <li key={p.slug} className={cn("reveal-item max-md:aspect-[4/3]", spanClasses(i, n))} style={{ "--i": i } as CSSProperties}>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setOpen(i)}
                className="group relative block size-full overflow-hidden rounded-sm bg-white/5 text-left"
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                  className={cn(
                    "object-cover transition-transform duration-700 ease-arch motion-reduce:transition-none",
                    p.image.crop
                      ? "scale-110 group-hover:scale-[1.155] motion-reduce:group-hover:scale-110"
                      : "group-hover:scale-105 motion-reduce:group-hover:scale-100",
                  )}
                  style={imageStyle(p)}
                />
                {/* Only the bottom half is shaded (for the text); the rest stays at full brightness. */}
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 to-transparent" />

                {p.status && (
                  <span className="absolute top-4 left-4">
                    <StatusBadge status={p.status} />
                  </span>
                )}

                <span
                  aria-hidden
                  className="absolute top-4 right-4 grid size-10 translate-y-1 place-items-center rounded-full bg-white text-ink-fixed opacity-0 transition-[opacity,transform] duration-300 ease-arch group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
                >
                  <ArrowUpRight strokeWidth={1.5} className="size-5" />
                </span>

                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 lg:p-6">
                  <span className="type-chip text-gold [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">{p.category}</span>
                  <span className={cn("font-display [text-shadow:0_1px_12px_rgb(0_0_0/0.55)] leading-tight font-medium tracking-[-0.015em] text-white", i === 0 ? "text-[clamp(22px,2.2vw,32px)]" : "text-xl")}>
                    {p.name}
                  </span>
                  {/* Unconfirmed locations are hidden (TODO(content) in lib/content/projects.ts). */}
                  {p.location && <span className="text-base text-mist">{p.location}</span>}
                  <span className="sr-only">Open larger image</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <Lightbox items={visible.map(toLightboxItem)} index={open} onIndex={setOpen} noun="project" />
    </>
  );
}
