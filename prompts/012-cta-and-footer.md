# 012 — Site CTA band + footer

**Status:** Approved (the user's request is the plan), 26 Nov 2026. Follow-up the same day: removed the "Website by Locallify" credit and put the bottom bar on one level row.

## Decisions
- **Where they live:** the root layout renders `SiteCta` and `SiteFooter` on every page, plus `LocalBusinessJsonLd`. Both blocks are always dark (`bg-night` with `data-theme="dark"`).
- **CTA band:**
  - Hidden on `/estimate` and `/contact` via `HideOnRoutes` (`usePathname`). Verified with a temporary `/contact` page: absent from the server HTML, after hydration and after client navigation.
  - Until those pages exist, their URLs show the shared 404 page, so the band still appears there.
- **Duplicate CTAs removed:** the About CTA section and the `/projects` CTA band. Project detail pages keep their "Build something like this" CTA, because it links to the estimator with the project type pre-filled.
- **Background image:** `10-044` has a bottom-left watermark, so it's scaled 1.18 from the top-right, under 70% black and a 5% blueprint grid.
- **NAP:** single source in `lib/site.ts` (address, hours, socials, legal name, response time with `TODO(content)`, geo `null` with `TODO(content)`).
- **Hours:** written as "Mon to Sat, 10:00 AM to 7:00 PM", because the brief's en dashes aren't allowed in copy (AGENTS §8).
- **Social icons:** lucide v1 has no brand icons, so custom line SVGs (1.5px stroke) live in `components/site/social-icons.tsx`.
- **Careers:** shown only if `app/careers/page.tsx` exists, with a gold "Hiring" pill. Hidden today.
- **Wordmark:** `min(28vw, 412px)` so it spans the container; Archivo 800 at 120% width, gold at 12%, top 75% shown. It rises 18% into place on reveal; static under reduced motion.
- **Copyright year:** cached in a `"use cache"` component with `cacheLife("days")`. Cache Components doesn't allow `new Date()` in the static shell (Next docs, "Random values and timestamps").
- **Bottom bar:** one row from 1280px, each item on a single line and vertically centred; stacked and centred below that. Extra bottom padding on mobile leaves room for a future WhatsApp button. "Back to top" is a 44px round icon button.
- **JSON-LD:** LocalBusiness + GeneralContractor with name, legal name, address, phone, email, hours, sameAs (the three social profiles), founding year, and the Google rating 4.8 from 161 reviews. `geo` is left out until the coordinates are confirmed.
- **Also fixed:** on phones, the Design vs Reality built image sat 48px off-screen before sliding in, which made the page scroll sideways. Its list now uses `overflow-x-clip`.

## Checks
lint, tsc, build. Home and About at 390, 768 and 1440 in light and dark mode. Checked:
- Page, then CTA, then footer order; both `#08090A`; the overlay and grid.
- CTA padding (120px desktop, 80px mobile), eyebrow, gold accent, and the estimate, WhatsApp and phone links.
- Footer columns at 4, 2 and 1 per row; links; socials; Careers hidden; address and hours.
- The wordmark's font, opacity and 75% clip.
- The bottom bar text: copyright year, licences, no credit. Items share one vertical centre on desktop.
- The JSON-LD fields, back to top, no horizontal scroll, reduced motion, and a clean console.
