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
        ...(image ? { image } : {}),
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
        ...(image ? { image } : {}),
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
