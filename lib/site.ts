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
} as const;

export type Person = { name: string; role: string; photo: string };

export const mainNav = [
  { label: "Design", href: "/design" },
  { label: "Construction", href: "/construction" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/packages" },
  { label: "About", href: "/about" },
] as const;
