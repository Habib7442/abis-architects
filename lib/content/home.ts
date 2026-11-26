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
} as const;
