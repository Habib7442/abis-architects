"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Small enough that the bottom fade-to-paper hides the gap it opens under the photo.
const MAX_SHIFT_PX = 24;
const FACTOR = 0.06;

/**
 * Gentle upward parallax for the hero image (DESIGN §10: max ~6%).
 * Desktop pointer devices only; off for reduced motion, Save-Data and low-end CPUs.
 */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const desktop = window.matchMedia("(pointer: fine) and (min-width: 1080px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 4 || nav.connection?.saveData === true;

    let frame = 0;
    const update = () => {
      frame = 0;
      const shift = Math.min(window.scrollY * FACTOR, MAX_SHIFT_PX);
      el.style.transform = `translate3d(0, ${-shift}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const setup = () => {
      window.removeEventListener("scroll", onScroll);
      el.style.transform = "";
      if (desktop.matches && !reduced.matches && !lowEnd) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      }
    };

    setup();
    desktop.addEventListener("change", setup);
    reduced.addEventListener("change", setup);
    return () => {
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", setup);
      reduced.removeEventListener("change", setup);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
