import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, Compass, House, MessageCircle, ShieldCheck, Target } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { FoundersPair } from "@/components/site/founder-portrait";
import { StatsRow } from "@/components/site/stats-row";
import { buttonVariants } from "@/components/ui/button";
import { Chip, Eyebrow } from "@/components/ui/chip";
import { about } from "@/lib/content/about";
import { estimateHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
};

const item = (i: number) => ({ "--i": i }) as CSSProperties;

const container = "mx-auto max-w-[1320px] px-(--pad)";
const h2 = "font-display text-[clamp(30px,3.4vw,52px)] leading-[1.1] font-medium tracking-[-0.02em]";
const accent = "font-serif text-[1.08em] font-normal tracking-normal italic";

/** Use the preferred photo once it's in /public, otherwise the real-project fallback. */
function pickImage(img: { preferred: string; preferredAlt: string; fallback: string; fallbackAlt: string }) {
  return existsSync(path.join(process.cwd(), "public", img.preferred))
    ? { src: img.preferred, alt: img.preferredAlt }
    : { src: img.fallback, alt: img.fallbackAlt };
}

/** Full-container 16:9 image. `priority` for the above-the-fold hero (it is the page's LCP). */
function WideImage({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-sm bg-concrete-2", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1320px) 1176px, (min-width: 1080px) 90vw, 100vw"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="object-cover"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ 1. Hero (paper) */
function AboutHero() {
  const { hero } = about;
  const image = pickImage(hero.image);
  return (
    <section
      aria-labelledby="about-hero-title"
      className="bg-paper pt-[calc(var(--header-h)+48px)] pb-16 lg:pt-[calc(var(--header-h)+88px)] lg:pb-24"
    >
      <Reveal className={container}>
        <Chip className="reveal-item" style={item(0)}>
          {hero.chip}
        </Chip>
        <h1
          id="about-hero-title"
          className="reveal-item mt-8 font-display text-[clamp(40px,5vw,76px)] leading-[1.04] font-medium tracking-[-0.03em] text-ink"
          style={item(1)}
        >
          <span className="lg:whitespace-nowrap">{hero.titleLead}</span>{" "}
          <em className={cn(accent, "block")}>{hero.titleAccent}</em>
        </h1>
        <p className="reveal-item mt-6 max-w-[560px] type-lead text-slate lg:mt-8" style={item(2)}>
          {hero.lead}
        </p>
        <WideImage {...image} priority className="reveal-item mt-12 lg:mt-16" />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Founders (concrete) */
function AboutFounders() {
  const { founders } = about;
  return (
    <section aria-labelledby="about-founders-title" className="bg-concrete py-16 lg:py-24">
      <Reveal className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <FoundersPair className="reveal-item lg:col-span-6" style={item(0)} />
          <div className="lg:col-span-6">
            <Chip icon={<House aria-hidden strokeWidth={1.5} />} className="reveal-item" style={item(1)}>
              {founders.chip}
            </Chip>
            <h2 id="about-founders-title" className={cn(h2, "reveal-item mt-6 text-ink")} style={item(2)}>
              {founders.titleLead} <em className={cn(accent, "whitespace-nowrap")}>{founders.titleAccent}</em>
            </h2>
            <div className="mt-8 space-y-5">
              {founders.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={cn("reveal-item max-w-[56ch]", i === 0 ? "type-lead text-ink" : "text-[17px] leading-[1.7] text-slate")}
                  style={item(3 + i)}
                >
                  {p}
                </p>
              ))}
            </div>
            <p className="reveal-item mt-8 flex items-start gap-2.5 border-t border-line pt-5 text-sm leading-relaxed text-slate" style={item(5)}>
              <BadgeCheck aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-ink" />
              <span>
                <span className="block text-ink">{founders.credentials}</span>
                <span className="block tabular-nums">{founders.licences}</span>
              </span>
            </p>
          </div>
        </div>
        <StatsRow revealIndex={6} className="mt-14 lg:mt-20" />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. Vision (ink, dark) */
function AboutVision() {
  const { vision } = about;
  return (
    <section data-theme="dark" aria-labelledby="about-vision-title" className="bg-ink-fixed py-20 text-white lg:py-32">
      <Reveal className={container}>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="reveal-item">{vision.eyebrow}</Eyebrow>
            <h2 id="about-vision-title" className={cn(h2, "reveal-item mt-6 text-white")} style={item(1)}>
              {vision.titleLead} <em className={cn(accent, "text-gold")}>{vision.titleAccent}</em>
            </h2>
          </div>
          <p
            className="reveal-item font-serif text-[clamp(22px,2vw,28px)] leading-snug text-mist italic lg:col-span-4 lg:pb-2 lg:text-right"
            style={item(2)}
          >
            {vision.tagline}
          </p>
        </div>

        {/* The client's Vision poster, shown whole at its own ratio, with the blueprint offset frame (DESIGN §6) */}
        <figure className="reveal-item relative mt-12 lg:mt-16" style={item(3)}>
          <span aria-hidden className="absolute inset-0 hidden translate-x-[18px] translate-y-[18px] rounded-sm border border-gold/40 lg:block" />
          <Image
            src={vision.poster.src}
            alt={vision.poster.alt}
            width={vision.poster.width}
            height={vision.poster.height}
            sizes="(min-width: 1320px) 1176px, (min-width: 1080px) 90vw, 100vw"
            className="relative h-auto w-full rounded-sm"
          />
        </figure>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <p className="reveal-item type-lead text-white/90 lg:col-span-7" style={item(4)}>
            {vision.statement}
          </p>
          <p className="reveal-item flex items-start gap-3 text-base leading-[1.6] text-mist lg:col-span-5 lg:pt-1" style={item(5)}>
            <ShieldCheck aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-gold" />
            {vision.proof}
          </p>
        </div>

        {/* Journey: vertical on mobile, horizontal on desktop, joined by a thin gold line */}
        <div className="mt-16 lg:mt-24">
          <h3 className="reveal-item type-chip text-mist" style={item(6)}>
            {vision.journeyTitle}
          </h3>
          <ol className="relative mt-8 grid gap-10 lg:mt-10 lg:grid-cols-3 lg:gap-8">
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[5px] w-px bg-gold/40 lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
            />
            {vision.journey.map((step, i) => (
              <li key={step.year} className="reveal-item relative pl-9 lg:pt-10 lg:pl-0" style={item(7 + i)}>
                <span aria-hidden className="absolute top-1.5 left-0 size-3 rounded-full bg-gold ring-4 ring-ink-fixed lg:top-0" />
                <p className="font-display text-[clamp(32px,3vw,44px)] leading-none font-medium tracking-[-0.03em] text-gold tabular-nums">
                  {step.year}
                </p>
                <p className="mt-4 font-display text-lg leading-tight font-medium text-white">{step.title}</p>
                <p className="mt-2 max-w-[30ch] text-base leading-[1.6] text-mist">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Mission (paper) */
function AboutMission() {
  const { mission } = about;
  return (
    <section aria-labelledby="about-mission-title" className="bg-paper py-20 lg:py-32">
      <Reveal className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Chip icon={<Target aria-hidden strokeWidth={1.5} />} className="reveal-item" style={item(0)}>
              {mission.chip}
            </Chip>
            <h2 id="about-mission-title" className={cn(h2, "reveal-item mt-6 max-w-[16ch] text-ink")} style={item(1)}>
              One team, from first sketch to <em className={cn(accent, "whitespace-nowrap")}>final key.</em>
            </h2>
          </div>
          <p className="reveal-item max-w-[52ch] text-[17px] leading-[1.7] text-slate lg:col-span-5" style={item(2)}>
            {mission.lead}
          </p>
        </div>

        <div className="mt-14 lg:mt-20">
          <h3 className="reveal-item flex items-center gap-2 type-chip text-slate" style={item(3)}>
            <Compass aria-hidden strokeWidth={1.5} className="size-3.5" />
            {mission.pillarsTitle}
          </h3>
          {/* Hairline grid: the 1px gap shows the border colour between cells */}
          <ol className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {mission.pillars.map((pillar, i) => (
              <li
                key={pillar.title}
                className="reveal-item flex flex-col gap-5 bg-paper p-6 lg:min-h-60 lg:justify-between lg:gap-10 lg:p-7"
                style={item(4 + i)}
              >
                <span className="font-display text-sm font-semibold tracking-[0.04em] text-ink-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-[clamp(20px,1.6vw,22px)] leading-tight font-medium tracking-[-0.015em] text-ink">
                    {pillar.title}
                  </p>
                  <p className="mt-2 text-base leading-[1.55] text-slate">{pillar.text}</p>
                </div>
              </li>
            ))}
            <li className="reveal-item bg-ink-fixed sm:col-span-2 lg:col-span-1" style={item(8)}>
              <Link
                href={estimateHref}
                className="group flex h-full flex-col justify-between gap-5 p-6 text-white focus-visible:outline-gold lg:min-h-60 lg:gap-10 lg:p-7"
              >
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-6 text-gold transition-transform duration-300 ease-arch group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
                />
                <span className="font-display text-[clamp(20px,1.6vw,22px)] leading-tight font-medium tracking-[-0.015em]">
                  Start your project
                </span>
              </Link>
            </li>
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ 5. CTA (concrete) */
function AboutCta() {
  const { cta } = about;
  return (
    <section aria-labelledby="about-cta-title" className="bg-concrete py-20 lg:py-28">
      <Reveal className={cn(container, "flex flex-col items-center text-center")}>
        <h2 id="about-cta-title" className={cn(h2, "reveal-item text-ink")} style={item(0)}>
          {cta.titleLead} <em className={cn(accent, "whitespace-nowrap")}>{cta.titleAccent}</em>
        </h2>
        <p className="reveal-item mt-5 max-w-[48ch] text-balance text-[17px] leading-[1.6] text-slate" style={item(1)}>
          {cta.text}
        </p>
        <div className="reveal-item mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={item(2)}>
          <Link href={estimateHref} className={cn(buttonVariants({ variant: "pill-dark", size: "pill" }), "w-full sm:w-auto")}>
            Get free estimate
            <ArrowRight aria-hidden strokeWidth={1.5} className="transition-transform group-hover/button:translate-x-1" />
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "whatsapp", size: "pill" }), "w-full rounded-full sm:w-auto")}
          >
            <MessageCircle aria-hidden strokeWidth={1.5} />
            Chat on WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutFounders />
      <AboutVision />
      <AboutMission />
      <AboutCta />
    </main>
  );
}
