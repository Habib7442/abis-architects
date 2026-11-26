import { site, siteUrl } from "@/lib/site";

/** LocalBusiness / GeneralContractor JSON-LD for the whole site (AGENTS §12). NAP from lib/site.ts. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": `${siteUrl}/#business`,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    logo: new URL("/brand/abis-logo.webp", siteUrl).toString(),
    image: new URL("/projects/raw/10-contemporary-tropical-homes/10-044.webp", siteUrl).toString(),
    telephone: "+919051633891",
    email: site.email,
    foundingDate: String(site.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    // TODO(content): office coordinates; geo is left out until they are confirmed.
    ...(site.geo ? { geo: { "@type": "GeoCoordinates", ...site.geo } } : {}),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: site.hours.days, opens: site.hours.opens, closes: site.hours.closes },
    ],
    sameAs: Object.values(site.socials),
    // Genuine Google Business Profile figures (lib/site.ts), never invented (AGENTS §12).
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.googleRating,
      reviewCount: site.googleReviewCount,
      bestRating: 5,
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
