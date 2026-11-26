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
} as const;
