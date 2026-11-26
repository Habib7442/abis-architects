import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, CircleCheck, House } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { FounderPortrait } from "@/components/site/founder-portrait";
import { StatsRow } from "@/components/site/stats-row";
import { Chip } from "@/components/ui/chip";
import { home } from "@/lib/content/home";

const item = (i: number) => ({ "--i": i }) as CSSProperties;

export function FounderStats() {
  const { about } = home;
  return (
    <section aria-labelledby="about-title" className="bg-concrete pt-16 pb-16 lg:pt-24 lg:pb-24">
      <Reveal className="mx-auto max-w-[1320px] px-(--pad)">
        {/* Desktop: the text column stretches to the photo's height; intro sits at the top,
            trust points + link at the bottom, so there's no empty gap under the text. */}
        <div className="grid gap-14 lg:grid-cols-12 lg:items-stretch lg:gap-16">
          <FounderPortrait className="reveal-item lg:col-span-5" style={item(0)} />

          <div className="flex flex-col gap-10 lg:col-span-7 lg:justify-between lg:gap-12">
            <div>
              <Chip as="h2" id="about-title" icon={<House aria-hidden strokeWidth={1.5} />} className="reveal-item" style={item(1)}>
                {about.chip}
              </Chip>
              <p
                className="reveal-item mt-6 max-w-[34ch] font-display text-[clamp(24px,2.3vw,32px)] leading-[1.3] font-normal tracking-[-0.015em] text-ink"
                style={item(2)}
              >
                {about.leadBefore}{" "}
                <em className="font-serif text-[1.08em] font-normal tracking-normal whitespace-nowrap">{about.leadAccent}</em>{" "}
                {about.leadAfter}
              </p>
            </div>

            <div>
              <ul className="border-t border-line">
                {about.trustPoints.map((point, i) => (
                  <li
                    key={point}
                    className="reveal-item flex items-center gap-3 border-b border-line py-4 text-base leading-snug text-ink"
                    style={item(3 + i)}
                  >
                    <CircleCheck aria-hidden strokeWidth={1.5} className="size-5 shrink-0 text-ink" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={about.link.href}
                className="reveal-item group mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-ink underline-offset-4 hover:underline"
                style={item(6)}
              >
                {about.link.label}
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-300 ease-arch group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </div>
        </div>

        <StatsRow revealIndex={7} className="mt-14 lg:mt-20" />
      </Reveal>
    </section>
  );
}
