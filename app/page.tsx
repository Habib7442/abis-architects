import { FounderStats } from "@/components/home/founder-stats";
import { Hero } from "@/components/home/hero";
import { WhatWeBuild } from "@/components/home/what-we-build";

export default function Home() {
  return (
    <main>
      <Hero />
      <FounderStats />
      <WhatWeBuild />
    </main>
  );
}
