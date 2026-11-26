import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { HeroParallax } from "@/components/home/hero-parallax";
import { RotatingPhrase } from "@/components/home/rotating-phrase";
import { buttonVariants } from "@/components/ui/button";
import { estimateHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const PHRASES = ["that last.", "families love.", "built to stand strong."] as const;

// One description for both versions; the night render is a duplicate (alt="").
const HERO_ALT = "A row of three modern two-storey homes with pitched roofs, balconies and gardens";
const HERO_SIZES = "(min-width: 1080px) 100vw, 782px";

/** Stagger index for the entrance animation. */
const rise = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Home hero (DESIGN §7.11), calm Pentaclay-style.
 *
 * - Sky: the section background fades from paper (top) to the photo's sky colour; the photo's
 *   top 40% is masked in, so there is no visible seam or dark band.
 * - The photo is pinned to the bottom at full width (cover). Roofs start ~43% down the photo,
 *   so the text's bottom padding reserves 57% of the photo's height and the text can never
 *   sit on the roofs.
 * - Day photo in light mode, night render in dark mode (prompts/005). Both share one box, so
 *   nothing moves on a switch; CSS crossfades them (globals.css, `.hero-night`). The night
 *   layer is display:none in light mode, so its lazy image is only fetched in dark mode.
 * - Dark mode: the night sky's top 40% is masked into --hero-base (#0E1012).
 * - The bottom fades into the next section's background in the active mode (80px light,
 *   120px dark), so there is no hard line.
 *
 * --hero-img-h  rendered photo height (>= 100vw / 1.777, so cover always scales by height)
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        "relative isolate flex min-h-svh flex-col overflow-hidden bg-(--hero-base)",
        // Mobile: a larger photo so the centre house fills the space under the buttons.
        "[--hero-img-h:max(56.25vw,min(520px,62svh))]",
      )}
    >
      {/* Day sky: paper at the top to the photo's sky colour (fades out in dark mode) */}
      <div
        aria-hidden
        className="hero-xfade hero-day absolute inset-0 -z-30 bg-[linear-gradient(to_bottom,var(--paper)_0%,var(--hero-sky)_52%)]"
      />

      {/* Photo, bottom-anchored: day and night in the same box */}
      <HeroParallax className="absolute inset-x-0 bottom-0 -z-20 h-(--hero-img-h)">
        <div className="anim-fade relative size-full mask-[linear-gradient(to_bottom,transparent_0%,black_40%)]">
          <Image
            src="/hero/hero-desktop.webp"
            alt={HERO_ALT}
            fill
            sizes={HERO_SIZES}
            loading="eager"
            fetchPriority="high"
            className="hero-xfade hero-day object-cover object-[50%_100%]"
          />
          <div className="hero-xfade hero-night absolute inset-0">
            <Image
              src="/hero/hero-dark.webp"
              alt=""
              fill
              sizes={HERO_SIZES}
              // Lazy, so light mode (display:none) never fetches it; high priority, because in
              // dark mode it is the LCP (Next docs: theme images use fetchPriority, not eager).
              loading="lazy"
              fetchPriority="high"
              className="object-cover object-[50%_100%]"
            />
          </div>
        </div>
      </HeroParallax>

      {/* Soft fade into the next section (a solid colour through a mask, so it fades with the theme) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-(--hero-fade-h) bg-(--page-below-hero) mask-[linear-gradient(to_bottom,transparent,black)]"
      />

      {/* Text: confined to the sky above the houses */}
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-[1320px] flex-1 flex-col items-center px-(--pad) text-center",
          "pt-[calc(var(--header-h)+clamp(24px,4.5svh,62px))]",
          "pb-[calc(var(--hero-img-h)*0.57+clamp(20px,3svh,48px))]",
        )}
      >
        {/* Size also follows viewport height so the text clears the roofs on short laptop screens. */}
        <h1
          id="hero-title"
          style={rise(0)}
          className="anim-rise font-display text-[clamp(44px,min(5.75vw,7.2svh),88px)] leading-[1.04] font-medium tracking-[-0.03em] text-(--hero-heading)"
        >
          <span className="sr-only">We design and build homes {PHRASES[0]}</span>
          <span aria-hidden className="block">
            We design and build homes
          </span>
          {/* Fixed-width box (longest phrase), phrase centred inside: nothing else ever moves. */}
          <span aria-hidden className="block font-serif font-normal tracking-[-0.01em] text-(--hero-accent) italic">
            <RotatingPhrase phrases={PHRASES} />
          </span>
        </h1>

        <p style={rise(1)} className="anim-rise mt-6 text-[17px] leading-[1.55] font-medium text-(--hero-lead)">
          From Silchar to across India. Design, construction and interiors by one team.
        </p>

        <div style={rise(2)} className="anim-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href={estimateHref} className={cn(buttonVariants({ variant: "pill-dark", size: "pill" }), "w-full sm:w-auto")}>
            Get free estimate
            <ArrowRight aria-hidden strokeWidth={1.5} className="transition-transform group-hover/button:translate-x-1" />
          </Link>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "pill", size: "pill" }),
              "w-full sm:w-auto",
              // Night: transparent with a light border
              "dark:border-white/40 dark:bg-transparent dark:text-white dark:hover:border-white",
            )}
          >
            See our projects
          </Link>
        </div>
      </div>
    </section>
  );
}
