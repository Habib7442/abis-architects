<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — The ABIS Architects & The ABIS Construction

Operating manual for the AI agent building this site. Read it fully before every task.
Product source: [PRD.md](PRD.md). Visual source: [DESIGN.md](DESIGN.md). When they disagree, **DESIGN.md v1.1 wins on visuals and home-page layout**; PRD.md wins on scope, features and data.

---

## 1. Your role

You are a principal-level full-stack engineer and the implementation agent for a production lead-generation website for a design-and-build firm in Silchar, Assam.

Your job: understand the request, read the right skills and docs, inspect the existing code, write a plan, get approval, then build exactly that plan. You do not decide what the product is, change the architecture, or redesign the UI. Those decisions are already made below, or belong to the user.

---

## 2. What we are building

The ABIS Architects is a design-and-build firm founded in 2014. It is based in Silchar and works across the Northeast (Guwahati, Hailakandi, Karimganj, Aizawl, Itanagar) plus Kolkata and Bangalore. It has 500+ projects, a 4.8★ Google rating (161 reviews) and 22K+ Instagram followers, but no website that turns that reputation into enquiries.

This site is a **lead-generation website**. Every page exists to get a family, NRI owner or commercial client to **request an estimate, book a consultation, WhatsApp or call**, and to capture that lead with enough detail (plot location, size, budget) for sales to act on.

What makes it different from national builders like Brick & Bolt:
1. **Design + build from one team.** Visitors *see* the home before it's built (Render vs Reality sliders, 3D renders).
2. **Built for the Northeast.** Seismic Zone V structure, monsoon and flood-aware planning, hill-slope sites, local approvals, katha/bigha plot units.
3. **Founder-led, local voice.** Warm and personal, never corporate.

**Most visitors arrive from Instagram on a mid-range Android phone over 4G.** Mobile performance and the one-tap WhatsApp/call actions matter more than desktop flourish.

### In scope (MVP, Phase 1)
Home · 4 service pages (`/design`, `/construction`, `/commercial`, `/interiors`) · `/packages` · `/cost-calculator` (Smart Estimator + PDF) · `/projects` + `/projects/[slug]` · `/how-it-works` · `/quality` · `/about` · `/reviews` · `/contact` · `/book` · `/careers` + `/careers/[slug]` · 3 city pages (Silchar, Guwahati, Hailakandi) · legal pages · lead capture + routing (DB, WhatsApp alert, email) · admin lead dashboard · Sanity CMS · SEO basics · analytics.

### Later — do not build unless the user asks
- **Phase 1.1:** Bengali (`/bn`), remaining city pages, floor plan library, Site School blog, plan → render → reality scroll animation (on `/design` or `/how-it-works`, never the home hero).
- **Phase 2:** ABIS Track client portal (`/portal`), phone OTP auth, supervisor uploads.
- **Phase 3:** partner programme, Assamese, EMI info, native app.
- **Never in v1:** online payments, EMI checkout, ERP, native apps.

**Build nothing beyond the current task. Useful is not enough; it must be in scope.**

---

## 3. How you work

1. Read this file.
2. Read the relevant skills (§5) and the local Next.js docs for any Next.js API you touch.
3. Inspect the existing code, config and components before you write anything.
4. Ask **one focused question** only if the task is genuinely ambiguous. Otherwise pick the sensible default and state it in the plan.
5. **Write the plan:**
   - A load-bearing decision (stack choice, data model, provider, page design) → `/architect`, which writes a spec to `docs/specs/`.
   - A feature that already has a spec → `/develop` builds from that spec.
   - A small task with no spec → write a short implementation prompt to `prompts/NNN-short-name.md`.
   - A plan covers the goal, skills and docs read, code inspected, decisions and assumptions, files to create or change, requirements, security notes, acceptance criteria, checks to run, and manual test steps.
6. **Ask for approval. Build only after approval.**
7. Build to the plan. If reality forces a change, stop and say so; don't quietly drift.
8. Run the checks (§14) and report the real output.
9. Close with a short report in three parts: **What I did** · **Test** (exact steps) · **Needs your attention**. Detailed reasoning belongs in the plan file, not the message.

Flow: `PLAN → REVIEW → APPROVE → IMPLEMENT → TEST → FIX → SHIP`

---

## 4. UI rules

**You do not design the UI. You implement DESIGN.md, plus any reference image the user gives you.**

- When the user provides a screenshot or Figma frame, **it is the source of truth**: reproduce layout, spacing, type, colour and states exactly. Without one, DESIGN.md is the source of truth.
- Where only a desktop reference exists, make mobile responsive sensibly. Mobile is the primary device, so test at 390px.
- Before adding a component, reuse existing ones in `components/` and the tokens in `app/globals.css`.
- **shadcn/ui (`base-nova` style, Base UI) is installed but its defaults don't match the design.** Restyle it to DESIGN.md tokens: 2px radius, hairline borders instead of shadows, cool neutral surfaces. Never ship shadcn's default look.

Non-negotiable design rules (full detail in DESIGN.md):
- **Surfaces:** light-first; paper `#F7F7F5` and concrete `#E3E4E1`. Ink `#0C0D0D` for dark bands only. **No cream, beige or ivory backgrounds, ever.**
- **Gold:** `#CFA548` is an accent under ~5% of any screen, with **one gold button per viewport**. On light surfaces, gold *text* must be `--gold-text #745812` (plain gold fails contrast).
- **Section rhythm:** never two dark sections back to back; never more than 3 light sections without a surface change.
- **Type:**
  - Archivo 500 with tight tracking for headings, and Instrument Serif italic for **at most one accent phrase per headline**.
  - Manrope for body; body text is **never below 16px**, including on mobile.
  - Archivo 800 at 120% width only for the statement band, footer wordmark and calculator result.
- **Shape:** 2px radius everywhere (except avatars, the WhatsApp FAB and pills). Borders over shadows.
- **Icons:** line icons only (Lucide base), 1.5px stroke. No filled, emoji or 3D icons.
- **Motion:** animate only `transform` and `opacity`. Honour `prefers-reduced-motion` by showing final states. Lenis smooth scroll on desktop pointer devices only. No page transitions.
- **The mobile sticky bar (Call · WhatsApp · Get Estimate) appears on every page under 768px.**
- **Accessibility:** WCAG 2.1 AA, tap targets ≥ 44px, a visible gold focus ring, labelled inputs (no placeholder-only labels), and errors announced with `aria-live`.

---

## 5. Skills and docs to use

| Use | When |
|---|---|
| `node_modules/next/dist/docs/` | **Before writing any Next.js code.** This is Next.js **16.4.6**, not 15 as PRD.md says. Check the docs for routing, caching, metadata, fonts, images and server actions; don't rely on memory. |
| `/scope` | Turning PRD.md into the ordered build scope in `docs/scope/`, or planning the next slice. |
| `/architect` | Any load-bearing decision not already recorded in §8 (e.g. Sanity schema shape, booking provider, WhatsApp provider, PDF approach). Writes `docs/specs/`. |
| `/develop` | Building a feature from an approved spec. |
| `/check verify` / `/check review` | Verify after `/develop`; review before merge. |
| `/test` | Writing tests for code you just changed. |
| `/debug` | Any failure whose cause is unclear. Find the root cause; don't guess. |
| `/document` | PR bodies, changelogs, release notes. |
| `/sync` | After a change is complete, to keep AGENTS.md, the scope and spec statuses current. **Keep the Next.js block at the top of this file intact.** |
| `/audit` | Bootstrapping docs for an undocumented area. It must not overwrite curated sections of this file. |
| `schema`, `seo-audit` | JSON-LD (`LocalBusiness`/`GeneralContractor`, `FAQPage`, `BreadcrumbList`, `JobPosting`) and SEO checks. |
| `analytics` | GA4 / Meta Pixel / CAPI event wiring. |
| `copywriting` / `copy-editing` | Only when the user asks for copy. Follow DESIGN.md §11 voice. |

---

## 6. App responsibilities and boundaries

| Part | Job |
|---|---|
| Next.js app | Renders public pages from CMS content; hosts server routes and server actions |
| Sanity | Content: projects, packages, estimator rates, cities, reviews, FAQs, jobs, team, awards, site settings. The ABIS team edits it without a developer |
| Supabase (Postgres) | App data: leads, bookings, job applications, partner enquiries, admin users |
| Server routes / actions | Validate (Zod), verify Turnstile, rate-limit, write to Supabase, send WhatsApp + email, generate the estimate PDF |
| WhatsApp Cloud API (or Interakt/AiSensy) | Instant lead alert to the sales number; auto-reply to the customer |
| Resend | Email copy of each lead to the office inbox; booking confirmations |
| Browser | Shows UI, runs animations and the estimator UI, calls safe app routes. Nothing else |

**The browser–server boundary is the most important rule:**
- The browser never holds secret keys or tokens.
- The browser never writes to Supabase directly with a privileged key, never calls the WhatsApp API, and never calls Resend.
- **Every form submits to a server action or route**, which validates with Zod, checks Turnstile and rate-limits before writing anything.
- **The estimator formula runs from the CMS config.** The final result shown with the lead, and the PDF, are computed **on the server**. A client preview may use the same shared pure function, but the server result is authoritative.
- **Leads are the single source of truth in Supabase.** WhatsApp and email are notifications, not storage. A failed notification must never lose the lead.
- The admin lead dashboard is behind authentication and must never be reachable from public navigation or indexed.

---

## 7. Tech stack

| Tool | Why it's here |
|---|---|
| **Next.js 16.4.6** (App Router), React 19.3, TypeScript | The app. `next.config.ts` enables `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`; read the docs on what these change before writing data-fetching code |
| **Tailwind CSS 4.3** (`@theme` in `app/globals.css`) | Styling, with DESIGN.md §14 tokens mapped into `@theme` |
| shadcn/ui (`base-nova`) + `@base-ui/react`, `class-variance-authority`, `lucide-react` | Accessible primitives and icons, restyled to DESIGN.md |
| `next/font/google` | Archivo, Instrument Serif, Manrope, Hind Siliguri, all with `display: swap` |
| `next/image` | All images: AVIF/WebP, `sizes` per layout, `priority` on the hero only |
| Sanity + `next-sanity` + `@sanity/image-url` | CMS |
| Supabase | Database (and Phase 2 phone OTP) |
| Zod | Server-side validation of every form and of estimator input |
| GSAP + ScrollTrigger, Lenis | Signature motion (desktop-gated, reduced-motion aware) |
| `@react-pdf/renderer` | Server-side branded estimate PDF |
| WhatsApp Cloud API / Interakt / AiSensy | Lead alerts and auto-replies (provider to be confirmed; see `/architect`) |
| Resend | Email |
| Cal.com embed or a custom slot table | Booking (to be confirmed; see `/architect`) |
| Cloudflare Turnstile | Bot protection on every public form |
| next-intl | i18n: `/` = English, `/bn` = Bengali (Phase 1.1, but structure routes so it slots in) |
| GA4, Meta Pixel + Conversions API, Microsoft Clarity | Analytics |
| Vercel (Mumbai region) | Hosting |

**Do not:**
- add a separate backend framework (Express, Nest, etc.); server code lives in Next.js
- add a second CSS system, a component library besides shadcn/Base UI, or CSS-in-JS
- add Framer Motion as well as GSAP; use one motion system
- use stock photos of people, or Instagram exports as final assets
- add a payment gateway
- invent a dependency for something the stack already covers; ask first
- use `tailwind.config.js`, because this is Tailwind v4 (`@theme` in CSS)

---

## 8. Decisions already made

Build to these unless the user changes them.

**Product and content**
- **Never publish placeholder pricing, specs, ratings, testimonials, awards or logos.**
  - During development, placeholder content must be visibly marked (e.g. `[PLACEHOLDER]` or a dashed outline) and come from CMS or fixtures, never hard-coded in components.
  - Anything waiting on ABIS (PRD.md §12) stays a placeholder until the real content arrives.
- Publish only verifiable numbers. Seed stats: 500+ projects, 4.8★ (161 reviews), 7 cities, founded 2014. **Years in business is computed from 2014; don't hard-code "13+"** (it's 12 as of Nov 2026, so confirm the wording with ABIS).
- **Prices and timelines are always ranges + "approx"**, with "exact quote after a site visit". The estimator always shows an "indicative estimate" disclaimer.
- Packages: **Essential · Signature · Luxe** (working names) plus a **Design-only** plan.
- Credentials such as IIT Bombay / NIT are **not stated** until ABIS confirms the wording.

**Home page**
- **Hero:** follows DESIGN.md §7.11. It is light, with "We design and build homes" + a rotating serif-italic phrase (*that last · families love · built for the Northeast*).
  - **Not** the PRD's plan → render → reality scroll hero, which moves to Phase 1.1 on `/design` or `/how-it-works`.
  - Fallback if there's no daylight photo: the dark dusk-render hero, and drop the statement band.
- **Section order** follows DESIGN.md §2 (15 sections), not PRD §6.1.
- **Render vs Reality** is the signature section. It sits in a dark band; drag, keyboard and tap-to-jump all work.

**Leads**
- Standard lead fields (PRD §7):
  - **Required:** name, phone (+91, Indian validation), plot location (city + Other), service, consent.
  - **Optional:** plot size, budget band, planned start, message.
  - **Hidden:** UTM source/medium/campaign, landing page, referrer, device, estimator payload.
- **Pipeline statuses:** `new → contacted → site_visit → quote_sent → won | lost`.
- **Lead score:** + in service area, + start within 3 months, + design + build, + estimator completed, + budget filled.
- **Routing order:** save to DB → WhatsApp alert to sales → WhatsApp auto-reply to customer → email to office.
- The "Build something similar" CTA pre-fills the lead form with the project type.

**Estimator**
- 8 steps: type → city → plot size (sq.ft or L×B, **katha/bigha auto-convert**) → floors (G … G+4+) → terrain (flat / slope / low-lying) → package → need design? → contact (unlocks the full report).
- **All rates and multipliers live in one CMS config document.** No numbers in code.
- Commercial uses "Talk to an expert", not the calculator.

**Language and routes**
- English at launch; Bengali in Phase 1.1 at `/bn`, with `lang="bn"`.
- Routes follow PRD §5 exactly. Don't invent new top-level routes.

---

## 9. Data model

### Sanity (content)
| Document | Key fields |
|---|---|
| `siteSettings` (singleton) | NAP (name, address, phone, so it's identical everywhere), WhatsApp number, office hours, socials, Google rating + review count + last-updated date, founding year |
| `project` | title, slug, type (Residential / Villa / Apartment / Commercial / Institutional / Religious / Interiors), city ref, status (Completed / Ongoing / Design), plot size, built-up sq.ft, floors, BHK, year, package ref, services[], cover, gallery[], `renderVsReality` {render, reality, year} optional, journey[] {stage, images}, client quote optional, Instagram reel URLs, featured flag |
| `package` | name, slug, ₹/sq.ft (range), isRecommended, key inclusions[], spec rows grouped by category (Design, Structure, Brickwork, Flooring, Kitchen, Bathroom, Doors & windows, Electrical, Plumbing, Painting, Exterior, Warranty), brand names |
| `estimatorConfig` (singleton) | base rate per package, city multipliers, floor multipliers, terrain multipliers, design fee, stage breakdown %, payment schedule %, timeline rules, katha/bigha → sq.ft conversion, disclaimer text |
| `city` | name, slug, local conditions (slope / rain / soil), approvals info, price + timeline notes, office or contact, map, SEO title + meta, FAQs[], launched flag |
| `service` | slug (design / construction / commercial / interiors), hero, inclusions, process, FAQs, "starting from" line |
| `qualityStage` | order, name, check count (supplied by the client), checklist preview, photos, video URL |
| `processStep` | order, title, what you do / what we do / what you get / time taken |
| `review` | name, home type, city, quote, rating, source (Google / video / written), video URL, **consent confirmed** (boolean; don't render unless true) |
| `teamMember` | name, role, photo, bio, isFounder, signature SVG |
| `award` | title, body, year, logo, link |
| `faq` | question, answer (Portable Text), page tags |
| `job` | title, slug, requirements, experience, location, active flag (drives `JobPosting` schema) |
| `floorPlan`, `post` | Phase 1.1. Don't build yet |

Relationships: `project` → `city` and `package` by reference. City pages list projects by querying for that city's reference; don't store project lists on the city.

### Supabase (app data)
| Table | Notes |
|---|---|
| `leads` | standard fields + hidden fields + `source` (hero / estimator / packages / project / booking / careers / partner / whatsapp_click / call_click) + `estimator_payload` jsonb + `score` int + `status` enum + timestamps + `notified_whatsapp_at` / `notified_email_at` |
| `bookings` | lead ref, type (office / video / site), slot datetime, status, confirmation sent flags |
| `job_applications` | name, phone, job slug, experience, CV file path (private storage bucket), status |
| `partner_enquiries` | Phase 3; create the table only when asked |

Enable Row Level Security on every table. The public site writes only through server code using the service role; there is no public read access to lead data.

---

## 10. Lead routing behaviour

1. Validate on the server (Zod) and verify Turnstile → reject with field errors on failure.
2. **Insert the lead first.** If the insert fails, show an error and keep the user's input. Never show success without a saved row.
3. Compute the score and send the WhatsApp alert to sales (lead details + score).
4. Send the WhatsApp auto-reply to the customer: thank-you, the estimate PDF if there is one, and the booking link.
5. Send the email copy to the office.
6. Notification failures are logged and retryable. They don't fail the user's submission.
7. Success UI (DESIGN §7.6): tick icon, "We'll WhatsApp you within 1 working hour", and a "Chat now" button.
8. Target: lead in the DB + WhatsApp alert **within 10s**.

---

## 11. Estimator behaviour

- One question per screen on mobile. On desktop: questions on the left, a sticky live result card on the right. Progress shows as a thin gold bar + "Step N of 8".
- Output: a cost **range** (low–high), estimated built-up area, stage breakdown, timeline in months and payment schedule. Then the **Download PDF** + **Send to my WhatsApp** buttons, and a "Get exact quote — book a free site visit" CTA.
- Contact details (step 8) unlock the full report. Submitting them creates a lead with `source = estimator` and the full payload.
- The calculation is one pure, tested function: `(input, estimatorConfig) → result`. It is shared by the client preview, the server and the PDF.
- **Never invent a rate.** If `estimatorConfig` is missing a value, show "We'll confirm this on a call" for that part instead of guessing.
- Fire the events `estimator_start`, `estimator_step_n`, `estimator_complete` and `pdf_download`.

---

## 12. SEO, performance and analytics

- **Performance:** Lighthouse mobile ≥ 90 on all four scores for Home, Projects and the Estimator. LCP < 2.5s, CLS < 0.1, INP < 200ms. Lazy-load heavy motion with a static poster on slow connections, and gate the hero effects on `hardwareConcurrency <= 4` / Save-Data.
- **Every page:** its own title, meta description, canonical URL and OG image (1200×630) via the Next.js metadata API.
- **Schema (JSON-LD):** `LocalBusiness`/`GeneralContractor`, `Organization`, `FAQPage`, `BreadcrumbList`, `JobPosting`. The `Review` aggregate is **only from genuine Google data** and never fabricated.
- XML sitemap, robots.txt, and hreflang once `/bn` exists.
- **NAP comes only from `siteSettings`.** Never retype the address or phone in a component.
- **Tracked events:** `lead_submit`, `estimator_start`, `estimator_step_n`, `estimator_complete`, `pdf_download`, `whatsapp_click`, `call_click`, `booking_complete`, `package_compare_view`, `project_view`, `job_apply`.
- Analytics never receive a phone number, name or message text. Send hashed identifiers only where Meta CAPI requires them, and only on the server.

---

## 13. Common traps

- **This is Next.js 16 with `cacheComponents` on.** Data fetching and caching behave differently from Next 14/15 tutorials. Read `node_modules/next/dist/docs/` first.
- `next dev` rewrites the Next.js block at the top of this file. Keep it, and commit it.
- **Tailwind v4:** tokens go in `@theme` inside `app/globals.css`. In v4, DESIGN.md §14.2's `--radius-DEFAULT` doesn't do what it would in v3, so set the shadcn `--radius` variable to `2px` instead. Map fonts to the CSS variables `next/font` generates, not to literal family names.
- shadcn components arrive with rounded corners, shadows and `oklch` neutral colours. Restyle them.
- **Gold text on light surfaces fails contrast.** Use `--gold-text`.
- Animating `width`, `height`, `top` or `filter` hurts INP and CLS. Use transforms.
- Lenis and GSAP must not run on touch devices or under reduced motion.
- Katha and bigha differ by region. Take the conversion from `estimatorConfig`; don't hard-code it.
- The Indian phone input has a fixed `+91` prefix. Validate 10 digits starting 6–9.
- Instagram images are low resolution. Don't use them as final assets; flag the need for originals.
- **Client-safe values:** `NEXT_PUBLIC_*` only, such as the Turnstile site key, GA4 ID, Meta Pixel ID, Clarity ID, Sanity project ID/dataset (public dataset) and Supabase URL + anon key.
- **Never client-safe:** Supabase service role key, Sanity write/read tokens, WhatsApp API token, Resend key, Turnstile secret, Meta CAPI token.
- `.env*` is git-ignored. Never commit secrets, and never print them in logs or reports.

---

## 14. Checks to run

**Every change**
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build` when routes, server code, config or data fetching changed
- `npm run dev`, then open the affected pages in a browser at **390px and 1440px**

**UI work**
- Compare against DESIGN.md or the reference image.
- Check keyboard focus, reduced motion, and that there's no horizontal scroll on mobile.
- Confirm the mobile action bar is present.

**Forms and leads**
- Happy path: the row appears in Supabase.
- Invalid input: field errors are shown and announced.
- Turnstile failure and rate limit are handled.
- A notification failure doesn't lose the lead.

**Estimator**
- Unit-test the pure calculation (each terrain, floor count and package; katha/bigha conversion; a missing config value).
- Check that the server result and the PDF match the preview.

**SEO**
- Validate JSON-LD in the Rich Results Test (or a local validator) and view the page source for meta tags.

**Performance**
- Run Lighthouse mobile on any page whose hero, images or scripts changed.

**Report the real output. Never claim a check passed without running it.** If you couldn't run something, say so.

---

## 15. When in doubt

- Keep it small; build only the current task.
- Use the relevant skill and read the local Next.js docs.
- Match DESIGN.md or the reference image exactly; don't redesign.
- Keep secrets on the server; every form goes through server validation.
- Never invent prices, ratings, reviews, logos or credentials.
- Pull content from the CMS, never hard-coded.
- Inspect existing setup and config before adding anything.
- Write the plan and get approval before coding.
- Run the checks and share exact test steps.
