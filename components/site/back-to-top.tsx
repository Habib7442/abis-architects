"use client";

import { ArrowUp } from "lucide-react";

/** Small round button that scrolls to the top (instantly under reduced motion). */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
      aria-label="Back to top"
      title="Back to top"
      className="grid size-11 place-items-center rounded-full border border-line text-mist transition-colors duration-300 ease-arch hover:border-gold hover:text-gold motion-reduce:transition-none"
    >
      <ArrowUp aria-hidden strokeWidth={1.5} className="size-5" />
    </button>
  );
}
