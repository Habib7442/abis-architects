"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fade + rise children marked `.reveal-item` when this block scrolls into view (DESIGN §10).
 * Content is visible in the server HTML; the hidden state is applied only once JS runs, and
 * never under reduced motion. Stagger with `style={{ "--i": n }}` on each item.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reveal = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
