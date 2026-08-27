import { site } from "@/lib/site";

const BASE = "https://www.promationusa.com";

/** Renders a JSON-LD block. Data is app-authored, never user input. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const phoneE164 = `+1${site.phone.replace(/\D/g, "")}`;

/**
 * Sitewide Organization + WebSite.
 *
 * `disambiguatingDescription` matters here: several unrelated companies trade
 * as "Promation", and search engines and AI assistants currently have nothing
 * to tell them apart.
 */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${BASE}/#organization`,
            name: "PROMATION USA",
            legalName: "PROMATION INC. USA",
            url: BASE,
            description: site.description,
            disambiguatingDescription:
              "Distributor of electronics manufacturing automation equipment — robotic soldering, PCB handling, dispensing, screw driving, laser marking, collaborative robots and X-ray inspection. Not affiliated with other companies trading under the Promation name.",
            // TODO: add `logo` once a dedicated logo asset exists in /public.
            // Google requires it for the Organization knowledge panel image.
            telephone: phoneE164,
            email: site.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.street,
              addressLocality: site.address.city,
              addressRegion: site.address.state,
              postalCode: site.address.zip,
              addressCountry: "US",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "sales",
                telephone: phoneE164,
                email: site.email,
                areaServed: ["US", "CA", "MX"],
                availableLanguage: ["English"],
              },
            ],
            sameAs: Object.values(site.social),
          },
          {
            "@type": "WebSite",
            "@id": `${BASE}/#website`,
            url: BASE,
            name: "PROMATION USA",
            publisher: { "@id": `${BASE}/#organization` },
          },
        ],
      }}
    />
  );
}

export type Crumb = { name: string; href: string };

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${BASE}${c.href}`,
        })),
      }}
    />
  );
}

/**
 * Brand is the actual equipment manufacturer where the product name identifies
 * one — attributing every machine to the distributor misstates the catalogue.
 */
const BRANDS = ["QUICK", "PANDA", "TechMan", "SEAMARK", "Techman"] as const;

export function brandFor(title: string): string {
  const hit = BRANDS.find((b) => title.toUpperCase().includes(b.toUpperCase()));
  return hit ? (hit === "Techman" ? "TechMan" : hit) : "PROMATION USA";
}

/** "$345.00" → "345.00"; undefined when no usable figure is present. */
function parsePrice(raw?: string): string | undefined {
  if (!raw) return undefined;
  const m = raw.replace(/,/g, "").match(/(\d+(?:\.\d{1,2})?)/);
  return m ? m[1] : undefined;
}

/**
 * Store items are the only openly-priced products in this market, so they are
 * the one place real Offer data can be published — worth getting complete.
 */
export function StoreProductJsonLd({
  name,
  description,
  url,
  image,
  sku,
  price,
  variants,
}: {
  name: string;
  description?: string;
  url: string;
  /** Site-relative path; absolutised here the same way `url` is. */
  image?: string;
  sku?: string;
  price?: string;
  variants?: { name: string; price?: string; sku?: string }[];
}) {
  const priced = (variants ?? [])
    .map((v) => ({ ...v, amount: parsePrice(v.price) }))
    .filter((v) => v.amount);

  // Valid for the remainder of the current year — Google wants a horizon on
  // price validity, and an annual refresh is the realistic review cadence.
  const priceValidUntil = `${new Date().getUTCFullYear()}-12-31`;

  const single = parsePrice(price);
  const amounts = priced.map((v) => Number(v.amount));

  const offers =
    priced.length > 1
      ? {
          "@type": "AggregateOffer",
          offerCount: priced.length,
          lowPrice: Math.min(...amounts).toFixed(2),
          highPrice: Math.max(...amounts).toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          offers: priced.map((v) => ({
            "@type": "Offer",
            name: v.name,
            ...(v.sku ? { sku: v.sku } : {}),
            price: v.amount,
            priceCurrency: "USD",
            priceValidUntil,
            availability: "https://schema.org/InStock",
            url: `${BASE}${url}`,
            seller: { "@id": `${BASE}/#organization` },
          })),
        }
      : single
        ? {
            "@type": "Offer",
            price: single,
            priceCurrency: "USD",
            priceValidUntil,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            url: `${BASE}${url}`,
            seller: { "@id": `${BASE}/#organization` },
          }
        : undefined;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        ...(description ? { description } : {}),
        url: `${BASE}${url}`,
        ...(image ? { image: image.startsWith("http") ? image : `${BASE}${image}` } : {}),
        ...(sku ? { sku } : {}),
        brand: { "@type": "Brand", name: brandFor(name) },
        ...(offers ? { offers } : {}),
      }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  url,
  image,
  specs,
}: {
  name: string;
  description?: string;
  url: string;
  /** Site-relative path; absolutised here the same way `url` is. */
  image?: string;
  specs?: Record<string, string>;
}) {
  const properties = Object.entries(specs ?? {})
    .filter(([, v]) => typeof v === "string" && v.trim() !== "")
    .slice(0, 25)
    .map(([k, v]) => ({ "@type": "PropertyValue", name: k, value: v }));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        ...(description ? { description } : {}),
        url: `${BASE}${url}`,
        ...(image ? { image: image.startsWith("http") ? image : `${BASE}${image}` } : {}),
        brand: { "@type": "Brand", name: brandFor(name) },
        ...(properties.length ? { additionalProperty: properties } : {}),
        manufacturer: { "@id": `${BASE}/#organization` },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          url: `${BASE}${url}`,
          seller: { "@id": `${BASE}/#organization` },
        },
      }}
    />
  );
}

/**
 * Job openings.
 *
 * Google's job experience requires `datePosted` and a `hiringOrganization`, and
 * treats a posting with no `validThrough` as open-ended — which is what these
 * are: standing roles rather than dated requisitions. `employmentType` maps the
 * plain-English label the content file carries.
 */
export function JobPostingJsonLd({
  title,
  description,
  employmentType,
  datePosted,
}: {
  title: string;
  description: string;
  employmentType?: string;
  datePosted: string;
}) {
  const TYPES: Record<string, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    contract: "CONTRACTOR",
    internship: "INTERN",
  };
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title,
        description,
        datePosted,
        directApply: true,
        ...(employmentType
          ? { employmentType: TYPES[employmentType.toLowerCase()] ?? "FULL_TIME" }
          : {}),
        hiringOrganization: { "@id": `${BASE}/#organization` },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressRegion: site.address.state,
            postalCode: site.address.zip,
            addressCountry: "US",
          },
        },
      }}
    />
  );
}

/**
 * The Kenosha facility as a place of business.
 *
 * Kept separate from the Organization node rather than merged into it: the
 * company sells across North America and positions globally, while the opening
 * hours, the demo lab and the applications engineers are all at one address.
 * Conflating the two would claim the whole company is a local business.
 */
export function LocalBusinessJsonLd({
  hours,
}: {
  hours: { days: string; hours: string }[];
}) {
  // "Monday – Friday" / "8AM – 5PM CST" -> schema.org opening hours
  const DAYS: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };
  const spec = hours
    .filter((h) => !/closed/i.test(h.hours))
    .map((h) => {
      const found = h.days
        .toLowerCase()
        .split(/[–—-]|&|,|\band\b/)
        .map((s) => DAYS[s.trim()])
        .filter(Boolean) as string[];
      const range =
        found.length === 2 && /[–—-]/.test(h.days)
          ? expand(found[0], found[1])
          : found;
      const times = h.hours.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi);
      if (!range.length || !times || times.length < 2) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: range,
        opens: to24(times[0]),
        closes: to24(times[1]),
      };
    })
    .filter(Boolean);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${BASE}/#kenosha`,
        name: `${site.name} — Kenosha Facility`,
        parentOrganization: { "@id": `${BASE}/#organization` },
        url: `${BASE}/contact`,
        telephone: `+1-${site.phone.replace(/\./g, "-")}`,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: "US",
        },
        ...(spec.length ? { openingHoursSpecification: spec } : {}),
      }}
    />
  );
}

const ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function expand(from: string, to: string): string[] {
  const a = ORDER.indexOf(from), b = ORDER.indexOf(to);
  return a === -1 || b === -1 || b < a ? [from, to] : ORDER.slice(a, b + 1);
}
function to24(t: string): string {
  const m = t.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!m) return "09:00";
  let h = Number(m[1]);
  if (/pm/i.test(m[3]) && h !== 12) h += 12;
  if (/am/i.test(m[3]) && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m[2] ?? "00"}`;
}

/**
 * Question-and-answer blocks on category hubs.
 *
 * Only emit this where the questions and answers are actually visible on the
 * page — Google requires the markup to match rendered content, and an invisible
 * FAQ block is a manual-action risk rather than a shortcut.
 */
export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  if (items.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

/**
 * Press releases.
 *
 * `author` and `publisher` are both PROMATION — these are company
 * announcements, not bylined journalism — so the author points at the
 * Organization node rather than inventing a person.
 */
export function NewsArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  author,
  image,
}: {
  headline: string;
  description?: string;
  url: string;
  datePublished: string;
  author: string;
  /** Site-relative path; absolutised here the same way `url` is. */
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: headline.slice(0, 110),
        ...(description ? { description } : {}),
        mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}${url}` },
        url: `${BASE}${url}`,
        datePublished,
        dateModified: datePublished,
        author: { "@type": "Organization", name: author, "@id": `${BASE}/#organization` },
        publisher: { "@id": `${BASE}/#organization` },
        ...(image
          ? { image: image.startsWith("http") ? image : `${BASE}${image}` }
          : {}),
      }}
    />
  );
}
