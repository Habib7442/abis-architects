import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, MessageCircle, Route } from "lucide-react";
import { ProcessSteps } from "@/components/home/process-steps";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { home } from "@/lib/content/home";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const item = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Home "How it works" (DESIGN §2 row 11, concrete; layout from the user's brief, prompts/008,
 * which replaces the horizontal timeline in DESIGN §7.10). Follows the page mode.
 * Desktop: intro column (≈40%) sticks while the five steps (≈60%) scroll past.
 */
export function HowItWorks() {
  const c = home.howItWorks;
  return (
    <section aria-labelledby="how-it-works-title" className="bg-concrete py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-(--pad) lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:col-span-5 lg:self-start">
          <Reveal>
            <Chip icon={<Route aria-hidden strokeWidth={1.5} />} className="reveal-item" style={item(0)}>
              {c.chip}
            </Chip>
            <h2
              id="how-it-works-title"
              className="reveal-item mt-6 font-display text-[clamp(30px,3.4vw,52px)] leading-[1.1] font-medium tracking-[-0.02em] text-ink"
              style={item(1)}
            >
              {c.titleLead}{" "}
              <em className="font-serif text-[1.08em] font-normal tracking-normal whitespace-nowrap italic">{c.titleAccent}</em>
            </h2>
            <p className="reveal-item mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-slate" style={item(2)}>
              {c.lead}
            </p>
            <div className="reveal-item mt-8 flex flex-col gap-3 sm:flex-row" style={item(3)}>
              <Link href={c.estimate.href} className={cn(buttonVariants({ variant: "pill-dark", size: "pill" }), "w-full sm:w-auto")}>
                {c.estimate.label}
                <ArrowRight aria-hidden strokeWidth={1.5} className="transition-transform group-hover/button:translate-x-1" />
              </Link>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "whatsapp", size: "pill" }), "w-full rounded-full sm:w-auto")}
              >
                <MessageCircle aria-hidden strokeWidth={1.5} />
                {c.whatsappLabel}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ProcessSteps steps={c.steps} youGetLabel={c.youGetLabel} />
        </div>
      </div>
    </section>
  );
}
