import { DesignVsReality } from "@/components/home/design-vs-reality";
import { FounderStats } from "@/components/home/founder-stats";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ProjectsShowcase } from "@/components/home/projects-showcase";
import { WhatWeBuild } from "@/components/home/what-we-build";

export default function Home() {
  return (
    <main>
      <Hero />
      <FounderStats />
      <WhatWeBuild />
      <ProjectsShowcase />
      <HowItWorks />
      <DesignVsReality />
    </main>
  );
}
