import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { HideOnRoutes } from "@/components/site/hide-on-routes";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/chip";
import { estimateHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const item = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Final CTA band above the footer, on every page except the ones that already carry a form
 * (prompts/012). Always dark: a dusk render under a 70% black overlay and a 5% blueprint grid.
 */
export function SiteCta() {
  return (
    <HideOnRoutes routes={["/estimate", "/contact"]}>
      <section
        data-theme="dark"
        aria-labelledby="site-cta-title"
        className="relative isolate overflow-hidden bg-night py-20 text-white lg:py-[120px]"
      >
        <Image
          src="/projects/raw/10-contemporary-tropical-homes/10-044.webp"
          alt=""
          fill
          sizes="100vw"
          // Render has a watermark bottom-left: scale from the top-right so it falls out of frame.
          className="-z-20 scale-[1.18] object-cover object-[70%_40%]"
          style={{ transformOrigin: "100% 0%" }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/70" />
        {/* Blueprint grid (DESIGN §6) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-size-[56px_56px]"
        />

        <Reveal className="mx-auto flex max-w-[1320px] flex-col items-center px-(--pad) text-center">
          <Eyebrow className="reveal-item">Have a plot?</Eyebrow>
          <h2
            id="site-cta-title"
            className="reveal-item mt-6 max-w-[16ch] font-display text-[clamp(36px,5vw,72px)] leading-[1.04] font-medium tracking-[-0.03em] text-white"
            style={item(1)}
          >
            Let&apos;s build something{" "}
            <em className="font-serif text-[1.08em] font-normal tracking-normal text-gold italic">you&apos;ll be proud of.</em>
          </h2>
          <p className="reveal-item mt-6 max-w-[46ch] text-[17px] leading-[1.6] text-white/80" style={item(2)}>
            Tell us about your plot and your plans. We&apos;ll get back to you {site.responseTime}.
          </p>
          <div className="reveal-item mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={item(3)}>
            <Link href={estimateHref} className={cn(buttonVariants({ variant: "pill-light", size: "pill" }), "w-full sm:w-auto")}>
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
          <p className="reveal-item mt-6 text-base text-white/70" style={item(4)}>
            Or call{" "}
            <a href={site.phoneHref} className="font-semibold text-white underline-offset-4 hover:underline">
              {site.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </section>
    </HideOnRoutes>
  );
}
