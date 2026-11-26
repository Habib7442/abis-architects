"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1600;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `value` once when scrolled into view (DESIGN §7.9).
 * The final value is server-rendered and reserves the width, so there is no layout shift and
 * the number is correct without JS. Screen readers always get the final value.
 */
export function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = value.toFixed(decimals);

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!el || reduced.matches) return;

    let frame = 0;
    // If reduced motion is switched on mid-session, stop and show the final value.
    const onReducedChange = () => {
      if (!reduced.matches) return;
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      el.textContent = final;
    };
    el.textContent = (0).toFixed(decimals);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          el.textContent = (value * easeOutCubic(t)).toFixed(decimals);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    reduced.addEventListener("change", onReducedChange);
    return () => {
      reduced.removeEventListener("change", onReducedChange);
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      el.textContent = final;
    };
  }, [value, decimals, final]);

  return (
    <span className="relative inline-grid">
      <span className="sr-only">{final}</span>
      {/* Width reserver */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {final}
      </span>
      <span ref={ref} aria-hidden className="col-start-1 row-start-1 text-left">
        {final}
      </span>
    </span>
  );
}
