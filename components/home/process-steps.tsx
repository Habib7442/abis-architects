"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Step = { title: string; text: string; youGet: string };

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServer = () => false;

/** Number box is 56px tall; the dot and the line's ends sit on its vertical centre. */
const NUMBER_CENTER = 28;

/**
 * The five steps with a hairline that fills with gold as the reader scrolls (scaleY, transform
 * only) and a highlight on the step at the middle of the screen (opacity crossfade, so no
 * colour animation). Reduced motion: line full, every step highlighted, no reveal.
 */
export function ProcessSteps({ steps, youGetLabel }: { steps: readonly Step[]; youGetLabel: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const items = [...list.children].filter((e) => e.tagName === "LI") as HTMLElement[];
      if (!items.length) return;
      const listTop = list.getBoundingClientRect().top;
      const first = items[0].getBoundingClientRect().top + NUMBER_CENTER;
      const last = items[items.length - 1].getBoundingClientRect().top + NUMBER_CENTER;
      // Track runs from the first number's centre to the last one's.
      list.style.setProperty("--track-top", `${first - listTop}px`);
      list.style.setProperty("--track-h", `${last - first}px`);

      const mid = window.innerHeight / 2;
      let progress = Math.min(1, Math.max(0, (mid - first) / Math.max(1, last - first)));

      let current = -1;
      items.forEach((li, i) => {
        if (li.getBoundingClientRect().top + NUMBER_CENTER <= mid + 1) current = i;
      });

      // At the very bottom of the page the last step can't reach mid-screen (e.g. when little
      // follows this section), so finish the line and highlight the last step there.
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atPageEnd && last < window.innerHeight) {
        progress = 1;
        current = items.length - 1;
      }

      fill.style.transform = `scaleY(${progress})`;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const highlighted = (i: number) => reduced || i === active;
  const reached = (i: number) => reduced || i <= active;

  return (
    <ol
      ref={listRef}
      className="relative [--track-h:calc(100%-28px)] [--track-top:28px]"
      aria-label="Steps"
    >
      {/* Track and gold fill, on the dots' centre line */}
      <span aria-hidden className="absolute top-(--track-top) left-[11px] h-(--track-h) w-px bg-ink/15" />
      <span
        ref={fillRef}
        aria-hidden
        className="absolute top-(--track-top) left-[11px] h-(--track-h) w-px origin-top bg-gold"
        style={{ transform: reduced ? "scaleY(1)" : "scaleY(0)" }}
      />

      {steps.map((s, i) => (
        <li key={s.title} className="relative pl-12 sm:pl-14 [&+li]:mt-14">
          {/* Dot: hairline ring, gold once the line has reached it */}
          <span aria-hidden className="absolute top-[22.5px] left-[6px] size-[11px] rounded-full border border-ink/25 bg-concrete" />
          <span
            aria-hidden
            className={cn(
              "absolute top-[22.5px] left-[6px] size-[11px] rounded-full bg-gold transition-opacity duration-500 ease-arch motion-reduce:transition-none",
              reached(i) ? "opacity-100" : "opacity-0",
            )}
          />

          <Reveal>
            <div className="reveal-item">
              {/* Faint number, with the full-strength copy crossfaded on top when this step is current */}
              <span aria-hidden className="relative block w-fit font-display text-[56px] leading-none font-medium tracking-[-0.03em] tabular-nums">
                <span className="text-ink/15">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "absolute inset-0 text-ink transition-opacity duration-500 ease-arch motion-reduce:transition-none dark:text-gold",
                    highlighted(i) ? "opacity-100" : "opacity-0",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="mt-4 font-display text-[clamp(22px,2vw,28px)] leading-tight font-medium tracking-[-0.015em] text-ink">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[17px] leading-[1.65] text-slate">{s.text}</p>
              <p className="mt-4 flex items-start gap-2 text-base leading-snug text-slate">
                <Check aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-ink" />
                <span>
                  <span className="font-semibold text-ink">{youGetLabel}</span> {s.youGet}
                </span>
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
