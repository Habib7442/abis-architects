import { FounderStats } from "@/components/home/founder-stats";
import { Hero } from "@/components/home/hero";
import { ProjectsShowcase } from "@/components/home/projects-showcase";
import { WhatWeBuild } from "@/components/home/what-we-build";

export default function Home() {
  return (
    <main>
      <Hero />
      <FounderStats />
      <WhatWeBuild />
      <ProjectsShowcase />
    </main>
  );
}
