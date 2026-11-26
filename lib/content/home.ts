import { site } from "@/lib/site";

/** Home page copy. Stand-in for Sanity content until the CMS exists. */
export const home = {
  about: {
    chip: "About ABIS",
    // "one team" is set in italics by the component.
    leadBefore: `Since ${site.foundedYear}, we've helped families and businesses go from an empty plot to a finished building, with`,
    leadAccent: "one team",
    leadAfter: "handling the design, the construction and the interiors.",
    trustPoints: [
      "Founded by alumni of NIT Trichy and IIT Bombay",
      "Registered with the Council of Architecture",
      "Our own team designs and builds every project",
    ],
    link: { label: "Our story", href: "/about" },
  },

  whatWeBuild: {
    chip: "What we build",
    // "plan to keys." is set in italics by the component.
    titleLead: "Everything you need, from",
    titleAccent: "plan to keys.",
    aside: "Design only, build only, or both. We handle homes, businesses and places of worship.",
    linkLabel: "Explore",
    /*
     * Images are the client's renders with an ABIS watermark in a corner. Each is scaled 1.1
     * (components/home/what-we-build.tsx) from `origin`, which pushes the watermark corner out
     * of the frame; `position` keeps the building centred. Tuned by eye at 390 and 1440.
     */
    featured: {
      label: "Our main focus",
      title: "Turnkey Construction",
      text: "We design it, build it and hand you the keys. One team, one contract, from the first drawing to the final coat of paint.",
      href: "/construction",
      image: {
        src: "/services/turnkey.webp",
        alt: "Render of a four-storey residence in two blocks with balconies and a driveway",
        position: "40% 40%",
        origin: "0% 0%", // watermark bottom-right
      },
    },
    items: [
      {
        // TODO(content): need clean version of homes.webp (source 09-039) without watermark.
        // At 1.1 the bottom-left logo still shows a sliver on narrow cards (390px).
        title: "Homes & Villas",
        text: "Budget homes, duplexes and luxury villas, designed and built end to end.",
        href: "/construction",
        image: { src: "/services/homes.webp", alt: "Render of a white classical villa with tall columns and a paved forecourt", position: "60% 40%", origin: "100% 0%" }, // watermark bottom-left
      },
      {
        // TODO(content): need clean version of commercial.webp (source 12-051) without watermark.
        // At 390px the "Mother's Nest" script (top right) and the logo (bottom right) still show.
        title: "Commercial & Hotels",
        text: "Hotels, offices, shops and mixed-use buildings.",
        href: "/commercial",
        image: { src: "/services/commercial.webp", alt: "Render of a multi-storey hotel with a patterned facade", position: "30% 50%", origin: "0% 50%" }, // watermark bottom-right, hotel name top-right
      },
      {
        title: "Religious & Institutional",
        text: "Temples, mosques, schools and public buildings.",
        href: "/commercial",
        image: { src: "/services/religious.webp", alt: "Render of a temple with a tall spire, lit at dusk", position: "40% 40%", origin: "0% 0%" }, // watermark bottom-right
      },
      {
        // TODO(content): need clean version of interiors.webp (source 20-088) without watermark.
        // A faint logo circle still shows bottom right on narrow cards (390px).
        title: "Interiors",
        text: "Living rooms, bedrooms, kitchens and offices, designed and finished by us.",
        href: "/interiors",
        image: { src: "/services/interiors.webp", alt: "Render of a bedroom with a wardrobe wall, wooden ceiling and soft cove lighting", position: "40% 40%", origin: "0% 0%" }, // watermark bottom-right
      },
    ],
  },

  // The projects themselves are fixtures in lib/content/projects.ts.
  projects: {
    eyebrow: "Our work",
    // "Real families." is set in gold italics by the component.
    titleLead: "Real projects.",
    titleAccent: "Real families.",
    aside: "Every project here is designed by our in-house team. No stock photos, no AI images.",
    allLabel: "All",
    viewAll: { label: "View all projects", href: "/projects" },
  },

  // Stand-in for Sanity `processStep` documents (AGENTS §9).
  howItWorks: {
    chip: "How it works",
    // "five clear steps." is set in italics by the component.
    titleLead: "From your plot to your keys, in",
    titleAccent: "five clear steps.",
    lead: "No running between architects, contractors and interior designers. You talk to one team the whole way.",
    estimate: { label: "Get free estimate", href: "/cost-calculator" },
    whatsappLabel: "Chat on WhatsApp",
    youGetLabel: "You get:",
    steps: [
      {
        title: "Talk to us",
        text: "Visit our Silchar office, call, or message us on WhatsApp. Tell us about your plot, your family and your budget.",
        youGet: "a clear idea of cost and what's possible.",
      },
      {
        title: "Plan & 3D design",
        text: "We visit your plot, draw the floor plan, and show you your home in 3D before any work starts.",
        youGet: "floor plans and realistic 3D views.",
      },
      {
        title: "Quote & timeline",
        text: "You get a detailed quote and a written timeline, so you know the cost and the dates up front.",
        youGet: "an itemised quote and schedule.",
      },
      {
        title: "We build it",
        text: "Our own team builds your home, with our supervisors checking every stage on site.",
        youGet: "regular updates on progress.",
      },
      {
        title: "Interiors & keys",
        text: "We finish the interiors and hand over a home that's ready to move into.",
        youGet: "the keys to your finished home.",
      },
    ],
  },

  designVsReality: {
    eyebrow: "Design validation",
    // "what we build." is set in gold italics by the component.
    titleLead: "What you approve is",
    titleAccent: "what we build.",
    lead: "Our 3D designs next to the real buildings. Same team, same details.",
    // Em dash from the brief replaced with a colon (AGENTS §8).
    proof: "Every project on this site is real: designed and built by our own team.",
    viewAll: { label: "See all projects", href: "/projects" },
    designLabel: "3D design",
    pairs: [
      {
        name: "The Grand Villa",
        location: "Silchar",
        // TODO(content): need clean version of grand-villa-design.webp (09-039) without watermark;
        // at 1.1 a corner of the logo still shows bottom-left.
        // TODO(content): confirm with ABIS that this render (09-039) is The Grand Villa's design;
        // its facade differs from the site photo (symmetrical front vs. a wide front).
        design: {
          src: "/validation/grand-villa-design.webp",
          alt: "3D render of The Grand Villa, Silchar: a white classical home with a columned portico",
          crop: { position: "85% 50%", origin: "100% 0%" }, // watermark bottom-left
        },
        built: {
          label: "On site",
          src: "/validation/grand-villa-built.webp",
          alt: "The Grand Villa in Silchar on site, under construction, at sunset",
        },
      },
      {
        name: "SP Office Main Gate",
        location: "Hailakandi",
        design: {
          src: "/validation/sp-gate-design.webp",
          alt: "3D render of the main gate of the Superintendent of Police office, Hailakandi, lit at dusk",
        },
        built: {
          label: "Built",
          src: "/validation/sp-gate-built.webp",
          alt: "The finished main gate of the Superintendent of Police office, Hailakandi",
        },
      },
    ],
  },
} as const;
