import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import { ValidationPairs } from "@/components/home/validation-pairs";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedCard } from "@/components/projects/featured-card";
import { MasonryGallery } from "@/components/projects/masonry-gallery";
import { StatusBadge } from "@/components/projects/status-badge";
import { CtaBand } from "@/components/site/cta-band";
import { Eyebrow } from "@/components/ui/chip";
import { projectsPage } from "@/lib/content/projects-page";
import {
  cropStyle,
  flagshipImages,
  flagships,
  getFlagship,
  imageById,
  statusLabel,
  WATERMARK_SCALE,
  type Flagship,
} from "@/lib/projects";
import { estimateHref, siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const c = projectsPage.detail;
const container = "mx-auto max-w-[1320px] px-(--pad)";
const item = (i: number) => ({ "--i": i }) as CSSProperties;

/** Cache Components needs at least one param; all four flagship pages are prerendered. */
export function generateStaticParams() {
  return flagships.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getFlagship(slug);
  if (!p) return {};
  const cover = flagshipImages(p)[0];
  const title = `${p.name}, ${p.location} | Projects | The ABIS Architects`;
  const description = p.description.join(" ");
  return {
    title,
    description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${p.slug}`,
      images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }],
    },
  };
}

function Breadcrumbs({ p }: { p: Flagship }) {
  const crumbs = [
    { name: c.breadcrumbHome, href: "/" },
    { name: c.breadcrumbProjects, href: "/projects" },
    { name: p.name, href: `/projects/${p.slug}` },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((cr, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cr.name,
      item: new URL(cr.href, siteUrl).toString(),
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-base text-slate">
          {crumbs.map((cr, i) => (
            <li key={cr.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden strokeWidth={1.5} className="size-4 text-slate/70" />}
              {i < crumbs.length - 1 ? (
                <Link href={cr.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline">
                  {cr.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {cr.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getFlagship(slug);
  if (!p) notFound();

  const images = flagshipImages(p);
  const cover = images[0];
  const crop = cropStyle(cover);
  const others = flagships.filter((f) => f.slug !== p.slug).slice(0, 3);

  const facts = [
    { label: c.facts.category, value: p.category },
    { label: c.facts.location, value: p.location },
    p.status && { label: c.facts.status, value: statusLabel[p.status] },
    p.services && { label: c.facts.services, value: p.services.join(" + ") },
  ].filter(Boolean) as { label: string; value: string }[];

  const pair = p.pair && (() => {
    const d = imageById(p.pair.design);
    const b = imageById(p.pair.built);
    const opposite = cropStyle(d);
    return [
      {
        name: p.name,
        location: p.location,
        design: {
          src: d.src,
          alt: d.alt,
          crop: opposite ? { position: String(opposite.objectPosition), origin: String(opposite.transformOrigin) } : undefined,
        },
        built: { label: p.pair.builtLabel, src: b.src, alt: b.alt },
      },
    ];
  })();

  return (
    <main>
      {/* 1. Breadcrumb, hero, facts, description (paper) */}
      <section aria-labelledby="project-title" className="bg-paper pt-[calc(var(--header-h)+24px)] pb-16 lg:pt-[calc(var(--header-h)+40px)] lg:pb-24">
        <div className={container}>
          <Breadcrumbs p={p} />

          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-sm bg-concrete-2 md:aspect-[21/9]">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1320px) 1176px, 100vw"
              placeholder="blur"
              blurDataURL={cover.blurDataURL}
              loading="eager"
              fetchPriority="high"
              className="object-cover"
              style={crop ? { ...crop, scale: String(WATERMARK_SCALE) } : undefined}
            />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8 lg:p-10">
              <p className="type-chip text-gold [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">{p.category}</p>
              <h1
                id="project-title"
                className="mt-2 font-display text-[clamp(32px,4.4vw,64px)] leading-[1.04] font-medium tracking-[-0.03em] [text-shadow:0_1px_14px_rgb(0_0_0/0.5)]"
              >
                {p.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-base text-white/85">
                <span>{p.location}</span>
                {p.status && <StatusBadge status={p.status} />}
              </div>
            </div>
          </div>

          <Reveal className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
            <dl className="reveal-item grid grid-cols-2 gap-px self-start overflow-hidden rounded-sm border border-line bg-line lg:col-span-5">
              {facts.map((f) => (
                <div key={f.label} className="bg-paper p-5">
                  <dt className="type-chip text-slate">{f.label}</dt>
                  <dd className="mt-2 font-display text-lg leading-tight font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="reveal-item space-y-4 lg:col-span-7" style={item(1)}>
              {p.description.map((d) => (
                <p key={d} className="max-w-[60ch] type-lead text-ink first:text-ink [&:not(:first-child)]:text-slate">
                  {d}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Gallery (concrete) */}
      <section aria-labelledby="project-gallery-title" className="bg-concrete py-16 lg:py-24">
        <div className={container}>
          <Reveal className="flex flex-wrap items-baseline justify-between gap-3">
            <h2
              id="project-gallery-title"
              className="reveal-item font-display text-[clamp(28px,3vw,44px)] leading-[1.1] font-medium tracking-[-0.02em] text-ink"
            >
              {c.galleryTitle}
            </h2>
            <p className="reveal-item text-base text-slate tabular-nums" style={item(1)}>
              {images.length} images
            </p>
          </Reveal>
          <MasonryGallery images={images} />
        </div>
      </section>

      {/* 3. Design vs Reality (dark), when the project has both */}
      {pair && (
        <section data-theme="dark" aria-labelledby="project-pair-title" className="bg-night py-16 text-white lg:py-24">
          <div className={container}>
            <Reveal>
              <Eyebrow className="reveal-item">{c.pairTitle}</Eyebrow>
              <h2
                id="project-pair-title"
                className="reveal-item mt-6 font-display text-[clamp(28px,3vw,44px)] leading-[1.1] font-medium tracking-[-0.02em] text-white"
                style={item(1)}
              >
                {c.pairLead}
              </h2>
            </Reveal>
            <ValidationPairs pairs={pair} designLabel="3D design" />
          </div>
        </section>
      )}

      {/* 4. CTA (paper) */}
      <CtaBand
        id="project-cta-title"
        className="bg-paper"
        titleLead={c.ctaTitleLead}
        titleAccent={c.ctaTitleAccent}
        text={c.ctaText}
        estimateLabel={c.ctaButton}
        estimateHref={`${estimateHref}?type=${p.estimateType}`}
        whatsappLabel={projectsPage.cta.whatsapp}
      />

      {/* 5. More projects (concrete) */}
      <section aria-labelledby="more-projects-title" className="bg-concrete py-16 lg:py-24">
        <div className={container}>
          <h2
            id="more-projects-title"
            className="font-display text-[clamp(28px,3vw,44px)] leading-[1.1] font-medium tracking-[-0.02em] text-ink"
          >
            {c.moreTitle}
          </h2>
          <Reveal className={cn("mt-10 grid gap-12 md:grid-cols-3 md:gap-6 lg:gap-8")}>
            {others.map((o, i) => (
              <div key={o.slug} className="reveal-item" style={item(i)}>
                <FeaturedCard project={o} size="small" viewLabel={projectsPage.featured.viewLabel} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
