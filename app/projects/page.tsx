import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Building2 } from "lucide-react";
import { DesignVsReality } from "@/components/home/design-vs-reality";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedCard } from "@/components/projects/featured-card";
import { MasonryGallery } from "@/components/projects/masonry-gallery";
import { CurrentlyBuilding } from "@/components/sections/currently-building";
import { Chip } from "@/components/ui/chip";
import { projectsPage as c } from "@/lib/content/projects-page";
import { flagshipImages, flagships, galleryCategories, galleryImages, galleryStatuses } from "@/lib/projects";
import { site } from "@/lib/site";

const cover = flagshipImages(flagships[0])[0];

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    url: "/projects",
    images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }],
  },
};

const item = (i: number) => ({ "--i": i }) as CSSProperties;
const container = "mx-auto max-w-[1320px] px-(--pad)";

/* ------------------------------------------------------------------ 1. Header (concrete) */
function Header() {
  const h = c.header;
  const stats = [
    { value: `${site.designsDelivered}+`, label: "designs delivered" },
    { value: `${site.projectsBuilt}+`, label: "projects built" },
    { value: site.googleRating.toFixed(1), star: true, label: "Google rating" },
  ];
  return (
    <section
      aria-labelledby="projects-page-title"
      className="bg-concrete pt-[calc(var(--header-h)+48px)] pb-14 lg:pt-[calc(var(--header-h)+88px)] lg:pb-20"
    >
      <Reveal className={container}>
        <Chip icon={<Building2 aria-hidden strokeWidth={1.5} />} className="reveal-item">
          {h.chip}
        </Chip>
        <h1
          id="projects-page-title"
          className="reveal-item mt-8 max-w-[18ch] font-display text-[clamp(40px,5vw,76px)] leading-[1.04] font-medium tracking-[-0.03em] text-ink"
          style={item(1)}
        >
          {h.titleLead} <em className="font-serif text-[1.08em] font-normal tracking-normal italic">{h.titleAccent}</em>
        </h1>
        <p className="reveal-item mt-6 max-w-[62ch] type-lead text-slate lg:mt-8" style={item(2)}>
          {h.lead}
        </p>
        <ul className="reveal-item mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6" style={item(3)}>
          {stats.map((s) => (
            <li key={s.label} className="flex items-baseline gap-2 text-base text-slate">
              <span className="font-display text-2xl font-medium tracking-[-0.02em] text-ink tabular-nums">
                {s.value}
                {s.star && (
                  // Rating stars are one of the few places gold is used on light surfaces.
                  <span aria-hidden className="ml-0.5 align-[0.3em] text-[0.6em] text-gold">
                    ★
                  </span>
                )}
              </span>{" "}
              {s.label}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Featured (paper) */
function Featured() {
  const [first, ...rest] = flagships;
  return (
    <section aria-labelledby="featured-title" className="bg-paper py-16 lg:py-24">
      <div className={container}>
        <h2 id="featured-title" className="sr-only">
          {c.featured.chip}
        </h2>
        <Reveal>
          <div className="reveal-item">
            <FeaturedCard project={first} size="large" viewLabel={c.featured.viewLabel} priority />
          </div>
        </Reveal>
        <Reveal className="mt-12 grid gap-12 md:grid-cols-3 md:gap-6 lg:mt-16 lg:gap-8">
          {rest.map((p, i) => (
            <div key={p.slug} className="reveal-item" style={item(i)}>
              <FeaturedCard project={p} size="small" viewLabel={c.featured.viewLabel} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. Gallery (concrete) */
function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="bg-concrete py-16 lg:py-24">
      <div className={container}>
        <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="gallery-title"
            className="reveal-item font-display text-[clamp(30px,3.4vw,52px)] leading-[1.1] font-medium tracking-[-0.02em] text-ink"
          >
            {c.gallery.title}
          </h2>
          {/* The real count of images below (no rounded-up claim). */}
          <p className="reveal-item text-base text-slate tabular-nums" style={item(1)}>
            {galleryImages.length} images
          </p>
        </Reveal>
        <MasonryGallery
          images={galleryImages}
          categories={galleryCategories}
          statuses={galleryStatuses}
          allLabel={c.gallery.allLabel}
          pageSize={c.gallery.pageSize}
          loadMoreLabel={c.gallery.loadMore}
        />
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <main>
      <Header />
      <Featured />
      {/* Follows the page mode here (not a dark band). */}
      <section aria-label="Currently building" className="border-t border-line bg-paper py-16 lg:py-24">
        <div className={container}>
          <CurrentlyBuilding />
        </div>
      </section>
      <Gallery />
      <DesignVsReality showViewAll={false} />
      {/* Closing CTA: the site-wide band in the layout. */}
    </main>
  );
}
