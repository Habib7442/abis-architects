import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { ValidationPairs } from "@/components/home/validation-pairs";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/chip";
import { home } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const item = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Home "Design vs Reality" (prompts/009): 3D render next to the real building. Always dark
 * (`bg-night` + `data-theme="dark"`), like "Our projects".
 */
export function DesignVsReality() {
  const c = home.designVsReality;
  return (
    <section data-theme="dark" aria-labelledby="design-vs-reality-title" className="bg-night py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1320px] px-(--pad)">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="reveal-item">{c.eyebrow}</Eyebrow>
            <h2
              id="design-vs-reality-title"
              className="reveal-item mt-6 font-display text-[clamp(30px,3.4vw,52px)] leading-[1.1] font-medium tracking-[-0.02em] text-white"
              style={item(1)}
            >
              {c.titleLead}{" "}
              <em className="font-serif text-[1.08em] font-normal tracking-normal whitespace-nowrap text-gold italic">
                {c.titleAccent}
              </em>
            </h2>
          </div>
          <p className="reveal-item max-w-[46ch] text-[17px] leading-[1.6] text-mist lg:col-span-5 lg:pb-2" style={item(2)}>
            {c.lead}
          </p>
        </Reveal>

        <ValidationPairs pairs={c.pairs} designLabel={c.designLabel} />

        <Reveal className="mt-16 flex flex-col items-center gap-6 text-center lg:mt-20">
          <p className="reveal-item flex max-w-[52ch] items-start gap-3 text-left text-base leading-[1.6] text-mist sm:items-center">
            <CircleCheck aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-gold sm:mt-0" />
            {c.proof}
          </p>
          <Link href={c.viewAll.href} className={cn(buttonVariants({ variant: "pill-light", size: "pill" }), "reveal-item")} style={item(1)}>
            {c.viewAll.label}
            <ArrowRight aria-hidden strokeWidth={1.5} className="transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
