/**
 * Stand-in for the Sanity `siteSettings` singleton (AGENTS.md §9).
 * NAP (name, address, phone) must come only from here until the CMS exists,
 * so never retype these values in a component.
 */
export const site = {
  name: "The ABIS Architects",
  shortName: "ABIS",
  phoneDisplay: "+91 90516 33891",
  phoneHref: "tel:+919051633891",
  // TODO(client): confirm the WhatsApp Business number (PRD §12). Using the main number for now.
  whatsappHref: "https://wa.me/919051633891",
  foundedYear: 2014,
  googleRating: 4.8,
  googleReviewCount: 161,
  // TODO(content): replace with the exact Google Business Profile reviews link.
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=The+ABIS+Architects+Silchar",
  // Figures from ABIS's Company Profile 2026 deck (slide 1): "13+ Years in Business.
  // 500+ Designs Delivered. 150+ Premium Projects Executed."
  yearsExperience: 13,
  designsDelivered: 500,
  projectsBuilt: 150,
  cityCount: 7,
  email: "abiscollaboration@gmail.com",
  address: {
    street: "Sonai Road, SA Chowdhury Lane, Opposite Kia Showroom, Kanakpur",
    city: "Silchar",
    region: "Assam",
    postalCode: "788006",
    country: "IN",
  },
  // No en dash in copy (AGENTS §8): "to" instead.
  hoursDisplay: "Mon to Sat, 10:00 AM to 7:00 PM",
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=The+ABIS+Architects+Silchar",
  // TODO(content): exact coordinates of the office for LocalBusiness geo (omitted until known).
  geo: null as { latitude: number; longitude: number } | null,
  socials: {
    instagram: "https://www.instagram.com/abis_arch",
    facebook: "https://www.facebook.com/abisarchitects",
    linkedin: "https://www.linkedin.com/company/theabisarchitects",
  },
  legalName: "The ABIS Architects & The ABIS Construction",
  // TODO(content): confirm the typical response time with ABIS.
  responseTime: "within one working day",
  // Company Profile 2026 deck (slide 2).
  credentials: "Alumni of NIT Trichy and IIT Bombay",
  // Which licence belongs to which founder is not confirmed, so always show them together.
  architectLicences: ["CA/2015/66899", "CA/2019/107263"],
  founder: {
    name: "Abhijit Das",
    role: "Co-founder & Architect",
    // Studio cut-out (transparent background), from ad.png. Ideally replace with a photo at a site.
    // TODO(content): need a clean cut-out of the founder photo (no white edges), or the original
    // photo with background. The current cut-out keeps white background patches between the arms
    // and body and a pale fringe on the shoulders; they show on the dark-mode panel.
    photo: "/team/founder.webp",
  },
  coFounder: {
    name: "Biswajit Das",
    role: "Co-founder & Architect",
    // Studio cut-out (transparent background), from bd.png.
    photo: "/team/co-founder.webp",
  },
};

export type Person = { name: string; role: string; photo: string };

// Pricing (/packages) is hidden from the nav for now (user's decision, 26 Nov 2026).
export const mainNav = [
  { label: "Design", href: "/design" },
  { label: "Construction", href: "/construction" },
  { label: "Interiors", href: "/interiors" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

/**
 * Absolute site URL for metadata (canonical, OG images). TODO(client): set NEXT_PUBLIC_SITE_URL to
 * the live domain; on Vercel the production URL is used automatically until then.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

/** Every "Get free estimate" CTA links here (the Smart Estimator). */
export const estimateHref = "/estimate";
