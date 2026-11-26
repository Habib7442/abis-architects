import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { ProjectsGallery } from "@/components/home/projects-gallery";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/chip";
import { home } from "@/lib/content/home";
import { projectCategories, projects } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

const item = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Home "Our projects" (DESIGN §2 row 8; layout from the user's brief, prompts/007).
 * Always dark (--night) in both page modes: the renders are dusk shots. `data-theme="dark"`
 * switches the tokens inside to the dark set (globals.css), so it reads the same in light mode.
 */
export function ProjectsShowcase() {
  const c = home.projects;
  return (
    <section data-theme="dark" aria-labelledby="projects-title" className="bg-night py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1320px] px-(--pad)">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="reveal-item">{c.eyebrow}</Eyebrow>
            <h2
              id="projects-title"
              className="reveal-item mt-6 font-display text-[clamp(30px,3.4vw,52px)] leading-[1.1] font-medium tracking-[-0.02em] text-white"
              style={item(1)}
            >
              {c.titleLead}{" "}
              <em className="font-serif text-[1.08em] font-normal tracking-normal whitespace-nowrap text-gold italic">
                {c.titleAccent}
              </em>
            </h2>
          </div>
          <p className="reveal-item flex max-w-[46ch] items-start gap-3 text-base leading-[1.6] text-mist lg:col-span-5 lg:pb-2" style={item(2)}>
            <CircleCheck aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-gold" />
            {c.aside}
          </p>
        </Reveal>

        <ProjectsGallery projects={projects} categories={projectCategories} allLabel={c.allLabel} />

        <div className="mt-12 flex justify-center lg:mt-16">
          <Link href={c.viewAll.href} className={cn(buttonVariants({ variant: "pill-light", size: "pill" }))}>
            {c.viewAll.label}
            <ArrowRight aria-hidden strokeWidth={1.5} className="transition-transform group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
