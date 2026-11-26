import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "@/components/motion/count-up";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Stat = {
  value: number;
  decimals?: number;
  suffix: "" | "+" | "★";
  label: string;
  description: string;
  href?: string;
};

const stats: Stat[] = [
  {
    value: site.yearsExperience,
    suffix: "+",
    label: "Years of experience",
    description: `Designing and building since ${site.foundedYear}.`,
  },
  {
    value: site.designsDelivered,
    suffix: "+",
    label: "Designs delivered",
    description: "Homes, villas, hotels, offices and places of worship.",
  },
  {
    value: site.projectsBuilt,
    suffix: "+",
    label: "Projects built",
    description: "Premium projects built by our own team.",
  },
  {
    value: site.googleRating,
    decimals: 1,
    suffix: "★",
    label: "Google rating",
    description: `From ${site.googleReviewCount} reviews by our clients.`,
    href: site.googleReviewsUrl,
  },
];

function StatValue({ stat }: { stat: Stat }) {
  return (
    <span className="font-display text-[clamp(44px,4.4vw,64px)] leading-none font-medium tracking-[-0.03em] text-ink tabular-nums">
      <CountUp value={stat.value} decimals={stat.decimals} />
      {stat.suffix === "★" ? (
        // Decorative: rating stars are one of the few places gold is used on light surfaces.
        <span aria-hidden className="ml-[0.06em] align-[0.42em] text-[0.5em] text-gold">
          ★
        </span>
      ) : (
        stat.suffix && <span className="text-ink-muted">{stat.suffix}</span>
      )}
    </span>
  );
}

function StatBody({ stat, children }: { stat: Stat; children: ReactNode }) {
  if (!stat.href) return <div className="flex h-full flex-col">{children}</div>;
  return (
    <a
      href={stat.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-sm"
      aria-label={`${stat.label}: ${stat.value} out of 5. ${stat.description} Read reviews on Google (opens in a new tab)`}
    >
      {children}
    </a>
  );
}

/**
 * The four headline stats (DESIGN §7.9 / §7.14), on light surfaces. Items carry `.reveal-item`
 * so a parent <Reveal> staggers them, starting at `revealIndex`.
 */
export function StatsRow({ revealIndex = 0, className }: { revealIndex?: number; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 border-t border-line lg:grid-cols-4", className)}>
      {stats.map((stat, i) => (
        <li
          key={stat.label}
          style={{ "--i": revealIndex + i } as CSSProperties}
          className={cn(
            "reveal-item pt-8 pb-2",
            // Mobile 2×2: a line between the columns and between the rows
            "max-lg:odd:pr-5 max-lg:even:border-l max-lg:even:border-line max-lg:even:pl-5",
            i >= 2 && "max-lg:mt-8 max-lg:border-t max-lg:border-line",
            // Desktop: 4 in a row, lines between
            "lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-line",
          )}
        >
          <StatBody stat={stat}>
            <StatValue stat={stat} />
            <span className="mt-5 block text-base leading-snug font-bold text-ink group-hover:underline group-hover:underline-offset-4">
              {stat.label}
            </span>
            <span className="mt-2 block max-w-[30ch] text-[15px] leading-[1.5] text-slate">
              {stat.description}
            </span>
          </StatBody>
        </li>
      ))}
    </ul>
  );
}
