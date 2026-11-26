# 010 — /projects and /projects/[slug]

**Status:** Approved (the user's request is the plan), 26 Nov 2026

## Data
- **Images:** `public/projects/raw/<slide>-<category>/`, copied from the client's `abis-images`. Skipped folders (01, 02, 28, 29, 30) were not copied.
- **Generated data:** `lib/project-images.generated.ts`, made by a one-off sharp script. It holds each image's size, a 12px blur placeholder, and the watermark corner, found by gold-pixel detection and checked by eye.
- **Curated data:** `lib/projects.ts` holds the category and location rules, the skip list, watermark overrides, the four flagship projects, and `galleryImages` (everything not in a flagship). 76 gallery images.
- **Extra skip:** `11-049`, a labelled collage, found on review.
- **Category notes:**
  - `27-109` (a mosque under construction) is filed under Religious.
  - The other 26/27 site photos are homes under construction in Silchar, filed under Homes (`TODO(content)`).
- **Watermark crop:** gallery tiles keep each image's natural ratio, so there's no slack from `object-cover`. Clearing the mark (about 18% of the height) therefore needs a scale of 1.22 from the opposite corner, with 1.04 on hover on top. All 76 tiles were captured at 2× and checked.

## Flagship decisions (TODO(content) in lib/projects.ts)
- **The Grand Villa:** the site photo 26-104 is used with renders 09-037 and 09-038, which match its wide columned front. 09-039 and 09-040 show a different, symmetrical villa and stay in the gallery. 27-106 and 27-107 don't visibly match, so they're left out pending ABIS.
- **Masjid-e-Bilal:** all of 19. **SP Office gate:** all of 25. **Mother's Nest:** 12-051 and 12-052.
- **Services:** Design + Construction for the villa (both ABIS logos on its own post) and the gate (render plus built photo). Unknown for the others, so the fact is hidden.
- **Descriptions:** only what the images show. No sizes or dates.

## Page decisions
- **Gallery count:** the real number ("76 images"), not "120+".
- **Masonry:** shortest-column JS distribution from the known ratios, rendered as 1, 2 and 3-column layouts and switched with CSS, so nothing jumps on hydration and lazy images in hidden layouts are never fetched. "Load more" appends to the bottom.
- **Filters:** sticky at `--header-h`. Changing the filter fades the grid, resets to 12, and scrolls back to the grid's top if the bar is stuck. The pill count is a muted inline number.
- **Lightbox:** the shared `components/site/lightbox.tsx`. It moves through the whole current filter (not just the loaded tiles), and the title is the category.
- **Design vs Reality:** the home component with `showViewAll={false}`, since the button would link to the same page.
- **Detail pages:**
  - Hero 21:9 (4:3 on phones) with a dark gradient, plus a facts `dl` that hides unknown facts, the description, a masonry gallery, a pair when one exists, a CTA to `/estimate?type=…`, more projects, and a breadcrumb with BreadcrumbList JSON-LD.
- **SEO:**
  - Per-page title, description, canonical and OG image (the first image).
  - `metadataBase` comes from `siteUrl` (`NEXT_PUBLIC_SITE_URL`, else the Vercel production URL, else localhost; `TODO(client)`).
  - `generateStaticParams` covers all four slugs. Cache Components rules out `dynamicParams`; unknown slugs render `notFound()` (noindex), with status 200 because of streaming.
- **Rating star:** a gold "★" character (line icons only, AGENTS §4).

## Checks
lint, tsc (after `next typegen`), build (4 detail pages prerendered). Production build at 390, 768 and 1440 in light and dark mode. Checked:
- **/projects:** header and stats text; featured links; first image eager and high priority, the rest lazy; column counts; 16px gaps; natural ratios; 2px radius; 12 tiles, then 24 after "Load more"; sticky at 78px; the Villas filter (5 tiles, active pill colour per mode) and reset to 12; lightbox counter within the filter, arrows, Esc.
- **Detail pages** (two of them): breadcrumb and JSON-LD, facts, pair, CTA type, more projects, metadata and OG.
- **Everywhere:** no dashes or placeholder text, no horizontal scroll, clean console, reduced motion.
