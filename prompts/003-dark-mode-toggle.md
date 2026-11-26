# 003 — Light/dark mode toggle

**Status:** Approved ("go with your recommendations"), 26 Nov 2026

## Goal
A site-wide light/dark mode that follows the system by default, can be switched manually from the header, and remembers the choice in localStorage. No flash on load.

## Read
AGENTS.md §4, §13 · DESIGN.md §3, §14 (dark band tokens, `data-theme` per section) · Next 16 docs: `guides/preventing-flash-before-hydration.md`, `generate-viewport.md` (themeColor) · Base UI Switch.

## Findings (why the brief changed)
- There was no system dark mode to refactor: no `prefers-color-scheme` rules, no `<picture>` swaps, no dark logo or dark hero asset.
- `[data-theme="dark"]` is already the per-section dark band switch (DESIGN §14). The page mode therefore uses **`data-mode`** on `<html>`, so the two never collide.

## Decisions
- **Palette (recommendation a):** dark mode reuses the existing dark-band colours. Nothing new is designed.
  - Surfaces: paper → `#0C0D0D`, concrete → `#141616`, concrete-2 / card → `#1D2020`.
  - Text: ink → `#F5F6F4`, slate → mist `#A0A9B2`. Lines → `rgb(255 255 255 / 0.1)`. Focus ring → gold.
  - The ink scale is the "foreground" role, so it flips. Things that must stay dark in both modes (dark bands, text on gold and WhatsApp buttons) use a new fixed token **`--ink-fixed`**.
  - Dark bands get a hairline top and bottom in dark mode, so they still read as a surface change.
- **Hero (recommendation a):** keeps the daylight photo over a dusk-blue sky gradient, with the photo's sky masked out further in dark mode. A `HERO_DARK_SRC` slot (null for now, `TODO(content)`) renders a lazy-loaded second image shown only in dark mode once ABIS supplies a dusk render. The light image keeps `fetchPriority="high"`.
- **Logo:** the mark is gold and the name is live text using tokens, so it follows the mode without a second image.
- **No new dependency:** an inline `<head>` script plus a small `useSyncExternalStore` hook replaces next-themes. It avoids React 19's script-in-component warning, and the Next docs recommend this pattern.
- **Tailwind `dark:` variant** is redefined to `[data-mode="dark"]`.
- **Colour fade:** a `theme-switching` class on `<html>` for 200ms applies colour transitions on click only. It's skipped under reduced motion and never runs on load. This is a deliberate one-off exception to "animate only transform/opacity", because the brief asks for it.
- **Toggle:** a 40px round button with the pill border style, before "Get in touch" on desktop and before the menu button on mobile. Its hit area is extended to 44px. Mobile menu: a "Dark mode" row with a Base UI Switch. The icon renders only after mount, with an empty placeholder of the same size before that.
- `themeColor` follows the system via media queries. `color-scheme` follows `data-mode` in CSS.

## Files
- `lib/theme.ts` (new): storage key, inline script, store, `useThemeMode`, `setThemeMode`
- `components/site/theme-toggle.tsx` (new): `ThemeToggle`, `ThemeSwitchRow`, `ThemeSync`
- `app/layout.tsx`: head script, `suppressHydrationWarning`, `ThemeSync`, themeColor
- `app/globals.css`: dark tokens, `--ink-fixed`, dark variant, color-scheme, fade, band hairline
- `components/site/header.tsx`: toggles, `bg-paper/85`
- `components/ui/button.tsx`, `components/ui/chip.tsx`, `components/site/founder-portrait.tsx`: `bg-white` → `bg-card`, `text-white` → `text-paper`, fixed ink on gold/WhatsApp
- `components/home/hero.tsx`: dark image slot, dark mask
- `app/about/page.tsx`: bands → `bg-ink-fixed`

## Checks
lint, tsc, build; screenshots of Home and About at 390 and 1440 in light and dark; reload with a saved choice (no flash); cleared storage follows the system.
