/** /projects and /projects/[slug] copy. Stand-in for Sanity until the CMS exists. */
export const projectsPage = {
  meta: {
    title: "Our projects | The ABIS Architects",
    description:
      "Real homes, villas, hotels, temples, mosques and interiors designed and built by The ABIS Architects, from Silchar to across India. No stock photos, no AI images.",
  },
  header: {
    chip: "Our work",
    // "built by our own team." is set in italics by the component.
    titleLead: "Real projects,",
    titleAccent: "built by our own team.",
    lead: "Homes, villas, hotels, temples, mosques and interiors, from Silchar to across India. Every image here is a real ABIS project. No stock photos, no AI images.",
  },
  featured: {
    chip: "Featured projects",
    viewLabel: "View project",
  },
  gallery: {
    title: "More of our work",
    allLabel: "All",
    loadMore: "Load more",
    pageSize: 12,
  },
  cta: {
    titleLead: "Like what you see?",
    titleAccent: "Let's plan yours.",
    text: "Get a free estimate in a few minutes, or message us on WhatsApp.",
    estimate: "Get free estimate",
    whatsapp: "Chat on WhatsApp",
  },
  detail: {
    breadcrumbHome: "Home",
    breadcrumbProjects: "Projects",
    facts: { category: "Category", location: "Location", status: "Status", services: "Services" },
    galleryTitle: "Project gallery",
    pairTitle: "Design vs Reality",
    pairLead: "The 3D design we shared, next to the real building.",
    ctaTitleLead: "Want something",
    ctaTitleAccent: "like this?",
    ctaText: "Tell us about your plot and we'll send a free estimate.",
    ctaButton: "Build something like this",
    moreTitle: "More projects",
  },
} as const;
