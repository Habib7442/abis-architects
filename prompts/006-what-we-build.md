# 006 — Home: "What we build"

**Status:** Approved (the user's request is the plan), 26 Nov 2026

## Goal
The home section after About ABIS + stats. Chip and heading, a short line on the right, a wide featured Turnkey card, then four service cards. Every card is fully clickable.

## Decisions
- **Section on paper, cards on concrete.** DESIGN §2 lists Services as a concrete section. The user's brief makes the cards concrete, so the section is paper; otherwise the cards would vanish. This also keeps the rhythm (FounderStats is concrete).
- **Copy:** the aside's em dash became a full stop (AGENTS §8): "Design only, build only, or both. We handle homes, businesses and places of worship."
- **"Our main focus" label:** gold text fails contrast on light (AGENTS §4, §13). In light mode it's ink text with a short gold rule; in dark mode the text is gold.
- **Layout:**
  - The featured card is image-on-top on mobile and tablet, and text-left / image-right (half and half) from 1024px.
  - Small cards are 1 column below 640px, 2×2 from 640px, and 4 across from 1024px. Images are 220px tall.
- **Card behaviour:**
  - The "Explore" button in the featured card is a styled `<span>`, because the whole card is the link (no nested links).
  - Hover: border turns ink, the image scales 1.04 and the arrow moves 4px (transform only). All off under reduced motion.
- **Reveal:** two `Reveal` blocks (heading + featured, then the card row), so on mobile the lower cards animate when they reach the screen. Staggered via `--i`.
- **Content** lives in `lib/content/home.ts` (stand-in for Sanity), not in the component.

## Images
From the client's company profile export (`abis-images`), copied to `public/services/`:

| File | Source | Subject |
|---|---|---|
| `turnkey.webp` | 05-020 | four-storey two-block residence |
| `homes.webp` | 09-039 | white classical villa |
| `commercial.webp` | 12-051 | Mother's Nest Hotel |
| `religious.webp` | 14-062 | temple at dusk |
| `interiors.webp` | 20-088 | bedroom |

## Files
`components/home/what-we-build.tsx` (new) · `lib/content/home.ts` · `app/page.tsx` · `public/services/*`

## Checks
lint, tsc, build. Home at 390, 768, 1280 and 1440 in light and dark mode. Checked: column count, 220px images, card background, border and 2px radius, label colour, no dashes in copy, no horizontal scroll, hover (border, scale, arrow), focus ring, reveal on scroll, reduced motion, no page errors.

## Follow-up: watermark crop (26 Nov 2026)
- **Crop settings:** every image is scaled 1.1 (`scale-110`) from a per-image `origin`, the corner opposite the watermark, with a per-image `object-position` that keeps the building centred. Both are set in `lib/content/home.ts`.
- **Hover:** the zoom stacks on top of that (1.1 × 1.04 = 1.144). Reduced motion stays at 1.1.
- **Result:** clean at 1440 for all five. At 390 the Turnkey and temple images are clean. Homes, commercial and interiors still show a sliver, so each has a `TODO(content)` asking for a clean export.

