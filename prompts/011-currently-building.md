# 011 — "Currently building" + gallery status filter

**Status:** Approved (the user's request is the plan), 26 Nov 2026

## Decisions
- **One component:** `components/sections/currently-building.tsx`, used on Home and /projects.
  - It uses theme tokens only, so it's dark inside the always-dark band on Home (`data-theme="dark"`) and follows the page mode on /projects.
- **Data** (`lib/projects.ts`):
  - `ProjectImage.status` is set only where a photo shows it:
    - 26/27 site photos: under construction.
    - 19 (Masjid-e-Bilal): completed.
    - 25-091, 25-092, 25-096 (SP gate, built): completed.
    - Renders: no status.
  - `currentlyBuilding` lists The Grand Villa (26-104, which links to its page) first, then the other six in-progress photos.
- **Locations:** only 26-104 is known (Silchar). The other 26/27 sites are hidden with `TODO(content)` (Silchar, Hailakandi or Bhaga, to be confirmed). This replaces the earlier "26/27 → Silchar" rule, so the gallery lightbox no longer shows Silchar for them.
- **Gallery now includes the flagship images** (93 instead of 76). Every Completed photo belongs to a flagship project, so without them the Completed filter would always be empty.
- **Filter bar:** the category row and the status row ("Any status · Completed · Under construction") are stacked. Counts reflect the other filter's current choice, and a pill with nothing to show is disabled.
- **Row:**
  - Snap scrolling with a hidden scrollbar (`.scrollbar-none`).
  - Card width set by `--cards`: 1.2 on mobile, 2.3 on tablet, 3.5 on desktop.
  - Arrow buttons on desktop, disabled at either end.
  - Cards: 4:5, a "Under construction" badge, the location (or the villa's name and location) on a bottom gradient.
  - Photo cards open the shared lightbox (photos only, 6). The villa card links to its page.
- **Motion:** a pulsing dot (`motion-safe:animate-ping`) and a staggered reveal. Both off under reduced motion.
- **Home placement:** inside the dark "Our projects" band, below the grid, after a 64px gap, a hairline and 64px. "View all projects" stays last.
- **/projects placement:** its own paper section between Featured and the Gallery, with a top hairline to separate it from Featured.

## Checks
lint, tsc, build. Production build at 390 and 1440 in light and dark mode. Checked:
- **Home:** band colour, order and spacing, heading colour.
- **The row:** 7 cards, villa first linking to its page; cards in view (1.15 on mobile, 3.44 on desktop); 4:5 ratio, 2px radius, badges, snap, no scrollbar; locations; arrows scroll and disable at the ends; lightbox counter.
- **/projects:** placement and theme following.
- **Status filter:** Any status 93 · Completed 9 · Under construction 7, and the tiles match.
- **Overall:** no horizontal scroll, clean console, reduced motion.
