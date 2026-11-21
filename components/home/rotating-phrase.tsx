"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 2600;

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServer = () => true; // SSR renders the static first phrase

/** Signed distance of `i` from `current` on a wheel of `n` items: -1 (above), 0, +1 (below), … */
function wheelOffset(i: number, current: number, n: number) {
  let d = (i - current + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

/**
 * Inline rotating phrase (DESIGN §7.11). Purely visual: render it aria-hidden and give the
 * heading a screen-reader sentence separately.
 *
 * - The box is as wide as the longest phrase (invisible sizer), so the prefix and line breaks
 *   never move when the phrase changes.
 * - The current phrase slides up and fades out; the next slides in from below. The box is
 *   clipped to its own line, so nothing shows above or below it.
 */
export function RotatingPhrase({
  phrases,
  prefix,
  className,
}: {
  phrases: readonly string[];
  prefix?: ReactNode;
  className?: string;
}) {
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || phrases.length < 2) return;
    const id = window.setInterval(() => setCurrent((c) => (c + 1) % phrases.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, phrases.length]);

  const active = reduced ? 0 : current;
  const n = phrases.length;
  const maxOffset = Math.floor((n - 1) / 2);
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn("inline-block whitespace-nowrap", className)}
    >
      {prefix}
      {/* Clip to the line, with a little room for italic overhang and descenders. */}
      <span className="relative inline-block text-center [clip-path:inset(-0.06em_-0.3em_-0.14em)]">
        {/* Sizer: reserves the width of the longest phrase. */}
        <span className="invisible inline-block pr-[0.04em]">{longest}</span>

        {phrases.map((phrase, i) => {
          const offset = wheelOffset(i, active, n);
          // The wheel only turns forward, so the item now in the bottom slot just wrapped round
          // from the top: it jumps there without animating (it is invisible anyway).
          const wrapping = offset === maxOffset && n > 2;
          return (
            <span
              key={phrase}
              className={cn(
                "absolute inset-x-0 top-0 block pr-[0.04em]",
                !wrapping && "transition-[transform,opacity] duration-600 ease-arch motion-reduce:transition-none",
              )}
              style={{
                transform: offset === 0 ? "none" : `translateY(${offset < 0 ? -100 : 100}%)`,
                opacity: offset === 0 ? 1 : 0,
              }}
            >
              {phrase}
            </span>
          );
        })}
      </span>
    </span>
  );
}
