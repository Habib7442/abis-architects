# 005 — Night hero in dark mode

**Status:** Approved (the user's request is the plan), 26 Nov 2026. Replaces the always-light hero from 004. The About ABIS spacing from 004 stays.

## Goal
Light mode keeps the day hero exactly as it was. Dark mode shows a night render of the same houses, with light text, a gold accent and a 400ms crossfade on switch.

## Asset
`public/hero/hero-dark.webp`: the client's `abis_dark_hero_2400px.webp`, 2400×1258.
- The day photo is 1672×941. Both images sit in the same box with the same `object-cover` and bottom anchoring, so the box never moves.
- The night render is slightly wider (1.91 vs 1.78), so cover crops its sides a touch more. The houses line up closely, but not pixel for pixel.

## Decisions
- **Mode attribute:** `[data-mode]` on `<html>`, not `[data-theme]`, which is the section band switch (see 003).
- **Removed** `.mode-light`, the `:has()` header rule and the header's past-hero tracking. The header follows the active mode everywhere, and it's transparent over the hero until scrolled.
- **Crossfade** (`globals.css`, `.hero-xfade` / `.hero-day` / `.hero-night`):
  - The day sky gradient and the day image fade out while the night layer fades in.
  - The night layer is `display:none` in light mode (`transition-behavior: allow-discrete`), so its `loading="lazy"` image is never fetched in light mode. In dark mode it is displayed and loads at once.
  - The fade-in from 0 (`@starting-style`) is scoped to `.theme-switching`, so nothing animates on page load.
  - Off under reduced motion. Excluded from the 200ms colour-fade rule.
  - Browsers without `allow-discrete` simply swap without fading.
- **Dark tokens:**
  - `--hero-base` `#0E1012` (behind the masked-in top 40%, giving the requested top fade)
  - `--hero-heading` `#FFFFFF`, `--hero-accent` gold `#CFA548`, `--hero-lead` `#9AA3AB`
  - Light mode maps the same tokens back to ink, ink and slate.
- **Buttons:** primary uses the existing `pill-dark` flip (light fill, dark text). Secondary is transparent with a `white/40` border and white text in dark mode.
- **Bottom fade:** 120px in dark mode, as a solid colour through a mask so it fades with the theme. It ends in the colour of the section below (`#141616`), not `#0E1012`, so there is no line at the seam.
- **Alt text:** one shared description without the sky. The night image is `alt=""`.

## Files
`public/hero/hero-dark.webp` · `app/globals.css` · `components/home/hero.tsx` · `components/site/header.tsx`

## Checks
lint, tsc, build; Home at 390, 1280 and 1440 in light and dark. Checked: text and button colours, the night image is not requested in light mode, no fade on load, crossfade mid-state, identical day and night boxes, reduced motion is instant, the seam, and no page errors.
