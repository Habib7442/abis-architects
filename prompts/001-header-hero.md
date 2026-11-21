# 001 — Home: header + hero

**Status:** Approved (the user's brief is the plan), 21 Nov 2026

## Goal
Build only the site header and the home hero (DESIGN.md §7.2, §7.11), plus a 100vh white spacer for testing the header scroll state.

## Read
AGENTS.md, DESIGN.md §3, §4, §7.1, §7.2, §7.11, §10, §12 · Next 16 docs: fonts, images (`priority` is deprecated, so use `preload`/`fetchPriority`) · Base UI Dialog.

## Decisions and assumptions
- **Hero image:** only `public/hero/hero-desktop.webp` exists (1672×941, sky at the top 42%).
  - On mobile, the same file is cropped to the centre house with `object-position`.
  - The image is bottom-anchored at full width. The section background is a `--hero-sky` token sampled from the image's sky, and the image's top edge fades into it. The section therefore reads as one continuous sky photo, and the text can never sit on the roofs at any aspect ratio.
  - The hero's bottom padding reserves the house band (≈ 60% of the image's rendered height).
- **Fonts:**
  - Archivo (variable, `wdth` axis) for headings.
  - Instrument Serif italic for the rotating phrase.
  - Manrope for body text.
  - Hind Siliguri is deferred to the Bengali phase.
- **Tokens:** the DESIGN.md tokens go in `app/globals.css`. The shadcn variables are remapped to them, with radius 2px.
- **Logo:** the client's SVG is still needed, so the header uses a text wordmark as a placeholder.
- **Contact details:** phone and WhatsApp come from `lib/site.ts`, a stand-in for the Sanity `siteSettings` document. WhatsApp uses the main number until ABIS confirms its WhatsApp Business number.
- **Motion:** CSS keyframes for the entrance and a small rAF parallax (desktop pointer only). GSAP is not added yet.
- **Reduced motion:** the entrance and parallax are disabled, and the rotating phrase stays on "that last.".
- **Screen readers:** the H1 is read as "We design and build homes that last."; the visual wheel is `aria-hidden`.

## Files
`app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `lib/site.ts`, `components/ui/button.tsx`, `components/site/{logo,header}.tsx`, `components/home/{hero,rotating-phrase,hero-parallax}.tsx`, `public/hero/hero-desktop.webp`

## Acceptance
- At 390, 768, 1280 and 1440px, the text never overlaps the roofs.
- Changing phrases causes no layout shift.
- There is no horizontal scroll.
- Ghost phrases appear only at ≥1280px.
- Buttons are ≥48px tall and stacked full width on small phones.
- Body text is ≥16px.
- The header goes white and blurred, with a hairline, after scrolling.
- The mobile menu has the links plus Call and WhatsApp buttons.

## Checks
`npm run lint`, `npx tsc --noEmit`, `npm run build`, headless screenshots at the 4 widths (top + scrolled).
