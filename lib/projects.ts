import type { CSSProperties } from "react";
import { rawImages, type RawImage, type WatermarkCorner } from "@/lib/project-images.generated";

/**
 * Project images and flagship projects for /projects (prompts/010). Stand-in for Sanity
 * `project` documents until the CMS exists. Built from the client's company-profile export
 * (public/projects/raw/<slide>-<category>/), with sizes, blur placeholders and watermark
 * corners in lib/project-images.generated.ts.
 */

export type GalleryCategory = "Homes" | "Villas" | "Commercial & Hotels" | "Religious & Institutional" | "Interiors";

export const galleryCategories: GalleryCategory[] = [
  "Homes",
  "Villas",
  "Commercial & Hotels",
  "Religious & Institutional",
  "Interiors",
];

export type ProjectStatus = "completed" | "under-construction";
export const statusLabel: Record<ProjectStatus, string> = {
  completed: "Completed",
  "under-construction": "Under construction",
};

export type ProjectImage = Omit<RawImage, "watermark"> & {
  category: GalleryCategory;
  location: string | null;
  /** Only set where known (real site photos); renders have no status. */
  status: ProjectStatus | null;
  watermark: WatermarkCorner | null;
  alt: string;
};

export const galleryStatuses: ProjectStatus[] = ["completed", "under-construction"];

/* ------------------------------------------------------------------ Curation rules */

/** Posters, collages, logos, screenshots and images with big text overlays (user's list + review). */
const SKIP = new Set([
  "14-068", // logo
  "22-089", // screenshot
  "24-090", // collage
  "26-100", "26-101", "26-102", "26-103", // Instagram posts with text
  "27-105", "27-108", // Instagram posts with text
  "11-049", // collage of tower blocks with labels (found on review)
]);
// Whole folders skipped: 01-cover-services, 02-strengths, 28/29-design-validation, 30-thanks
// (not copied to public/).

/** Slide folders that are 3D renders; only these carry the ABIS watermark. */
const RENDER_FOLDERS = new Set(["03", "04", "05", "06", "07", "09", "10", "12", "13", "14", "15", "20"]);

/** Where the gold-pixel detector was wrong (checked by eye). */
const WATERMARK_OVERRIDES: Record<string, WatermarkCorner | null> = {
  "12-051": "br", // detector picked the hotel's own gold "MN" sign
  "20-088": "br", // faint mark the detector missed
  "14-064": null, // warm interior light, no mark
  "14-067": null,
};

function categoryOf(img: RawImage): GalleryCategory {
  const n = img.folder.slice(0, 2);
  if (img.id === "27-109") return "Religious & Institutional"; // mosque under construction
  if (["03", "04", "05", "06", "07", "10"].includes(n)) return "Homes";
  if (n === "09") return "Villas";
  if (["11", "12", "13", "25"].includes(n)) return "Commercial & Hotels";
  if (["14", "15", "19"].includes(n)) return "Religious & Institutional";
  if (["16", "17", "20", "22", "24"].includes(n)) return "Interiors";
  // 26/27 "hospitality-residential": the photos are homes under construction in Silchar.
  // TODO(content): confirm these with ABIS (category and project).
  return "Homes";
}

/** Known locations only. Everything else shows no location. */
function locationOf(img: RawImage): string | null {
  const n = img.folder.slice(0, 2);
  if (["12", "13", "19"].includes(n)) return "Silchar";
  if (n === "25") return "Hailakandi";
  if (img.id === "26-104") return "Silchar"; // The Grand Villa
  // TODO(content): the other 26/27 construction sites are in Silchar, Hailakandi or Bhaga
  // (Silchar); ABIS to confirm which is where. Hidden until then.
  return null;
}

/** Status only where the photo shows it. */
function statusOf(img: RawImage): ProjectStatus | null {
  const n = img.folder.slice(0, 2);
  if (n === "26" || n === "27") return "under-construction"; // site photos of work in progress
  if (n === "19") return "completed"; // Masjid-e-Bilal, finished and in use
  if (["25-091", "25-092", "25-096"].includes(img.id)) return "completed"; // SP Office gate, built
  return null;
}

const NOUN: Record<GalleryCategory, string> = {
  Homes: "a home",
  Villas: "a villa",
  "Commercial & Hotels": "a commercial building",
  "Religious & Institutional": "a religious or public building",
  Interiors: "an interior",
};

function toProjectImage(img: RawImage): ProjectImage {
  const category = categoryOf(img);
  const location = locationOf(img);
  const status = statusOf(img);
  const isRender = RENDER_FOLDERS.has(img.folder.slice(0, 2));
  const watermark = img.id in WATERMARK_OVERRIDES ? WATERMARK_OVERRIDES[img.id] : isRender ? img.watermark : null;
  // TODO(content): per-image alt text (what, where, status) once ABIS names each project.
  const kind = isRender ? "3D design" : status === "under-construction" ? "Site photo" : "Photo";
  const alt = `${kind} of ${NOUN[category]}${status === "under-construction" ? " under construction" : ""} by The ABIS Architects${location ? ` in ${location}` : ""}`;
  return { ...img, category, location, status, watermark, alt };
}

export const allImages: ProjectImage[] = rawImages.filter((r) => !SKIP.has(r.id)).map(toProjectImage);

const byId = new Map(allImages.map((i) => [i.id, i]));
export const imageById = (id: string) => {
  const img = byId.get(id);
  if (!img) throw new Error(`Unknown project image ${id}`);
  return img;
};

/* ------------------------------------------------------------------ Watermark crop */

/**
 * Scale the image from the corner opposite the watermark so the mark falls outside the frame.
 * Gallery tiles keep the image's own ratio (no cover slack), so 1.22 is needed to clear the
 * mark (it spans ~18% of the height); hover adds 1.04 on top.
 */
export const WATERMARK_SCALE = 1.22;
const OPPOSITE: Record<WatermarkCorner, string> = { br: "0% 0%", bl: "100% 0%", tr: "0% 100%", tl: "100% 100%" };

export function cropStyle(img: Pick<ProjectImage, "watermark">): CSSProperties | undefined {
  return img.watermark ? { transformOrigin: OPPOSITE[img.watermark], objectPosition: OPPOSITE[img.watermark] } : undefined;
}

/* ------------------------------------------------------------------ Flagship projects */

export type Flagship = {
  slug: string;
  name: string;
  /** Shown as the category label. */
  category: string;
  location: string;
  status?: ProjectStatus;
  /** null = not confirmed; the fact is hidden. */
  services: string[] | null;
  description: string[];
  imageIds: string[];
  /** A 3D design shown next to the real building, when both exist. */
  pair?: { design: string; built: string; builtLabel: string };
  /** Pre-selects the project type in the estimator. */
  estimateType: string;
};

export const flagships: Flagship[] = [
  {
    slug: "the-grand-villa",
    name: "The Grand Villa",
    category: "Villas",
    location: "Silchar",
    status: "under-construction",
    services: ["Design", "Construction"], // both ABIS logos on the project's own post (26-103)
    description: [
      "A classical villa in Silchar with tall columns, a covered entrance and wide balconies.",
      "We designed it in 3D first, and our own team is building it now.",
      // TODO(content): plot size, floors and completion date from ABIS.
    ],
    // Renders 09-037/09-038 match the photo's wide columned front; 09-039/09-040 show a
    // different, symmetrical villa and stay in the gallery.
    // TODO(content): confirm with ABIS which renders are The Grand Villa, and whether the
    // site photos 27-106 / 27-107 belong to it (they don't obviously match, so left out).
    imageIds: ["26-104", "09-037", "09-038"],
    pair: { design: "09-038", built: "26-104", builtLabel: "On site" },
    estimateType: "villa",
  },
  {
    slug: "masjid-e-bilal",
    name: "Masjid-e-Bilal",
    category: "Religious",
    location: "Silchar",
    status: "completed",
    services: null, // TODO(content): design, construction or both?
    description: [
      "Masjid-e-Bilal is a mosque in Silchar.",
      "These photos show the finished prayer hall and the lit gateway at night.",
      // TODO(content): scope of work, size and year from ABIS.
    ],
    imageIds: ["19-087", "19-082", "19-083", "19-084", "19-085", "19-086"],
    estimateType: "religious",
  },
  {
    slug: "sp-office-main-gate",
    name: "SP Office Main Gate",
    category: "Institutional",
    location: "Hailakandi",
    status: "completed",
    services: ["Design", "Construction"],
    description: [
      "The main gate of the Superintendent of Police office in Hailakandi.",
      "We designed it in 3D first, then built it to match.",
      // TODO(content): year and scope from ABIS.
    ],
    imageIds: ["25-094", "25-091", "25-093", "25-095", "25-092", "25-096"],
    pair: { design: "25-094", built: "25-091", builtLabel: "Built" },
    estimateType: "institutional",
  },
  {
    slug: "mothers-nest-hotel",
    name: "Mother's Nest Hotel",
    category: "Commercial",
    location: "Silchar",
    services: null, // TODO(content): design only, or built by ABIS too? Status?
    description: [
      "A multi-storey hotel in Silchar with a patterned facade.",
      "These are our 3D designs of the building, by day and at night.",
    ],
    imageIds: ["12-052", "12-051"],
    estimateType: "hotel",
  },
];

export const getFlagship = (slug: string) => flagships.find((f) => f.slug === slug);
export const flagshipImages = (f: Flagship) => f.imageIds.map(imageById);

/**
 * The full gallery: every curated image, flagship ones included, so the Completed / Under
 * construction filter has the real site photos to show (they all belong to flagships).
 */
export const galleryImages: ProjectImage[] = allImages;

/* ------------------------------------------------------------------ Currently building */

export type BuildingItem = { image: ProjectImage; href?: string; title?: string };

/** Real site photos of work in progress; The Grand Villa first, linking to its page. */
export const currentlyBuilding: BuildingItem[] = [
  { image: imageById("26-104"), href: "/projects/the-grand-villa", title: "The Grand Villa" },
  ...allImages.filter((i) => i.status === "under-construction" && i.id !== "26-104").map((image) => ({ image })),
];
