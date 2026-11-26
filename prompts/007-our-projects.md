# 007 — Home: "Our projects"

**Status:** Approved (the user's request is the plan), 26 Nov 2026

## Goal
The home section after "What we build": an always-dark project gallery with category filters, a featured mixed-size grid, a lightbox and a "View all projects" link.

## Decisions
- **Always dark:** `bg-night` (`--night: #08090a`, a new fixed token) with `data-theme="dark"`, so it gets the gold focus ring and, in dark page mode, the hairline band edges.
  - Gold text is allowed here because the surface is dark (DESIGN §3.2).
- **Card design:** the user's brief overrides DESIGN §7.16. Name, category and location sit over the image; the grid is mixed-size, 3 columns on desktop.
- **No-hole tiling:** the first visible card is always featured, and its span depends on how many cards are showing, so every filter result fills its rows (`spanClasses` in `projects-gallery.tsx`).
  - Desktop, 3 columns: n%3==0 → featured 2×2; n%3==1 → featured full width, 2 rows; n%3==2 → featured 2×2 and the second card 1×2.
  - Tablet, 2 columns: featured full width, 2 rows; if the remaining count is odd, the last card spans both columns.
  - Mobile: one column of 4:3 cards.
- **Filters:**
  - Toggle buttons (`aria-pressed`) in a labelled group. An `aria-live` line announces the count.
  - The grid fades out over 200ms (opacity only), the cards swap, then it fades back in. Instant under reduced motion.
- **Watermark crop:** same approach as "What we build". Each render with a watermark is scaled 1.1 from the corner opposite the mark, with its own `object-position`. Site photos (Grand Villa, Masjid-e-Bilal, living room) and the clean temple render have no crop.
- **Hover:** the image scale goes from 1.1 to 1.155 (1.05 on top of the crop) and a white arrow circle fades in top-right. Off under reduced motion.
- **Lightbox:**
  - Base UI Dialog on a solid night background. It shows the whole image (`object-contain`), so watermarks are visible there by design.
  - Arrow keys and on-screen arrows move between projects (wrapping), swipe works on touch, Esc closes, and focus returns to the card.
  - It only moves within the current filter.
- **Unknown locations:** shown as a visibly marked `[Location TBC]` placeholder (AGENTS §8), with `TODO(content)` in the fixtures.
- **Status badges:** dark pill with a dot in the success or warning token colour.
- **Content:** project fixtures live in `lib/content/projects.ts` (stand-in for Sanity `project`); section copy lives in `lib/content/home.ts`.

## Images (`public/projects/`, from the client's `abis-images`)
| File | Source | Note |
|---|---|---|
| luxury-residence | 06-027 | dusk render |
| contemporary-home | 10-045 | dusk render |
| classical-villa | 09-040 | night render |
| grand-villa | 26-104 | site photo; matched to the "Grand Villa @Silchar" post (26-103), to confirm; 1670px |
| mothers-nest-hotel | 12-052 | night render |
| commercial-building | 12-050 | dusk render |
| masjid-e-bilal | 19-087 | site photo at night |
| temple | 14-063 | render, no watermark |
| interior-living | 17-079 | site photo with plastic-wrapped furniture; 1280px |

## Files
`components/home/projects-showcase.tsx` · `components/home/projects-gallery.tsx` · `lib/content/projects.ts` · `lib/content/home.ts` · `app/page.tsx` · `app/globals.css` (`--night`) · `components/ui/button.tsx` (`pill-light`) · `public/projects/*`

## Checks
lint, tsc, build. Home at 390, 768 and 1440 in light and dark mode. Checked:
- Section colours and text colours.
- Reveal on scroll, no horizontal scroll, no dashes in the copy.
- Every filter: card count, `aria-pressed`, tiling with no holes, and the fade mid-switch.
- Hover scale and arrow.
- Lightbox: Enter, arrow keys, wrap-around, swipe at 390, Esc, focus return.
- Reduced motion. No page errors.
- Every card crop captured at 2× and checked for watermark corners.

## Follow-up: fixes (26 Nov 2026)
- **White background in light mode:** the running dev server was serving stale CSS with no `--night` and no `.bg-night`. The code was right; the CSS hadn't refreshed. The next `globals.css` edit refreshed it.
  - To make the band robust, `[data-theme="dark"]` now applies the full dark token set (shared with `:root[data-mode="dark"]`), so any always-dark band reads the same in both page modes.
  - The band scrollbar track is pinned to `#141616`, because `--ink-2` flips to light inside the band.
- **Images:** only the bottom 40% of each card is shaded (`from-black/70 to-transparent`), plus a soft text shadow. No full-card overlay.
- **Locations:** unconfirmed locations are hidden in both the cards and the lightbox. The placeholder was removed at the user's request, which overrides the AGENTS §8 marked-placeholder rule here; the `TODO(content)` stays in the fixtures.
- **Padding:** 64px top and bottom on mobile, 96px on desktop.
- **Console warning:** the theme `<head>` script now goes through `components/site/inline-script.tsx` (Next docs pattern), which removes React's "Encountered a script tag" dev warning.
