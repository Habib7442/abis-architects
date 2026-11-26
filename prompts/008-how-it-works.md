# 008 — Home: "How it works"

**Status:** Approved (the user's request is the plan), 26 Nov 2026

## Goal
The home section after "Our projects". Five steps from first call to keys, with a sticky intro on desktop and a hairline that fills with gold as the reader scrolls.

## Decisions
- **Background:** concrete, following the page mode (DESIGN §2 row 11). The section before it is the always-dark projects band, so the rhythm holds.
- **Layout:** the user's brief replaces the horizontal timeline in DESIGN §7.10.
  - Desktop: 12-column grid, intro in 5 columns (sticky at header + 40px), steps in 7 (≈40/60).
  - Mobile: intro and buttons first, then the steps. Nothing is sticky.
- **Scroll effects** (`components/home/process-steps.tsx`, one rAF-throttled scroll listener):
  - **Line:** the track runs from the first number's centre to the last one's. The gold fill uses `scaleY` (transform only), with progress measured at the middle of the screen.
  - **Highlight:** the step whose number has passed mid-screen is highlighted. The full-strength number (ink, or gold in dark mode) crossfades over the 15% one with opacity, so colour never animates. Dots turn gold once the line reaches them.
  - **End of page:** at the very bottom of the page, the line completes and the last step highlights. While this is the last home section, step 5 can't reach mid-screen otherwise.
- **Reveal:** each step fades in on its own `Reveal`.
- **Reduced motion:** the line is full, every step and dot is highlighted, and there's no reveal.
- **Buttons:** "Get free estimate" is the `pill-dark` button. "Chat on WhatsApp" is the WhatsApp variant using `site.whatsappHref` (wa.me/919051633891, the single NAP source).
- **Content:** stand-in for Sanity `processStep`, in `lib/content/home.ts`.

## Files
`components/home/how-it-works.tsx` · `components/home/process-steps.tsx` · `lib/content/home.ts` · `app/page.tsx`

## Checks
lint, tsc. On the dev server at 390, 1280 and 1440 in light and dark mode. Checked:
- Background colour, 5 steps, no dashes in the copy, no horizontal scroll.
- Sticky on desktop and not on mobile; the column split.
- 56px between steps; the WhatsApp link.
- Before the list: no fill and no highlight.
- Step 3 at mid-screen: only step 3 highlighted (ink, or gold in dark mode), dots 1 to 3 gold, line about 50% filled.
- End of page: line full and step 5 highlighted.
- Reduced motion. Clean console.
