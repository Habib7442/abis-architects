import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Light closing CTA: heading with an italic accent, a line, estimate + WhatsApp buttons. */
export function CtaBand({
  id,
  titleLead,
  titleAccent,
  text,
  estimateLabel,
  estimateHref,
  whatsappLabel,
  className,
}: {
  id: string;
  titleLead: string;
  titleAccent: string;
  text: string;
  estimateLabel: string;
  estimateHref: string;
  whatsappLabel: string;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("bg-concrete py-16 lg:py-24", className)}>
      <Reveal className="mx-auto flex max-w-[1320px] flex-col items-center px-(--pad) text-center">
        <h2
          id={id}
          className="reveal-item font-display text-[clamp(30px,3.4vw,52px)] leading-[1.1] font-medium tracking-[-0.02em] text-ink"
        >
          {titleLead}{" "}
          <em className="font-serif text-[1.08em] font-normal tracking-normal whitespace-nowrap italic">{titleAccent}</em>
        </h2>
        <p className="reveal-item mt-5 max-w-[48ch] text-[17px] leading-[1.6] text-balance text-slate" style={{ "--i": 1 } as CSSProperties}>
          {text}
        </p>
        <div className="reveal-item mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={{ "--i": 2 } as CSSProperties}>
          <Link href={estimateHref} className={cn(buttonVariants({ variant: "pill-dark", size: "pill" }), "w-full sm:w-auto")}>
            {estimateLabel}
            <ArrowRight aria-hidden strokeWidth={1.5} className="transition-transform group-hover/button:translate-x-1" />
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "whatsapp", size: "pill" }), "w-full rounded-full sm:w-auto")}
          >
            <MessageCircle aria-hidden strokeWidth={1.5} />
            {whatsappLabel}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
