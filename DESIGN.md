# DESIGN.md — The ABIS Architects Website

Design system & UI guidelines · **v1.2** · 21 Nov 2026
Companion to `PRD.md` · Build rules for Claude Code live in `CLAUDE.md`

> **v1.2 changes:** cooler, cleaner palette. Paper is now pure white, concrete is a cool blue-grey, slate is cooler, and dividers are a solid `#E3E7EB`. The brown `--gold-text` is removed: accents on light surfaces are ink. Gold is kept only for the logo, rating stars, the scroll progress bar and small accents on dark sections. Primary buttons on light surfaces are ink.
>
> **v1.1 changes:** visual direction locked to the Pentaclay-style reference (calm, airy, real photography, serif-italic accents). The hero is now **light**, with a rotating word. Headings switch from heavy/wide to medium-weight, tight tracking. New components added: §7.11–7.18.

---

## 1. Design Idea

**"Drawing board to doorstep."**

ABIS is the only firm in the region that designs *and* builds. The site should feel like that journey: it starts as a **precise architectural drawing** (fine lines, grids, measurements) and ends as a **real, solid building** (photos, materials, people).

Three words guide every decision:

| Word | What it means on screen |
|---|---|
| **Precise** | Strict grid, thin rules, measured spacing, blueprint details |
| **Grounded** | Concrete-grey surfaces, real site photos, honest numbers |
| **Warm** | The founder's voice, real families, Bengali support, WhatsApp everywhere |

**Mood:** an architect's studio in daylight, with one dramatic dusk render on the wall.
**Not:** a luxury perfume site, a crypto dashboard, or a generic builder template.

### 1.1 Visual references

| Reference | Role | Take | Leave |
|---|---|---|---|
| **Pentaclay — "Building the future through detail"** (Dribbble) | **Primary**: look, feel, typography, spacing | Airy hero with a rotating italic word; medium-weight sans + serif-italic accent words; stats with one-line explanations; small label chips; project cards with a facts row; interior image with room tabs; testimonial + brand card | Cream background, red buttons, fake "trusted by" logos, western cabin stock imagery, tiny body text |
| **Rylic Studio — "Building the Foundation of Excellence"** (Dribbble) | Secondary: bold moments | Dark statement band with small images **inside** the headline; founder trust strip with signature; line-drawing sketch next to stats; giant wordmark footer | Cartoon houses, sky-blue/orange/yellow palette, stock skyscrapers |
| **Sk Nahid Hasan — "From Concept to Better Living"** (Dribbble) | Page flow | Dark-to-light rhythm, photo + stats sections | — |

**Rule:** references guide *layout and feel only*. Every colour, image and word comes from this document and ABIS's real content.

---

## 2. Light-First, Dark Accents

The site is **mostly light**. Dark is used on purpose, only where drama helps.

| # | Home section | Theme / surface | Component |
|---|---|---|---|
| 1 | Header | Transparent over hero → paper on scroll | §7.2 |
| 2 | **Hero** with rotating word | **Light** (sky → paper fade over a daylight project photo) | §7.11 |
| 3 | Founder trust strip + quick estimate | Paper | §7.12 |
| 4 | Awards & media / material brands strip | Paper | §7.13 |
| 5 | About + stats with explanations | Paper | §7.14 |
| 6 | **Statement band** ("We design ▢ it. We build ▢ it.") | **Dark (ink)** | §7.15 |
| 7 | Services | Concrete | §7.4 |
| 8 | Projects with facts row | Paper | §7.16 |
| 9 | **Render vs Reality** | **Dark (ink)** | §7.8 |
| 10 | Interiors with room tabs | Paper | §7.17 |
| 11 | Process / Quality | Concrete | §7.10 |
| 12 | Packages teaser | Paper | §7.4 |
| 13 | Reviews (testimonial + brand card) | Paper | §7.18 |
| 14 | FAQ | Concrete | — |
| 15 | **Final CTA + Footer with giant wordmark** | **Dark (ink)** | §7.19 |

**Hero fallback:** if ABIS has no good *daylight* hero photo at launch, use the dark hero variant (dusk render on ink, as in the v0 prototype) and drop section 6 to avoid two dark bands close together.

**Rhythm rule:** never put two dark sections back to back, and never let more than 3 light sections go by without a change of surface (white ↔ concrete).

---

## 3. Colour

### 3.1 Tokens

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Main light background |
| `--concrete` | `#F3F5F7` | Alternate light sections (cool grey, slight blue tint), cards on white |
| `--concrete-2` | `#E3E7EB` | Borders, dividers, disabled |
| `--concrete-tint` | `#E9EDF1` | Testimonial card surface |
| `--line` | `#E3E7EB` | Hairlines and grid lines on light |
| `--ink` | `#0C0D0D` | Headings, body on light, dark section background |
| `--ink-2` | `#141616` | Raised dark surfaces |
| `--ink-3` | `#1D2020` | Cards on dark |
| `--slate` | `#5B6670` | Secondary text on light |
| `--mist` | `#A0A9B2` | Secondary text on dark |
| `--ink-muted` | `#0C0D0D` @ 45% | Secondary marks on light, e.g. the `+` in stats (45% keeps 3:1 on concrete) |
| `--gold` | `#CFA548` | Logo, rating stars, scroll progress bar, accents on **dark** sections |
| `--gold-tint` | `#CFA548` @ 12% | Selected states on dark |
| `--success` | `#2F7D4F` | Form success, "Completed" badge |
| `--warning` | `#B4561E` | "Ongoing" badge, warnings |
| `--error` | `#B3261E` | Form errors |
| `--whatsapp` | `#25D366` | WhatsApp buttons only |

**Banned:** cream, beige, ivory or off-yellow backgrounds, and brown or gold text on light surfaces. Light surfaces are always **cool neutral** (white paper / cool-grey concrete).

### 3.2 Gold usage rules
- Gold is used **only** for: the logo, rating stars, the scroll progress bar, and small accents on **dark** sections (eyebrows, numbers, the gold button, focus rings).
- On light surfaces, accents are **ink**: links, chips, icons, stat suffixes, section numbers.
- **Never use gold for text on light surfaces** (2.3:1 on white).
- Primary buttons on light surfaces are **ink**. The gold button is for dark sections only, one per viewport.

### 3.3 Verified contrast (WCAG 2.1)

| Foreground / Background | Ratio | Pass |
|---|---|---|
| Ink on Paper | 19.5 : 1 | AAA |
| Ink on Concrete | 17.8 : 1 | AAA |
| Slate on Paper | 5.9 : 1 | AA |
| Slate on Concrete | 5.4 : 1 | AA |
| Ink-muted (45%) on Concrete | 3.1 : 1 | AA large text only |
| Gold on Ink | 8.5 : 1 | AAA |
| Ink on Gold (button) | 8.5 : 1 | AAA |
| Mist on Ink | 8.2 : 1 | AAA |
| Gold on Paper | 2.3 : 1 | ❌ decorative only (stars, progress bar) |

---

## 4. Typography

### 4.1 Families

| Role | Font | Notes |
|---|---|---|
| Headings | **Archivo** (variable) at **weight 500, width 100%, tracking −0.025em** | Calm, precise, architectural |
| **Accent words** | **Instrument Serif, italic** (400) | 1–3 words per headline, e.g. "timeless *architectural solutions*" |
| Big moments | Archivo **800, width 120%** | Only for: statement band (§7.15), footer wordmark (§7.19), calculator result |
| Body / UI | **Manrope** (400, 500, 600, 700) | Friendly, very legible on phones |
| Bengali | **Hind Siliguri** (400–700) | Used in `/bn`; no serif accents in Bengali (keep words in Hind Siliguri, coloured slate) |
| Numbers | Archivo 500, `tabular-nums` | Stats, prices, sq.ft |

Load all via `next/font/google` with `display: swap`.

### 4.2 Scale (fluid)

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `display` | `clamp(44px, 5.6vw, 88px)` | 1.02 | 500, −0.03em | Hero H1 only |
| `h1` | `clamp(38px, 4.4vw, 68px)` | 1.05 | 500, −0.025em | Page titles |
| `h2` | `clamp(30px, 3.4vw, 52px)` | 1.1 | 500, −0.02em | Section titles |
| `h3` | `clamp(19px, 1.5vw, 24px)` | 1.2 | 600 | Card titles |
| `statement` | `clamp(44px, 7vw, 112px)` | 0.98 | 800 / 120% | Statement band, footer wordmark |
| `lead` | `clamp(18px, 1.5vw, 24px)` | 1.45 | 400 | About paragraph, intros |
| `body` | `16px` (never smaller) | 1.65 | 400 | Default |
| `small` | `14px` | 1.55 | 500 | Card text, facts row |
| `chip` | `12px` | 1 | 600, uppercase, +0.06em | Label chips |
| `stat` | `clamp(44px, 5vw, 72px)` | 1 | 500, −0.03em | Stats |

Serif accent words render at **1.08×** the surrounding size to match optical height.

### 4.3 Type rules
- **Serif-italic accent:** maximum one accent phrase per headline; never in body text, buttons or labels.
- On dark sections, the accent phrase may be gold; on light sections it stays ink or slate.
- Body text max width is **65ch**. **Body text never goes below 16px, including on mobile.**
- Bengali body text is 1px larger, with line height 1.75.
- No all-caps except chips and badges.

---

## 5. Layout & Spacing

### 5.1 Grid
- Container max width **1320px**, side padding `clamp(20px, 5vw, 72px)`
- **12-column grid**, gutter 24px (desktop) / 16px (mobile)
- Breakpoints: `sm 640` · `md 768` · `lg 1080` · `xl 1320`

### 5.2 Spacing scale (8-pt)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`

| Context | Value |
|---|---|
| Section vertical padding | `clamp(80px, 11vw, 150px)` |
| Section header → content | 64px |
| Card padding | 32–40px desktop / 24px mobile |
| Between stacked cards | 16–24px |

### 5.3 Shape
- **Corner radius: 2px** everywhere (buttons, cards, inputs, images). Architecture is sharp-edged.
- Exceptions: avatars and the WhatsApp FAB are circular; pills/chips are 999px.
- **Borders over shadows.** Use 1px `--line` hairlines. Shadows are only for floating elements (badges on images, dropdowns, modals): `0 24px 60px rgba(12,13,13,.18)`.

---

## 6. The Blueprint Motif

The recurring visual signature. Use it lightly.

| Element | Spec |
|---|---|
| **Grid lines** | 88px square grid, 1px `--line`, radial mask fading out. Hero and calculator background only |
| **Dimension labels** | Vertical or horizontal micro-text with tick marks, e.g. `ELEVATION · 3D DESIGN` or `← 30' 0" →`. 11px Archivo, `+0.16em`, slate/mist |
| **Offset frame** | Gold 1px outline offset 18px behind feature images |
| **Section numbers** | `01 —` `02 —` in ink (gold on dark), Archivo 700 |
| **Draw-in lines** | Thin rules that animate from 0 → 100% width when a section enters |
| **Plan outlines** | Simplified SVG floor-plan strokes as decoration in empty states, the 404 page and the calculator result |

Don't stack more than 2 motifs in one section.

---

## 7. Components

### 7.1 Buttons

| Variant | Light bg | Dark bg | Use |
|---|---|---|---|
| **Primary** | Ink fill, white text (pill) | Gold fill, ink text | Main CTA (Get estimate, Book) |
| **Secondary** | 1px ink border, ink text | 1px white/28% border, white text | See projects, Read more |
| **Dark** | Ink fill, paper text | n/a | CTAs on gold surfaces |
| **WhatsApp** | `#25D366` fill, white text + icon | same | WhatsApp actions only |
| **Text link** | ink + arrow → | gold + arrow → | Inline actions |

Specs: height 52px (desktop) / 48px (mobile), padding `0 26px`, 14px Manrope 700, letter-spacing `0.02em`, radius 2px.
Hover: lift `translateY(-2px)` and lighten fill 6%. Focus: 2px outline, 3px offset (ink on light, gold on dark). Arrows nudge 4px right on hover.

### 7.2 Header
- Height 78px. Transparent over the light hero (ink text, **ink logo**); on dark-hero pages, white text and the gold logo.
- After 30px scroll: `--paper` at 90% with `backdrop-filter: blur(14px)`, ink text, ink logo, bottom hairline.
- Desktop nav is centred, like the reference; "Get in touch" is a paper pill with a phone icon on the right, and the primary gold button appears only after scrolling past the hero.
- Right side: phone (secondary), **Book consultation** (primary).
- Mobile: logo + burger. Menu opens as a full-screen light sheet with large Archivo links.

### 7.3 Mobile action bar
Sticky bottom bar on all pages under 768px:
`[ 📞 Call ] [ WhatsApp ] [ Get Estimate ]`. Height 64px, paper background, top hairline, the middle action in WhatsApp green, safe-area inset padding. Hide on scroll down, show on scroll up.

### 7.4 Cards
- **Service card:** number, line icon (48px, 1.5px stroke), h3, small text, "Starting ₹__/sq.ft" line. Hover: concrete fill and a gold bottom rule that grows 0 → 100%.
- **Project card:** image (4:5 or fixed row height), gradient overlay at the bottom, tag (type · city · status), h3, arrow square. Hover: image scales to 1.06 over 900ms and the arrow fills gold.
- **Package card:** name, ₹/sq.ft in `stat` size, 5 key inclusions, "Compare" link. The recommended package gets an ink fill with a gold "Most chosen" chip.
- **Review card:** stars (gold), quote (lead size), name, home type and city, Google/video badge.

### 7.5 Status badges
| Status | Style |
|---|---|
| Completed | success text on success-tint pill |
| Ongoing | warning text on warning-tint pill + pulsing dot |
| 3D Design | ink on concrete pill |

### 7.6 Forms
- Labels: 12px uppercase, `+0.1em`, slate, always visible (no placeholder-only labels).
- Inputs: bottom border only (1px concrete-2), 16px text, 48px height. Focus border is ink 2px; error border and helper text are error red.
- Selects and radios as **large tap chips** in the calculator (min 48px, 2px radius, selected = ink border + gold-tint fill).
- Phone input with a fixed `+91` prefix.
- Submit is always full width on mobile.
- Success state: tick icon, "We'll WhatsApp you within 1 working hour", and a secondary "Chat now" button.

### 7.7 Smart Estimator
- One question per screen on mobile, a two-column summary on desktop (questions left, live result card right, sticky).
- Progress: a thin gold bar plus "Step 3 of 8".
- Result card: dark surface with the cost range in `display` size gold, a breakdown bar chart (stacked horizontal, concrete tones and one gold segment for the biggest cost), timeline chips, and a PDF + WhatsApp button pair.
- Background: blueprint grid at 40% opacity.

### 7.8 Render vs Reality slider
- Dark section, full container width, 16:9 (desktop) / 4:5 (mobile).
- Handle: a 2px gold vertical line with a 48px circular ink knob, gold ↔ arrows inside.
- Labels pinned to the top corners: `3D DESIGN` (left) / `BUILT · 2025` (right), eyebrow style.
- Supports drag, keyboard arrows and tap-to-jump. It starts at 50% and auto-nudges 40% → 60% once on entering view to show it's interactive.

### 7.9 Stats strip
4 columns on desktop, 2×2 on mobile, separated by hairlines. Numbers in `stat` size and ink; the suffix (`+`, `K+`) in `--ink-muted`; the rating star in gold. Count up once on view (1.6s ease-out). In HTML the **final number is rendered by default**, so the animation is only an enhancement.

### 7.10 Process timeline
Horizontal on desktop (connected by a hairline through 56px ink circles with gold numbers); vertical on mobile (circle left, text right). The active step on `/how-it-works` gets a gold-filled circle.

### 7.11 Hero with rotating word *(Pentaclay)*
- Full-bleed, min-height `100svh`. Background: white paper at the top fading into the photo's own sky colour (`--hero-sky`), with a **daylight ABIS project photo anchored to the bottom** (cut out or cropped so the sky blends into the gradient).
- Centred H1 in `display`: **"We design and build homes"** + rotating serif-italic phrase on the next line: *that last · families love · built for the Northeast*.
- Rotation: the current word slides up and fades out while the next slides in from below. Ghost copies of the previous and next words sit above and below at 20% opacity (as in the reference). Interval 2.6s; pauses on hover; static (first word) under reduced motion.
- Below the H1: one line of `lead` copy + two buttons (Primary "Get free estimate", Secondary "See our projects").
- Bottom-left floating badge: ★ 4.8 · 161 Google reviews.

### 7.12 Founder trust strip *(Rylic)*
Three columns directly under the hero, separated by hairlines:
1. Founder avatar (48px circle) + name + role + **signature SVG** + one sentence about ABIS
2. "Want a free estimate?" + text link "Let's talk →" (WhatsApp)
3. A stack of 2–3 small overlapping project thumbnails (2px radius, slight rotation ±3°)

### 7.13 Proof strip
Replaces the reference's fake "trusted by" logos. A single row, slate monochrome logos, 40% → 100% opacity on hover:
- **Option A (preferred):** awards and media (BAIC Expo, award bodies)
- **Option B:** material brands ABIS builds with (e.g. steel, cement and paint brands, which must be confirmed by the client)

Caption above: "Recognised by" or "Built with trusted brands". Never invent logos.

### 7.14 About + stats with explanations *(Pentaclay)*
- Left: a 3:4 founder photo with a small white name card overlapping its bottom-left corner; the text column is top-aligned with the photo. Right: chip "About us", then a `lead` paragraph (ABIS's story in 2–3 sentences), then a secondary button.
- Below, 4 stat columns: big number (`stat`), a hairline, a bold label (`h3`-small), then 2 lines of `small` slate text explaining it.
- Seed: **13+** years · **500+** projects · **7** cities · **4.8★** Google rating.

### 7.15 Statement band *(Rylic)*
- Ink background, centred `statement` text over 2–3 lines, e.g. **"We design [img] it. We build [img] it. You [img] live in it."**
- `[img]` = inline rounded-2px project thumbnails, `0.8em` tall, 1.6:1 ratio, vertically centred with the text, gently scaling 0.9 → 1 when revealed.
- Gold primary button underneath. Blueprint grid at 6% opacity in the background.

### 7.16 Project card with facts row *(Pentaclay)*
- Image 4:5 (featured) or 4:3. On hover a small paper pill "View project" appears centred.
- Below the image: name (`h3`) left, status badge right.
- **Facts row:** hairline-separated inline items in `small` slate: `2,400 sq.ft | G+2 | 4 BHK | Silchar | 2025`. Show price only if ABIS approves.
- Grid: 2 columns desktop (alternating tall/short rows like the reference), 1 column mobile.

### 7.17 Interiors with room tabs *(Pentaclay)*
- One wide 16:9 image with a pill tab bar floating at the top centre: **Living · Kitchen · Bedroom · Bathroom**.
- Switching a tab crossfades the image (400ms). A paper pill button "Explore interiors" sits at the bottom centre.
- Tabs: keyboard accessible (`role="tablist"`).

### 7.18 Testimonial + brand card *(Pentaclay)*
- A two-card row: a large testimonial card (concrete-tint surface: `#E9EDF1`) with the quote in `lead`, avatar, name, home type and city; and a smaller ink card with the ABIS monogram in gold + "Read all reviews on Google →".
- Carousel of real testimonials (arrows + swipe), maximum 6.

### 7.19 Footer with giant wordmark *(Rylic)*
- Ink background. Top: 4 link columns + contact block + socials.
- Bottom: **"ABIS"** in `statement` size at 18vw, gold at 90% opacity, edge-to-edge, clipped by the bottom of the viewport. Optionally a small render thumbnail inset between the letters.
- Final row: © line, legal links, "Designed & built by Locallify".

### 7.20 Label chips *(Pentaclay)*
Used instead of eyebrows **on light sections**: a small pill (`chip` text, 6px 12px padding, white fill, 1px `--line` border, fully rounded) with a 12px ink line icon, e.g. `⌂ ABOUT US`, `▦ OUR PROJECTS`. On dark sections keep the gold eyebrow with a rule.

---

## 8. Imagery

### 8.1 Types
| Type | Where | Treatment |
|---|---|---|
| **Dusk 3D renders** | Hero, Render vs Reality, project covers | Untouched, high-res (min 2400px long edge) |
| **Daylight site photos** | Projects, construction journey, quality | Light grade: +5 contrast, −5 saturation, cool highlights for consistency |
| **Founder / team** | About, founder note, reviews | Real people on real sites; natural light; no stock |
| **Detail shots** | Quality, materials, packages | Close-ups of brick, rebar, tiles, joinery; 1:1 or 4:5 |

### 8.2 Rules
- **No stock photos of people.** Stock is allowed only for abstract textures (concrete, paper).
- Never use Instagram exports as final assets; get originals.
- Remove text overlays and thumbnail graphics from Instagram creatives before reuse.
- Every image gets descriptive `alt` text (what, where, status).
- Formats: AVIF → WebP → JPG via `next/image`; `sizes` set per layout; hero image `priority`.

### 8.3 Aspect ratios
Hero render 4:5 · Project card 4:5 · Wide feature 16:9 · Gallery 3:2 · Detail 1:1 · OG image 1200×630.

---

## 9. Iconography
- **Line icons only**, 1.5px stroke, square caps, 24/32/48px. Lucide works as a base; custom icons for the services (plan, building, crane-grid, interior).
- Ink on light, concrete-2 on dark; turn gold on hover/active.
- No filled, emoji or 3D icons.

---

## 10. Motion

| Pattern | Spec |
|---|---|
| **Reveal** | Fade + 34px rise, 900ms, `cubic-bezier(.2,.7,.2,1)`, stagger 100ms; trigger at 15% visibility, once |
| **Hero rotating word** | See §7.11; 2.6s interval, 600ms slide + fade, `--ease` |
| **Hero photo** | On load, rises 24px and fades in (1s). On scroll, a gentle 4% parallax |
| **Plan → render → reality** (optional, Phase 1.1) | Plan SVG draws (stroke-dashoffset, 1.2s) → crossfades to render → to site photo. Use on `/design` or `/how-it-works`, not on the home hero |
| **Statement band images** | Scale 0.9 → 1 + fade, staggered 120ms |
| **Line draw** | Rules and grid lines 0 → 100% width/height, 800ms |
| **Image hover** | Scale 1.06, 900ms |
| **Parallax** | Max 6% translate on hero image only |
| **Counters** | 1.6s ease-out cubic |
| **City marquee** | 38s linear loop; pauses on hover |
| **Page transitions** | None (speed > flair) |

**Performance & accessibility**
- Respect `prefers-reduced-motion`: disable the hero sequence, parallax, marquee and counters, and show final states.
- On mobile and low-end devices (`navigator.hardwareConcurrency <= 4` or Save-Data), replace the hero sequence with a static render.
- Animate only `transform` and `opacity`.
- Smooth scroll (Lenis) on desktop pointer devices only.

---

## 11. Voice & Microcopy

- **Plain language.** Write for a family building their first home, not for architects. "Strong base for your home", not "RCC raft foundation optimisation".
- Short sentences. Talk to "you"; refer to the firm as "we".
- Prices and timelines are always ranges + "approx", with an exact quote after a site visit.
- Example CTAs: *Get free estimate* · *Book a site visit* · *Chat on WhatsApp* · *Build something like this* · *See how we build*
- **No em dashes (—) or en dashes (–) in any site copy.** They read as AI-written. Use a full stop, comma or colon instead.
- Avoid: "world-class", "best in class", "cutting-edge", "synergy", unverified "#1" claims.

---

## 12. Accessibility
- WCAG 2.1 **AA** minimum (palette verified in §3.3).
- Tap targets ≥ 44×44px; spacing between adjacent targets ≥ 8px.
- Visible focus ring on every interactive element (2px, 3px offset): ink on light surfaces, gold on dark (gold fails 3:1 on white).
- The slider, filters and calculator chips are fully keyboard operable with ARIA roles/labels.
- Form errors are announced (`aria-live="polite"`) and tied to inputs (`aria-describedby`).
- Language attribute switches to `bn` on Bengali pages.
- No information carried by colour alone (status badges have text).

---

## 13. Logo Usage

| Variant | Use |
|---|---|
| **Gold on transparent** | Dark sections, dark hero header, footer |
| **Ink (black) on transparent** | Light header after scroll, light sections, PDFs, forms |
| **Mark only (abis monogram)** | Favicon, app icon, WhatsApp avatar, small badges |

- Minimum width: 96px (full lockup) / 28px (mark).
- Clear space = height of the dot on the "i" on all sides.
- **In use (client decision, 26 Nov 2026):** the gold 3D "abis / THE ABIS CONSTRUCTION" lockup is used on every surface, light and dark (`public/brand/abis-logo.webp`, black background removed). **In the header** the logo's own wordmark is too small to read (≈7px), so the header shows the gold monogram (`abis-mark.webp`, 40px tall) with "THE ABIS / CONSTRUCTION" set as live Archivo text in ink beside it. Use the full raster lockup only at 120px tall or more (footer, OG image, PDFs). The monogram alone (`public/brand/abis-mark.webp`) is the favicon and app icon, on ink.
- Never add effects or recolour it.
- **Still needed from client:** vector (SVG/AI) master files. The current logo is a raster render, so it can't be recoloured to an ink version and loses sharpness when enlarged.

---

## 14. Implementation Tokens

### 14.1 CSS variables
```css
:root {
  --paper:#FFFFFF; --concrete:#F3F5F7; --concrete-2:#E3E7EB;
  --ink:#0C0D0D; --ink-2:#141616; --ink-3:#1D2020; --ink-muted:rgba(12,13,13,.45);
  --slate:#5B6670; --mist:#A0A9B2;
  --gold:#CFA548; --gold-tint:rgba(207,165,72,.12);
  --line:#E3E7EB; --line-dark:rgba(255,255,255,.10);
  --success:#2F7D4F; --warning:#B4561E; --error:#B3261E; --whatsapp:#25D366;

  --font-display:'Archivo',system-ui,sans-serif;
  --font-serif:'Instrument Serif',Georgia,serif;
  --font-body:'Manrope',system-ui,sans-serif;
  --sky:#CFE0EE; --concrete-tint:#E9EDF1;
  --font-bn:'Hind Siliguri','Manrope',sans-serif;

  --radius:2px;
  --container:1320px;
  --pad:clamp(20px,5vw,72px);
  --section:clamp(80px,11vw,150px);
  --ease:cubic-bezier(.2,.7,.2,1);
}
[data-theme="dark"] { background:var(--ink); color:#F5F6F4; --line:var(--line-dark); }
```

### 14.2 Tailwind (v4 `@theme`)
```css
@theme {
  --color-paper:#FFFFFF;  --color-concrete:#F3F5F7; --color-concrete-2:#E3E7EB;
  --color-ink:#0C0D0D;    --color-ink-2:#141616;    --color-ink-3:#1D2020;
  --color-slate:#5B6670;  --color-mist:#A0A9B2;
  --color-gold:#CFA548;   --color-ink-muted:rgba(12,13,13,.45);
  --color-success:#2F7D4F; --color-warning:#B4561E; --color-error:#B3261E;
  --color-sky:#CFE0EE; --color-concrete-tint:#E9EDF1;
  --font-display:'Archivo',sans-serif; --font-serif:'Instrument Serif',serif; --font-sans:'Manrope',sans-serif;
  --radius-DEFAULT:2px;
  --ease-arch:cubic-bezier(.2,.7,.2,1);
}
```

### 14.3 Section wrapper pattern
```tsx
<Section theme="dark" surface="ink">      // hero, render-vs-reality, founder, final CTA
<Section theme="light" surface="paper">   // default
<Section theme="light" surface="concrete">// alternate
```
Each `Section` sets `data-theme`, so child components (buttons, eyebrows, cards, logo) pick the right variant automatically.

---

## 15. Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep light surfaces cool grey/white | Use cream, beige or yellowed backgrounds |
| Use ink for accents on light; gold only for logo, stars, progress bar and dark sections | Use gold or brown text on light surfaces, or gold buttons on light |
| Show real projects with real numbers | Use stock families or fake testimonials |
| Use 2px corners and hairlines | Use rounded-2xl cards with heavy drop shadows |
| Write the way a site engineer explains to a family | Use architect jargon in headlines |
| Put one clear primary CTA per view | Put several primary buttons side by side |
| Use the dusk render in dark sections | Put text over busy daylight construction photos |
| Use serif italics for one accent phrase | Mix serif italics into body text or buttons |
| Keep body text ≥ 16px on mobile | Copy the reference's tiny body text |
| Use real awards or confirmed brand logos | Add a fake "Trusted by 150+ brands" strip |

---

## 16. Deliverables Checklist

- [ ] Figma: tokens, components, light + dark section variants
- [ ] Page designs: Home, Service template, Projects + detail, Packages, Estimator (all steps + result), About, City template, Careers, Contact/Booking, 404
- [ ] Mobile designs for all of the above (390px)
- [ ] Bengali layout check for Home, Estimator and Contact
- [ ] Logo ink variant + favicon/mark exports
- [ ] Icon set (services + UI)
- [ ] Estimate PDF template (A4, light, logo, blueprint footer)
- [ ] OG image template