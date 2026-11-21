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
} as const;

export const mainNav = [
  { label: "Design", href: "/design" },
  { label: "Construction", href: "/construction" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/packages" },
  { label: "About", href: "/about" },
] as const;
