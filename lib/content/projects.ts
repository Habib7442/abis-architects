/**
 * Project fixtures: a stand-in for Sanity `project` documents (AGENTS §9) until the CMS exists.
 * Images are from the client's company-profile export (`abis-images`); the source file is noted
 * on each. Renders carry an ABIS watermark in a corner: `crop` scales the image 1.1 from the
 * opposite corner (`origin`) so the mark falls outside the frame, and `position` keeps the
 * building centred (same approach as "What we build").
 */
export type ProjectCategory = "Homes" | "Commercial" | "Religious" | "Interiors";
export type ProjectStatus = "completed" | "under-construction";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** null = not yet confirmed by ABIS; the location line is hidden until it is. */
  location: string | null;
  status?: ProjectStatus;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    crop?: { position: string; origin: string };
  };
};

export const projectCategories: ProjectCategory[] = ["Homes", "Commercial", "Religious", "Interiors"];

export const projectStatusLabel: Record<ProjectStatus, string> = {
  completed: "Completed",
  "under-construction": "Under construction",
};

export const projects: Project[] = [
  {
    slug: "luxury-residence",
    name: "Luxury Residence",
    category: "Homes",
    location: null, // TODO(content): location from ABIS
    image: {
      src: "/projects/luxury-residence.webp", // source 06-027
      alt: "Dusk render of a four-storey home with timber panels and warm facade lighting",
      width: 1920,
      height: 1080,
      crop: { position: "45% 50%", origin: "0% 0%" }, // watermark bottom-right
    },
  },
  {
    slug: "contemporary-tropical-home",
    name: "Contemporary Tropical Home",
    category: "Homes",
    location: null, // TODO(content): location from ABIS
    image: {
      src: "/projects/contemporary-home.webp", // source 10-045
      alt: "Dusk render of a two-storey contemporary home with a carport and palm trees",
      width: 1920,
      height: 1080,
      crop: { position: "40% 50%", origin: "0% 0%" }, // watermark bottom-right
    },
  },
  {
    slug: "classical-luxury-villa",
    name: "Classical Luxury Villa",
    category: "Homes",
    location: null, // TODO(content): location from ABIS
    image: {
      src: "/projects/classical-villa.webp", // source 09-040
      alt: "Night render of a classical villa with tall columns and a lit forecourt",
      width: 1920,
      height: 1080,
      crop: { position: "50% 50%", origin: "0% 0%" }, // watermark bottom-right
    },
  },
  {
    slug: "the-grand-villa",
    name: "The Grand Villa",
    category: "Homes",
    location: "Silchar",
    status: "under-construction",
    image: {
      // Source 26-104, matched to the "Grand Villa @Silchar" post (26-103).
      // TODO(content): confirm with ABIS that this photo is The Grand Villa; get the original
      // (this is 1670px wide, likely an Instagram export, DESIGN §8.2).
      src: "/projects/grand-villa.webp",
      alt: "The Grand Villa in Silchar under construction: a white classical home with tall columns, at sunset",
      width: 1670,
      height: 940,
    },
  },
  {
    slug: "mothers-nest-hotel",
    name: "Mother's Nest Hotel",
    category: "Commercial",
    location: "Silchar",
    image: {
      src: "/projects/mothers-nest-hotel.webp", // source 12-052
      alt: "Night render of Mother's Nest Hotel in Silchar, a four-storey hotel with a patterned facade",
      width: 1920,
      height: 1080,
      crop: { position: "35% 50%", origin: "0% 100%" }, // watermark bottom-right, hotel logo + name top-right
    },
  },
  {
    slug: "mixed-use-building",
    name: "Mixed-Use Building",
    category: "Commercial",
    location: "Silchar",
    image: {
      src: "/projects/commercial-building.webp", // source 12-050
      alt: "Dusk render of a mixed-use building in Silchar with lit balconies on every floor",
      width: 1920,
      height: 1080,
      crop: { position: "50% 50%", origin: "100% 0%" }, // watermark bottom-left
    },
  },
  {
    slug: "masjid-e-bilal",
    name: "Masjid-e-Bilal",
    category: "Religious",
    location: "Silchar",
    status: "completed",
    image: {
      src: "/projects/masjid-e-bilal.webp", // source 19-087 (site photo)
      alt: "Masjid-e-Bilal in Silchar at night, completed: a lit gateway wall with Arabic lettering and the minaret above",
      width: 2400,
      height: 1799,
    },
  },
  {
    slug: "temple",
    name: "Temple",
    category: "Religious",
    location: null, // TODO(content): location and temple name from ABIS
    image: {
      src: "/projects/temple.webp", // source 14-063
      alt: "Render of a white carved stone temple with a tall shikhara",
      width: 1487,
      height: 1023,
    },
  },
  {
    slug: "living-room-interior",
    name: "Living Room Interior",
    category: "Interiors",
    location: null, // TODO(content): location from ABIS
    image: {
      // Source 17-079 (site photo, 1280px). TODO(content): a finished photo without the
      // plastic-wrapped furniture, at full resolution.
      src: "/projects/interior-living.webp",
      alt: "Living room at handover with a lit false ceiling, a wood-panelled wall and a marble floor",
      width: 1280,
      height: 960,
    },
  },
];
