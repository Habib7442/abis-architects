import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BackToTop } from "@/components/site/back-to-top";
import { FacebookIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/site/social-icons";
import { estimateHref, site } from "@/lib/site";

/** Careers shows only once the page exists (with a "Hiring" pill). */
const hasCareers = existsSync(path.join(process.cwd(), "app", "careers", "page.tsx"));

const heading = "type-chip text-mist";
const link = "inline-flex min-h-11 items-center text-base text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline md:min-h-9";

/**
 * Site footer (prompts/012), always dark. Four columns (2×2 on tablet, stacked on mobile),
 * a giant faint "ABIS" wordmark (DESIGN §7.19) that rises slightly into view, and a bottom bar.
 */
/**
 * Current year for the copyright line. Cache Components disallows `new Date()` in the static
 * shell, so it is cached (refreshed daily) per the Next docs ("Random values and timestamps").
 */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  const socials = [
    { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
    { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
    { label: "WhatsApp", href: site.whatsappHref, Icon: WhatsappIcon },
  ];
  const services = [
    { label: "Design", href: "/design" },
    { label: "Construction", href: "/construction" },
    { label: "Interiors", href: "/interiors" },
    { label: "Get free estimate", href: estimateHref },
  ];
  const company = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer data-theme="dark" className="overflow-hidden border-t border-line bg-night text-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-(--pad) pt-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10 lg:pt-20">
        {/* 1. Brand */}
        <div className="max-w-[36ch]">
          <Link href="/" aria-label={`${site.name}, home`} className="inline-block rounded-sm">
            <Image src="/brand/abis-logo.webp" alt="" width={698} height={240} sizes="160px" className="h-12 w-auto" />
          </Link>
          <p className="mt-6 text-base leading-[1.6] text-white/85">
            Architects and builders from Silchar. Design, construction and interiors by one team, since {site.foundedYear}.
          </p>
          <p className="mt-3 text-base text-mist">A venture by alumni of NIT Trichy and IIT Bombay.</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="grid size-11 place-items-center rounded-full border border-line text-white/85 transition-colors duration-300 ease-arch hover:border-gold hover:text-gold motion-reduce:transition-none"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Services */}
        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className={heading}>
            Services
          </h2>
          <ul className="mt-4 md:space-y-1">
            {services.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. Company */}
        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className={heading}>
            Company
          </h2>
          <ul className="mt-4 md:space-y-1">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
            {hasCareers && (
              <li>
                <Link href="/careers" className={`${link} gap-2`}>
                  Careers
                  <span className="rounded-full bg-gold px-2 py-0.5 type-chip text-ink-fixed">Hiring</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* 4. Visit us */}
        <div>
          <h2 className={heading}>Visit us</h2>
          <address className="mt-4 space-y-4 text-base leading-[1.55] text-white/85 not-italic">
            <p className="flex gap-3">
              <MapPin aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex min-h-11 w-fit items-center gap-1 font-semibold text-white underline-offset-4 hover:underline md:min-h-8"
                >
                  Get directions
                  <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone aria-hidden strokeWidth={1.5} className="size-5 shrink-0 text-gold" />
              <a href={site.phoneHref} className="min-h-11 content-center underline-offset-4 hover:text-white hover:underline md:min-h-0">
                {site.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Mail aria-hidden strokeWidth={1.5} className="size-5 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="min-h-11 content-center break-all underline-offset-4 hover:text-white hover:underline md:min-h-0">
                {site.email}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Clock aria-hidden strokeWidth={1.5} className="size-5 shrink-0 text-gold" />
              {site.hoursDisplay}
            </p>
          </address>
        </div>
      </div>

      {/* Giant wordmark: top 75% shown, rises slightly into view (off under reduced motion) */}
      <Reveal className="mx-auto mt-14 max-w-[1320px] px-(--pad) lg:mt-20">
        {/* Sized to span the container: "ABIS" at 120% width is ~2.86em wide. */}
        <div aria-hidden className="h-[calc(var(--wm)*0.75)] overflow-hidden select-none [--wm:min(28vw,412px)]">
          <p className="wordmark-rise text-center font-display text-(length:--wm) leading-[0.8] font-extrabold tracking-[-0.02em] text-gold/12 [font-stretch:120%]">
            ABIS
          </p>
        </div>
      </Reveal>

      {/* Bottom bar */}
      <div className="border-t border-line">
        {/* Desktop: legal text left (two short lines), links + back to top right, both centred on
            one level. Nothing is forced onto one line, so it can't overflow at any width or zoom.
            Mobile: stacked and centred. */}
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-4 px-(--pad) pt-6 pb-28 text-center text-sm leading-relaxed text-mist md:flex-row md:justify-between md:gap-8 md:pb-6 md:text-left">
          <div className="min-w-0 space-y-1">
            <p>
              © <CopyrightYear /> {site.legalName}. All rights reserved.
            </p>
            <p>
              Registered with the Council of Architecture · <span className="tabular-nums">{site.architectLicences.join(" · ")}</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-x-4">
            <Link href="/privacy" className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline">
              Terms
            </Link>
            <span className="ml-2">
              <BackToTop />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
