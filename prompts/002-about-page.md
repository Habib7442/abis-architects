# 002 — About page (`/about`)

**Status:** Approved (the user's request is the plan), 26 Nov 2026

## Goal
A calm, premium About page built from ABIS's own copy, with the Vision poster as the centrepiece of a dark "Our vision" band.

## Sources
- `About Us, Mission , Vision.docx`: About Us, Our Mission (7 pillars), Our Vision ("Creating Landmarks. Building Legacies.")
- WhatsApp screenshot (client's write-up for the poster):
  - "Where vision becomes reality. Designing Spaces. Creating Legacies."
  - "Architectural Design | Construction | Turnkey **Projects**" (the client changed "Homes" to "Projects")
  - The transform-your-vision paragraph
  - Four core strengths: Architectural Design, Construction, Turnkey Projects, Quality Assurance
- `Thumbnail.webp`: the Vision poster → `public/about/vision-poster.webp`

## Sections (rhythm: light → concrete → dark → light → concrete; never two dark in a row)
1. **Hero** (paper): chip "About us"; H1 "We don't just design homes. We *bring them to life.*" (from the docx); lead line.
2. **Who we are** (concrete): founder portrait + name card (reused from home), About Us copy, stats row (shared with home).
3. **Our vision** (ink, dark): eyebrow, "Where vision *becomes reality.*", tagline, poster (16:9), services tags + write-up, vision statement, 4 core strengths.
4. **Our mission** (paper): mission headline and copy; the 7 pillars as a numbered hairline grid, with the 8th cell a CTA tile.
5. **CTA** (concrete): estimate + WhatsApp.

## Decisions
- Copy is the client's, lightly edited for grammar only. Nothing invented: pillars are titles only, with no made-up descriptions.
- The header moves into the root layout so every page gets it.
- Shared pieces: `components/site/stats-row.tsx` (home + about) and `components/ui/chip.tsx`.
- The poster has its own baked-in text and logo, so its alt text repeats them.

## Checks
lint, tsc, build; screenshots at 390/1280/1440; no horizontal scroll; reduced motion; heading order.
