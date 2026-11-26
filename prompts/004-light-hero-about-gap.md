# 004 — Always-light hero, header over hero, About ABIS spacing

**Status:** Approved (the user's request is the plan), 26 Nov 2026

## Goal
1. The home hero stays light in both modes. The header is light while it sits over the hero and follows the active mode after it. In dark mode, the hero's bottom fades into the dark page.
2. Home "About ABIS": no empty gap. The checklist sits 32px under the paragraph and "Our story" 24px under the checklist. The text block is top-aligned with the photo.

## Decisions
- **`.mode-light`** re-declares the full light token set on an element (`:root, .mode-light` share one block), so everything inside it is light whatever the page mode. `data-theme="light"` was not used, because `data-theme` is the section band switch (DESIGN §14). Tailwind `dark:` never fires inside `.mode-light`.
- **Header:**
  - CSS-first, so the first paint is right before hydration: `body:has([data-light-hero]) .site-header:not([data-past-hero])` gets the light tokens.
  - JS sets `data-past-hero` once the point where the hero's bottom fade starts passes under the header. It re-checks on navigation and resize.
  - The mobile menu is portaled outside the header, so it always follows the active mode.
- **Bottom fade:** goes to `--page-below-hero`, which resolves on `<html>` to the next section's real colour in the active mode (`#141616` in dark). It's 80px in light and 120px in dark. The brief's `#0E1012` isn't a palette token, and fading to it would leave a visible line against the `#141616` section below, so the fade targets the actual section colour.
- **Removed:** the dark-hero image slot and the dark mask from 003, since the hero is no longer dark.

## Files
`app/globals.css` · `components/home/hero.tsx` · `components/site/header.tsx` · `components/home/founder-stats.tsx`

## Checks
lint, tsc, build; Home at 390 and 1440 in light and dark mode (header text over the hero, after scrolling, and past the hero; seam; measured gaps); About in dark mode (header follows the mode at the top); client navigation from About to Home.
