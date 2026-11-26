import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/projects/status-badge";
import { cropStyle, flagshipImages, WATERMARK_SCALE, type Flagship } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Flagship project card (links to /projects/[slug]). `size="large"`: 21:9 image (4:3 on phones),
 * title and link on one row below. `size="small"`: 4:3 image, details stacked below.
 */
export function FeaturedCard({
  project,
  size,
  viewLabel,
  priority = false,
}: {
  project: Flagship;
  size: "large" | "small";
  viewLabel: string;
  priority?: boolean;
}) {
  const cover = flagshipImages(project)[0];
  const large = size === "large";
  const crop = cropStyle(cover);

  return (
    <Link href={`/projects/${project.slug}`} className="group block rounded-sm">
      <div className={cn("relative overflow-hidden rounded-sm bg-concrete-2", large ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]")}>
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={large ? "(min-width: 1320px) 1176px, 100vw" : "(min-width: 1320px) 380px, (min-width: 768px) 33vw, 100vw"}
          placeholder="blur"
          blurDataURL={cover.blurDataURL}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="scale-(--base-scale) object-cover transition-transform duration-700 ease-arch group-hover:scale-(--hover-scale) motion-reduce:transition-none motion-reduce:group-hover:scale-(--base-scale)"
          style={{
            ...crop,
            ["--base-scale" as string]: crop ? WATERMARK_SCALE : 1,
            ["--hover-scale" as string]: crop ? WATERMARK_SCALE * 1.04 : 1.04,
          }}
        />
        {project.status && <StatusBadge status={project.status} className="absolute top-4 left-4" />}
      </div>

      <div className={cn("mt-5", large && "md:flex md:items-end md:justify-between md:gap-8")}>
        <div>
          <p className="type-chip text-slate">{project.category}</p>
          <h3
            className={cn(
              "mt-2 font-display leading-tight font-medium tracking-[-0.02em] text-ink",
              large ? "text-[clamp(26px,2.6vw,40px)]" : "text-[clamp(20px,1.6vw,24px)]",
            )}
          >
            {project.name}
          </h3>
          <p className="mt-1 text-base text-slate">{project.location}</p>
        </div>
        <span className={cn("inline-flex min-h-11 items-center gap-2 text-base font-semibold text-ink", large ? "mt-3 md:mt-0" : "mt-2")}>
          {viewLabel}
          <ArrowRight
            aria-hidden
            strokeWidth={1.5}
            className="size-4 transition-transform duration-300 ease-arch group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </span>
      </div>
    </Link>
  );
}
