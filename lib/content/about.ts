import { site } from "@/lib/site";

/**
 * About page copy. Sources: ABIS's "About Us, Mission, Vision" document, the poster write-up
 * (WhatsApp, 23 Nov 2026) and the Company Profile 2026 deck. Rewritten in plain words: short
 * sentences, each section says something new. Stand-in for Sanity until the CMS exists.
 */
export const about = {
  meta: {
    title: "About us | The ABIS Architects",
    description:
      "Two architect brothers from Silchar who design homes and then build them. 13+ years, 500+ designs and 150+ projects built across Assam, the Northeast and Kolkata.",
  },

  hero: {
    chip: "About us",
    titleLead: "We don't just design homes.",
    titleAccent: "We bring them to life.",
    lead: "We're an architecture-led construction company from Silchar. We design homes, hotels, offices and places of worship. Then our own team builds them.",
    image: {
      // Preferred: a real team photo. Until it exists, a real ABIS project is shown instead.
      preferred: "/about/team.webp",
      preferredAlt: "The ABIS Architects team at work",
      fallback: "/about/project-day.webp",
      fallbackAlt: "A four-storey home with wide balconies and timber ceilings, designed by The ABIS Architects",
    },
  },

  founders: {
    chip: "Who we are",
    titleLead: "Run by two architects,",
    titleAccent: "both from NIT Trichy.",
    paragraphs: [
      `${site.founder.name} has 13+ years in construction and has collaborated with Pritzker Prize winner Fumihiko Maki and B.V. Doshi. ${site.coFounder.name} also holds a Master's in Communication Design from IIT Bombay.`,
      "They plan every project themselves and review it on site, so the home you approve on paper is the home you get.",
    ],
    credentials: "Registered with the Council of Architecture and GMDA",
    licences: `Licences ${site.architectLicences.join(" · ")}`,
  },

  vision: {
    eyebrow: "Our vision",
    titleLead: "Where vision",
    titleAccent: "becomes reality.",
    tagline: "Designing spaces. Creating legacies.",
    // The client's Vision poster, used as supplied (Thumbnail.webp). Do not swap or crop it.
    poster: {
      src: "/about/vision-poster.webp",
      width: 1672,
      height: 941,
      alt: "Abhijit Das, co-founder of The ABIS Architects, standing in front of a modern three-storey home at dusk. Poster text: Where Vision Becomes Reality. Designing spaces, creating legacies. Crafting timeless spaces with purpose.",
    },
    statement:
      "We want ABIS to be the name families in the Northeast trust with their home. Not just for how it looks, but for how well it's built.",
    proof: "Our portfolio shows only real projects, designed by our own team. No stock photos, no AI images.",
    journeyTitle: "Our journey",
    journey: [
      { year: "2014", title: "Started in Silchar", text: "The ABIS Architects opens its doors." },
      {
        year: "Today",
        title: "Projects across Assam, Arunachal and Kolkata",
        text: "From homes and villas to hotels and places of worship.",
      },
      {
        year: "2026",
        title: `${site.designsDelivered}+ designs, ${site.projectsBuilt}+ built`,
        text: "Every one designed in-house by our own team.",
      },
    ],
  },

  mission: {
    chip: "Our mission",
    title: "One team, from first sketch to final key.",
    lead: "Most families hire an architect, then a separate contractor, and end up stuck in the middle. With us, the people who draw your home are the people who build it.",
    pillarsTitle: "How we deliver it",
    pillars: [
      { title: "Clear plans", text: "You see your home in 3D before we build." },
      { title: "Honest pricing", text: "A detailed quote, no hidden costs." },
      { title: "Quality on site", text: "Our own supervisors check every stage." },
      { title: "On-time handover", text: "A written timeline you can hold us to." },
    ],
  },

} as const;
