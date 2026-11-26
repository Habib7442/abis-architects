import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Building2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { home } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const item = (i: number) => ({ "--i": i }) as CSSProperties;

/** Whole card is the link: hairline border turns ink on hover (both modes, via tokens). */
const card =
  "group flex overflow-hidden rounded-sm border border-line bg-concrete transition-colors duration-300 ease-arch hover:border-ink motion-reduce:transition-none";

/**
 * Base scale 1.1 crops the watermark corner out (origin + position per image, from content);
 * hover adds the 1.04 zoom on top (1.1 × 1.04). Transform only (AGENTS §4).
 */
const zoom =
  "object-cover scale-110 transition-transform duration-700 ease-arch group-hover:scale-[1.144] motion-reduce:transition-none motion-reduce:group-hover:scale-110";

const crop = (img: { position: string; origin: string }) => ({ objectPosition: img.position, transformOrigin: img.origin });

const arrow =
  "size-4 transition-transform duration-300 ease-arch group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0";

/**
 * Home "What we build" (DESIGN §2 row 7, services; layout from the user's brief, prompts/006).
 * Paper section so the concrete cards read as cards. Row 1: the featured Turnkey card (text left,
 * image right). Row 2: four cards, 2×2 from 640px and 4 across from 1024px.
 */
export function WhatWeBuild() {
  const { whatWeBuild: c } = home;
  const { featured } = c;

  return (
    <section aria-labelledby="what-we-build-title" className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-(--pad)">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <Chip icon={<Building2 aria-hidden strokeWidth={1.5} />} className="reveal-item" style={item(0)}>
                {c.chip}
              </Chip>
              <h2
                id="what-we-build-title"
                className="reveal-item mt-6 max-w-[18ch] font-display text-[clamp(30px,3.4vw,52px)] leading-[1.1] font-medium tracking-[-0.02em] text-ink"
                style={item(1)}
              >
                {c.titleLead}{" "}
                <em className="font-serif text-[1.08em] font-normal tracking-normal whitespace-nowrap italic">
                  {c.titleAccent}
                </em>
              </h2>
            </div>
            <p className="reveal-item max-w-[44ch] text-[17px] leading-[1.6] text-slate lg:col-span-5 lg:pb-2" style={item(2)}>
              {c.aside}
            </p>
          </div>

          {/* Row 1: featured */}
          <Link
            href={featured.href}
            className={cn(card, "reveal-item mt-12 flex-col lg:mt-16 lg:grid lg:min-h-[440px] lg:grid-cols-2")}
            style={item(3)}
          >
            <div className="relative order-first h-[240px] overflow-hidden sm:h-[320px] lg:order-last lg:h-auto">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                sizes="(min-width: 1320px) 588px, (min-width: 1024px) 45vw, 100vw"
                className={zoom}
                style={crop(featured.image)}
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-12">
              {/* Gold is text only on dark (contrast); on light it is the short rule, text stays ink. */}
              <p className="flex items-center gap-3 type-chip text-ink dark:text-gold">
                <span aria-hidden className="h-px w-8 bg-gold" />
                {featured.label}
              </p>
              <h3 className="font-display text-[clamp(28px,2.6vw,40px)] leading-[1.1] font-medium tracking-[-0.02em] text-ink">
                {featured.title}
              </h3>
              <p className="max-w-[46ch] text-base leading-[1.65] text-slate">{featured.text}</p>
              {/* Visual button: the whole card is the link. */}
              <span className={cn(buttonVariants({ variant: "pill-dark", size: "pill" }), "mt-2 self-start group-hover:translate-y-0")}>
                {c.linkLabel}
                <ArrowRight aria-hidden strokeWidth={1.5} className={arrow} />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Row 2: its own reveal, so on mobile the cards animate when they reach the screen */}
        <Reveal>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-5 lg:grid-cols-4 lg:gap-5">
            {c.items.map((s, i) => (
              <li key={s.title} className="reveal-item flex" style={item(i)}>
                <Link href={s.href} className={cn(card, "w-full flex-col")}>
                  <div className="relative h-[220px] shrink-0 overflow-hidden">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 1320px) 290px, (min-width: 1024px) 23vw, (min-width: 640px) 50vw, 100vw"
                      className={zoom}
                      style={crop(s.image)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl leading-tight font-medium tracking-[-0.015em] text-ink">{s.title}</h3>
                    <p className="mt-2 text-base leading-[1.55] text-slate">{s.text}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-base font-semibold text-ink">
                      {c.linkLabel}
                      <ArrowRight aria-hidden strokeWidth={1.5} className={arrow} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
