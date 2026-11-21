import { Hero } from "@/components/home/hero";
import { SiteHeader } from "@/components/site/header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </>
  );
}
