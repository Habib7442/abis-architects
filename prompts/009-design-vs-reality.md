# 009 — Home: "Design vs Reality" + projects gradient

**Status:** Approved (the user's request is the plan), 26 Nov 2026

## Goal
1. "Our projects": make the card text readable on bright images.
2. A new always-dark home section after "How it works": each 3D render next to the real building.

## Decisions
- **Projects cards:** the bottom-half gradient now goes to 85% black (`h-1/2 from-black/85`). The category label and the title each get their own subtle text shadow.
- **Shared lightbox:** moved to `components/site/lightbox.tsx` and made generic (`LightboxItem`: src, alt, title, label, meta). "Our projects" and this section both use it. In this section it steps through all four images in order.
- **Section:** `bg-night` with `data-theme="dark"`, the same as "Our projects". The two dark bands aren't adjacent ("How it works" sits between them).
- **Pairs:**
  - Two 16:10 buttons, 8px apart. The gold arrow circle sits on the gap (with a night-coloured ring) and turns to point down when the images stack below 768px.
  - Pills: a dark "3D DESIGN" pill, and a gold "ON SITE" or "BUILT" pill.
  - 80px between pairs.
- **Reveal:** new CSS `.reveal-fade` (design) and `.reveal-from-right` (built, 48px, 600ms, 350ms delay), driven by the existing `Reveal` armed/shown states. Off under reduced motion.
- **Copy:** the brief's em dash became a colon: "Every project on this site is real: designed and built by our own team."
- **Watermark:** only the villa render carries one (bottom-left). It's cropped at 1.1 from the top-right with position 85%, but a corner of the logo still shows, so there's a `TODO(content)` for a clean version.

## Open questions for ABIS (TODO(content) in lib/content/home.ts)
- **Villa match:** the villa render (09-039) and the site photo show different facades. Is this render really The Grand Villa's design? The section claims "What you approve is what we build".
- **Duplicate image:** 09-039 is also the Homes & Villas card image in "What we build".

## Also fixed
- **Night hero LCP:** `/hero/hero-dark.webp` is the LCP in dark mode, so it gets `fetchPriority="high"` but stays `loading="lazy"`. Making it eager would load it in light mode too; the Next docs recommend `fetchPriority` for theme images.

## Files
`components/home/design-vs-reality.tsx` · `components/home/validation-pairs.tsx` · `components/site/lightbox.tsx` (new, shared) · `components/home/projects-gallery.tsx` · `components/home/hero.tsx` · `lib/content/home.ts` · `app/globals.css` · `app/page.tsx` · `public/validation/*`

## Checks
lint, tsc, build. Production build at 390 and 1440 in light and dark mode (the user's dev server had stopped recompiling). Checked:
- Colours, no dashes in the copy, 80px between pairs.
- Side by side vs stacked, equal heights at 16:10, arrow on the gap and its direction, pill colours, name and location colours.
- Reveal order: design first, built offset by 48px then sliding in.
- Lightbox: opens on the clicked image, wraps, Esc closes.
- Projects gradient at 50% and 0.85. Reduced motion. Clean console.
