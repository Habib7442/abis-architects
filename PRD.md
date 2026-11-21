# PRD — The ABIS Architects & The ABIS Construction Website

| | |
|---|---|
| **Product** | abisarchitects.in (working domain — to be confirmed) |
| **Client** | The ABIS Architects / The ABIS Construction, Silchar, Assam |
| **Prepared by** | Habib Tanwir — Locallify |
| **Version** | 1.0 (Draft) |
| **Date** | 21 November 2026 |
| **Status** | For client review |

---

## 1. Summary

The ABIS Architects is a design-and-build firm founded in 2014. It is based in Silchar and works across Assam and the Northeast (Guwahati, Hailakandi, Aizawl, Itanagar), as well as Kolkata and Bangalore. It has 500+ premium projects, a 4.8★ Google rating from 161 reviews and 22K+ Instagram followers, but **no website that turns this reputation into enquiries**. Today, leads come through Instagram DMs, phone calls and walk-ins, and nothing is tracked.

This PRD defines a **lead-generation website and client experience platform**. It uses the proven structure of national home-construction brands such as Brick & Bolt (pricing transparency, cost calculator, packages, quality promises, project proof and city pages). It then adds things ABIS has that those brands don't:

1. **Design + Build under one roof.** Brick & Bolt mainly sells construction. ABIS designs the building *and* builds it. The site should let people *see* their home before it's built.
2. **Built for the Northeast.** The site talks about earthquake-resistant structure (Assam is in Seismic Zone V), monsoon and flood-aware planning, hill-slope sites (Aizawl, Itanagar) and local approvals.
3. **Founder-led trust.** The founder is the face of the brand on Instagram, so the site should keep that personal, local voice instead of a faceless corporate one.

---

## 2. Goals & Success Metrics

### Business goals
| # | Goal | KPI | Target (6 months after launch) |
|---|---|---|---|
| G1 | Generate qualified construction and design leads | Form + WhatsApp + call leads per month | 120+ / month |
| G2 | Pre-qualify leads before the first call | % of leads with plot location, size and budget filled | ≥ 70% |
| G3 | Rank locally for high-intent searches | Top-3 Google position for "architect in Silchar", "house construction Silchar", "builders in Silchar" | 3 of 3 keywords |
| G4 | Turn Instagram followers into website leads | Sessions from Instagram bio/stories | 2,500+ / month |
| G5 | Reduce the "how much will it cost?" calls | Cost calculator completions | 300+ / month |
| G6 | Build a hiring pipeline | Job applications via the careers page | 20+ / month |

### Product goals
- Load in **under 2.5 s (LCP)** on a mid-range Android phone over 4G, because most visitors come from Instagram on mobile.
- Every page is **one tap away from WhatsApp or a phone call**.
- The ABIS team can update projects, prices, jobs and blogs **without a developer**.

### Non-goals (v1)
- Online payments or EMI checkout
- A full ERP or project-management system for internal staff
- Native mobile apps (planned for Phase 3, see §11)

---

## 3. Target Users

| Persona | Who they are | What they need | Primary CTA |
|---|---|---|---|
| **Home builder (primary)** | 30–55, owns or just bought a plot in Silchar, Hailakandi or Karimganj. Building their first or family home. Often searching on behalf of parents. | "How much will it cost? Can I trust you? Show me homes like mine." | Cost calculator → consultation |
| **NRI / outstation owner** | Works in Bangalore, Kolkata, the Gulf or elsewhere and is building a home back in Assam | Remote updates, transparency, someone trustworthy on the ground | Online consultation + site tracking |
| **Commercial client** | Shop owner, school trust, hospital, hotel, religious committee | Portfolio proof for large buildings, team credibility, timelines | Talk to an expert |
| **Interior-only client** | Already has a house or flat | Interior styles, packages, quick quote | Interior enquiry |
| **Job seeker** | Site supervisors, engineers, architects, interns | Open roles and an easy way to apply | Apply (WhatsApp / form) |
| **Channel partner** | Local contractors, material dealers, property agents | Referral programme | Partner form |

---

## 4. Competitive Reference & Differentiation

| Pattern | Brick & Bolt does | ABIS will do (creative upgrade) |
|---|---|---|
| Hero | Headline + awards + stats + Get in Touch | **"Draw it. Build it." scroll hero**: a 2D floor plan that turns into the 3D render and then into the real site photo as the user scrolls |
| Pricing | From ₹X/sq.ft, packages | Same transparency, plus a **"Design-only"** price tier, which Brick & Bolt doesn't offer |
| Cost calculator | Basic estimate | **Smart Estimator**: plot size, floors, location, package and **soil/terrain type (flat / slope / low-lying)** → cost range, timeline and a downloadable PDF |
| Quality | QASCON 470+ checks | **ABIS 7-Stage Quality Promise**, made visual and tied to the founder's "Wallwork Essentials" video series |
| Projects | Cards with size and package | Cards plus a **"Render vs Reality"** slider: the 3D design next to the finished building |
| Trust | Escrow, delay penalty | Stage-wise payments, a written timeline, **Zone V earthquake-safe structural design**, and a structural warranty (terms to be confirmed with the client) |
| City pages | 10 city SEO pages | City pages for Silchar, Guwahati, Hailakandi, Karimganj, Aizawl, Itanagar, Shillong, Kolkata and Bangalore, with **local approvals info** |
| App | Tracking app | Phase 2: **client portal**, a mobile-first web app with weekly site photos and milestones |
| Language | English | **English + বাংলা (Bengali)** in v1, with **অসমীয়া (Assamese)** in Phase 2 |

---

## 5. Information Architecture

```
/                                  Home
/design                            Architecture & Design (planning, 3D, approvals)
/construction                      Home Construction (turnkey)
/commercial                        Commercial & Institutional
/interiors                         Interior Design
/packages                          Packages & Pricing (compare)
/cost-calculator                   Smart Estimator
/projects                          Portfolio (filterable)
/projects/[slug]                   Project detail
/how-it-works                      Process (design → handover)
/quality                           7-Stage Quality Promise
/about                             Story, founder, team, awards
/reviews                           Testimonials + Google reviews
/locations/[city]                  City landing pages (SEO)
/floor-plans                       Ready plan library (by plot size)
/floor-plans/[slug]                Plan detail
/blog                              "Site School" — guides & videos
/blog/[slug]                       Article
/careers                           Open roles
/careers/[slug]                    Role detail + apply
/partner                           Channel partner / referral
/contact                           Contact, map, office hours
/book                              Consultation booking
/portal (Phase 2)                  Client login → project tracker
/privacy  /terms  /refund-policy   Legal
```

**Header nav:** Design · Construction · Interiors · Projects · Pricing · About · [City selector] · **Book Consultation** (primary) · Phone icon

**Mobile:** a sticky bottom bar with 3 actions: **Call · WhatsApp · Get Estimate**

---

## 6. Page Requirements

### 6.1 Home
Sections in order:

1. **Hero: "Draw it. Build it."**
   - Scroll-driven sequence: floor-plan line drawing → 3D render → real construction photo of the same project.
   - H1: *"Your home, designed and built by one trusted team."*
   - Sub: *Architects & builders from Silchar since 2014. 500+ projects across the Northeast.*
   - CTAs: **Get free estimate** (calculator) · **Book consultation**
   - Trust chips: ★ 4.8 Google (161 reviews) · 500+ projects · 13+ years · Multi-award winning
2. **Quick estimate widget**: plot size + floors + city → "Approx ₹__ – ₹__", with "See full breakdown" leading to the calculator.
3. **What we do**: 4 cards (Design · Construction · Commercial · Interiors), each with a "starting from" line.
4. **Render vs Reality**: 2–3 drag sliders comparing a 3D design with the finished building. *This is the signature section.*
5. **Featured projects**: 6 cards with type, size (sq.ft), floors, city and status (Completed / Ongoing), linking to all projects.
6. **Why ABIS**: 6 promise cards:
   - One team, one contract (design + build)
   - Fixed, itemised quote with no hidden costs
   - Stage-wise payments, paid only after each stage is done
   - Earthquake-safe structure (Zone V design)
   - Weekly photo updates
   - Founder personally reviews every project
7. **7-Stage Quality Promise**: a timeline (Soil test → Foundation → Columns & slabs → Brickwork → Plaster & waterproofing → Finishing → Handover), with check counts per stage that the client supplies.
8. **Packages teaser**: 3 package cards with ₹/sq.ft and a "Compare packages" link.
9. **How it works**: 5 steps (Talk → Design & 3D → Estimate & approvals → Build → Handover).
10. **Reviews**: Google rating summary plus 4–6 written or video testimonials (real, from the client, with consent).
11. **Founder note**: photo, a short personal message and signature, with a link to Instagram reels.
12. **Awards & media**: award logos and the BAIC Expo feature.
13. **Cities we build in**: chips linking to the city pages.
14. **Site School**: 3 latest guides or reels (e.g. "Wallwork essentials you must know").
15. **FAQ**: 6–8 questions with schema markup.
16. **Final CTA + lead form.**
17. **Footer.**

### 6.2 Smart Estimator (`/cost-calculator`)
A multi-step form, one question per screen on mobile:

| Step | Input | Type |
|---|---|---|
| 1 | What are you building? | House / Villa / Apartment / Commercial / Interiors only |
| 2 | City / location of plot | Select + "Other" |
| 3 | Plot size | sq.ft, or length × breadth; supports **katha / bigha** with automatic conversion (local units) |
| 4 | Number of floors | G, G+1, G+2, G+3, G+4+ |
| 5 | Plot terrain | Flat · Slope / hill · Low-lying / flood-prone |
| 6 | Package | Essential / Signature / Luxe (see §6.3) |
| 7 | Need design too? | Yes (design + build) / Already have drawings |
| 8 | Contact details to unlock the full report | Name, phone (OTP optional), WhatsApp consent |

**Output:**
- Cost range (low–high) and built-up area estimate
- Breakdown by stage (foundation, structure, finishing, etc.)
- Estimated timeline in months
- Payment schedule by stage
- **Download PDF estimate** (branded) and **Send to my WhatsApp**
- CTA: "Get exact quote — book a free site visit"

**Admin:** rates, multipliers (terrain, city, floors) and package prices are editable in the CMS. All formulas live in one config so the client can adjust them without code.

### 6.3 Packages (`/packages`)
- 3 tiers (working names): **Essential · Signature · Luxe**, plus a **Design-only** plan.
- Comparison table grouped by category: Design & drawings, Structure (steel/cement brands), Brickwork, Flooring, Kitchen, Bathroom, Doors & windows, Electrical, Plumbing, Painting, Exterior, Warranty.
- Every row says what is included, with brand names wherever possible.
- Sticky header shows package names and ₹/sq.ft on scroll.
- **All prices and specs must come from ABIS. Do not publish placeholder pricing.**

### 6.4 Projects (`/projects`, `/projects/[slug]`)
- **Filters:** Type (Residential / Villa / Apartment / Commercial / Institutional / Religious / Interiors), City, Status (Completed / Ongoing / Design), Floors.
- **Card:** cover image, name, city, sq.ft, floors, status badge.
- **Detail page:**
  - Hero gallery (lightbox, swipe on mobile)
  - Key facts: plot size, built-up area, floors, timeline, package, services (Design / Build / Interiors)
  - Render vs Reality slider (if available)
  - Construction journey: a photo timeline by stage
  - Client quote (optional)
  - Embedded Instagram reel(s)
  - "Build something similar" CTA, which pre-fills the form with the project type
- Seed projects from Instagram: The Grand Villa (Silchar), Grand Hawaithang Mosque, institutional building (Work in Progress), and residential renders.

### 6.5 Service pages (Design / Construction / Commercial / Interiors)
Common template: hero, what's included, process, relevant projects, packages or pricing, FAQs, CTA.
- **Design:** site analysis, floor plans, elevations, 3D renders and walkthroughs, structural drawings, Vastu-friendly planning (optional), help with municipal / GMDA / town-planning approvals.
- **Construction:** turnkey scope, material brands, quality stages, site supervision, payment schedule.
- **Commercial:** schools, hospitals, hotels, showrooms and religious buildings, with a "Talk to an expert" CTA instead of a calculator.
- **Interiors:** style gallery (Modern, Contemporary, Traditional Assamese/Bengali touches), room-wise scope, modular kitchen and wardrobes.

### 6.6 How it works & Quality
- **How it works:** a 5-step visual timeline. Each step lists *what you do / what we do / what you get / time taken*.
- **Quality:** the 7 stages, each with a checklist preview, photos and a short video from the founder's educational series.

### 6.7 About
- Story since 2014, mission and the meaning behind the logo
- Founder profile and video
- Team (architects, engineers, site supervisors)
- Awards and recognitions timeline
- Offices and experience centres (Silchar HQ, plus others if applicable)
- Stats counter

### 6.8 City pages (`/locations/[city]`)
- Unique content per city covering local building conditions (slope, rain, soil), approvals, prices and timelines
- Projects in that city, office or contact person, map
- Locally targeted title, meta and FAQ schema
- At launch: **Silchar, Guwahati, Hailakandi, Karimganj, Aizawl, Itanagar**. Later: Shillong, Kolkata, Bangalore.

### 6.9 Floor Plan Library
- Browse by plot size (e.g. 20×40, 30×40, 30×50, 40×60), BHK, floors and facing.
- Each plan has a 2D image, area table, 3D thumbnail and a "Customise this plan" CTA (lead).
- This drives SEO traffic and gives people an easy first step.

### 6.10 Site School (Blog)
- Articles plus embedded reels, in English and Bengali
- Categories: Cost & Budget, Materials, Design Ideas, Approvals, Monsoon & Earthquake Safety, Interiors
- Every post ends with a CTA to the estimator

### 6.11 Careers
- Role list (seed: **Site Supervisor**, 12th passed, 1–2 years' experience)
- Role detail, then apply via a form (name, phone, role, experience, CV upload) or WhatsApp

### 6.12 Contact & Booking
- Address: Sonai Road, SA Chowdhury Lane, opp. Kia Showroom, Kanakpur, Silchar, Assam 788006
- Hours: Mon–Sat, 10:00 AM – 7:00 PM · Phone: +91 90516 33891
- Google Map embed, directions button, socials
- **Booking:** choose Office visit / Online video call / Site visit, then a date and time slot, then confirmation on WhatsApp and email (Cal.com or a custom slot system)

---

## 7. Lead Capture & CRM

### Lead sources
Hero form · Estimator · Packages · Project "build similar" · Booking · WhatsApp click · Call click · Careers · Partner form

### Standard lead form fields
| Field | Required | Notes |
|---|---|---|
| Name | ✅ | |
| Phone | ✅ | Indian format validation; OTP optional (Phase 2) |
| Location of plot | ✅ | City dropdown + "Other" |
| Service needed | ✅ | Design + Build / Design only / Construction only / Interiors / Commercial |
| Plot size | ⬜ | |
| Budget range | ⬜ | Bands |
| Planned start | ⬜ | Within 3 months / 3–6 / 6–12 / Just exploring |
| Message | ⬜ | |
| Consent | ✅ | WhatsApp / call consent + privacy link |

Hidden fields: UTM source/medium/campaign, landing page, referrer, device, and the estimator payload (if any).

### Routing
1. Lead is saved to the database (single source of truth).
2. Instant **WhatsApp alert to the ABIS sales number**, with lead details and a lead score.
3. Auto-reply to the customer on WhatsApp: thank-you note, estimate PDF (if applicable) and booking link.
4. Email copy to the office inbox.
5. Admin lead dashboard with status pipeline: *New → Contacted → Site visit → Quote sent → Won / Lost*.

### Lead scoring (simple)
+ Plot location within service area · + start within 3 months · + design + build · + estimator completed · + budget band filled

---

## 8. Phase 2 — Client Portal ("ABIS Track")

A mobile-first web app (PWA) for signed clients, especially NRIs and outstation owners.

- Login by phone OTP
- Project dashboard: % complete, current stage, next milestone
- **Weekly photo and video updates** uploaded by site supervisors from their phones
- Milestone timeline with quality checklist sign-offs
- Payment schedule: paid, due and upcoming (view only, no payment gateway in v1)
- Documents: drawings, 3D renders, agreement, approvals, invoices
- Change-request log with approval status
- Chat shortcut to the assigned project manager on WhatsApp

**Admin side:** create a project, assign a supervisor, upload updates, mark milestones.

---

## 9. Design Direction

- **Mood:** architectural, premium and calm. Think "drawing board meets finished home". Generous whitespace, strong grid, thin blueprint lines as a recurring motif.
- **Palette:** brand black (`#0C0D0D`) + logo gold (`#CFA548`) used **sparingly** as an accent, plus cool concrete grey (`#E3E4E1`) for light sections and a slate (`#5E6461`) for secondary text. **No cream/beige backgrounds.**
- **Typography:** Archivo (wide display weights for headlines) + Manrope (body). Bengali: Noto Sans Bengali / Hind Siliguri.
- **Signature interactions:**
  - Plan → render → reality scroll sequence (GSAP ScrollTrigger)
  - Render vs Reality drag slider
  - Animated stat counters
  - Blueprint grid lines that draw in on scroll
- **Photography:** real projects and real team members only, with no stock photos of people. High-resolution originals of renders are required (the Instagram exports are too low-res).
- **Accessibility:** WCAG 2.1 AA, honour `prefers-reduced-motion`, 44px minimum tap targets.
- Reference prototype: `abis-architects.html` (v0 one-page concept).

---

## 10. Technical Requirements

| Area | Choice |
|---|---|
| Framework | **Next.js 15 (App Router)**, TypeScript, Tailwind CSS |
| CMS | **Sanity**: projects, packages, rates, floor plans, blog, jobs, FAQs, reviews, city pages |
| Database | Supabase (Postgres) for leads, bookings, portal data, applications |
| Auth (Phase 2) | Supabase phone OTP |
| Media | Sanity image CDN / Cloudinary for galleries and video; next/image with AVIF/WebP |
| Animation | GSAP + ScrollTrigger, Lenis smooth scroll (desktop only) |
| PDF | Server-side estimate PDF (react-pdf) |
| Messaging | WhatsApp Cloud API (or Interakt/AiSensy) for alerts and auto-replies; Resend for email |
| Booking | Cal.com embed or a custom slot table |
| i18n | next-intl, with `/` = English and `/bn` = Bengali |
| Analytics | GA4 + Meta Pixel + Conversions API; Microsoft Clarity heatmaps |
| Hosting | Vercel (Mumbai region edge), custom domain, SSL |
| Forms security | Cloudflare Turnstile, rate limiting, server-side validation (Zod) |

### Performance & quality
- Lighthouse ≥ 90 on Performance, SEO, Accessibility and Best Practices (mobile)
- LCP < 2.5 s, CLS < 0.1, INP < 200 ms
- Hero video/sequence lazy-loaded, with a static poster on slow connections

### SEO
- Per-page meta, Open Graph images and canonical URLs
- Schema: `LocalBusiness` / `GeneralContractor`, `Organization`, `FAQPage`, `Review` aggregate (only from genuine sources), `BreadcrumbList`, `JobPosting`
- XML sitemap and robots.txt; hreflang for EN/BN
- Google Business Profile linked; NAP (name, address, phone) consistent everywhere
- Target keywords: architect in Silchar, house construction Silchar, builders in Silchar, construction cost per sq ft Assam, home design Silchar, interior designer Silchar, plus city variants

### Tracking events
`lead_submit`, `estimator_start`, `estimator_step_n`, `estimator_complete`, `pdf_download`, `whatsapp_click`, `call_click`, `booking_complete`, `package_compare_view`, `project_view`, `job_apply`

---

## 11. Release Plan

| Phase | Scope | Duration (est.) |
|---|---|---|
| **0. Discovery** | Content collection (projects, hi-res images, prices, package specs, team, awards, testimonials), keyword research, sitemap sign-off | 1 week |
| **1. MVP launch** | Home, 4 service pages, Projects (10+), Packages, Smart Estimator + PDF, How it works, Quality, About, Contact + booking, Careers, 3 city pages, lead routing + admin dashboard, CMS, SEO basics, analytics | 5–6 weeks |
| **1.1** | Bengali version, remaining city pages, floor plan library (20+ plans), Site School (10 posts), Render vs Reality on 5+ projects | 3 weeks |
| **2. ABIS Track** | Client portal (PWA), supervisor upload app, milestone tracking | 6–8 weeks |
| **3. Growth** | Referral and channel-partner programme, Assamese language, EMI/finance partner info, native app wrapper | TBD |

---

## 12. Content Needed from ABIS (Blockers)

- [ ] Hi-res renders and finished-project photos (minimum 10 projects, with sq.ft, floors, city, year)
- [ ] Package names, ₹/sq.ft, and full spec sheet with material brands
- [ ] Calculator base rates and multipliers (city, floors, terrain)
- [ ] Payment stage percentages
- [ ] Warranty terms and any delay or timeline commitment the firm is willing to publish
- [ ] Quality checklist per stage
- [ ] Founder bio, photo and message; team list with photos
- [ ] Awards list with years, and media mentions
- [ ] 5+ client testimonials (text or video) with written consent
- [ ] Domain, Google Business Profile access, WhatsApp Business number
- [ ] Confirmation of credentials mentioned on Instagram (IIT Bombay / NIT) and how to phrase them

---

## 13. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Calculator prices seen as a firm quote | Show ranges, a clear "indicative estimate" disclaimer, and a CTA for an exact quote after a site visit |
| Slow content delivery from the client | Launch with what exists; CMS lets the team add more later; content checklist with owners and dates |
| Low-res images hurt the premium feel | Re-export renders from source files; schedule a photo shoot of 3–5 completed homes |
| Lead overload or slow follow-up | Instant WhatsApp alerts, lead scoring, daily digest, SLA of 1 working hour |
| Heavy animation on low-end phones | Reduced-motion fallback, static posters, animation only above a device-capability check |
| Fake or inflated trust claims | Publish only verifiable numbers, real reviews and real projects |

---

## 14. Acceptance Criteria (MVP)

- [ ] All MVP pages live and editable from the CMS
- [ ] Estimator produces a range, breakdown, timeline and PDF, and the lead lands in the DB plus a WhatsApp alert within 10 s
- [ ] Booking confirms by WhatsApp and email
- [ ] Mobile sticky bar (Call / WhatsApp / Estimate) on every page
- [ ] Lighthouse mobile ≥ 90 on all four scores for Home, Projects and the Estimator
- [ ] All schema validates in Google Rich Results Test
- [ ] GA4 and Meta events fire for every tracked action
- [ ] Forms protected by Turnstile and server-side validation
- [ ] Client team trained on the CMS (1 session + short video guide)

---

## 15. Open Questions

1. Primary domain: `abisarchitects.in`, `theabisarchitects.com`, or something else?
2. Should Architects and Construction share one brand site, or should Construction have its own sub-section or identity?
3. Will ABIS publish per-sq.ft pricing publicly, or show "starting from" only?
4. Is there a written delay or timeline guarantee ABIS is comfortable offering?
5. Are there experience centres or offices outside Silchar to list?
6. Who on the ABIS team owns lead follow-up, and what's the target response time?
7. Is Bengali required at launch, or is it fine in Phase 1.1?