/**
 * Retired URLs → canonical destinations.
 *
 * Source of truth for the duplicate-content consolidations identified in the
 * website audit (see audit/prebuild/content-inventory.csv and redirect-map.csv).
 *
 * Next.js evaluates config redirects before filesystem routing, so listing a
 * slug here retires it even though a page still exists for it in the catalog
 * data. `sitemap.ts` filters these out so retired URLs never get submitted.
 *
 * Scope note: only redirects whose destination resolves in the current URL
 * structure are listed. The category-nested map in redirect-map.csv is applied
 * when that routing lands.
 */

export type Redirect = { source: string; destination: string };

/** Duplicate clusters collapsed to one canonical page. */
export const CONSOLIDATIONS: Redirect[] = [
  // TechMan cobots — four near-identical pages, each self-canonicalised.
  { source: "/techman-usa", destination: "/techman-collaborative-robots" },
  { source: "/techman-usa-1", destination: "/techman-collaborative-robots" },
  { source: "/tm-robot-usa", destination: "/techman-collaborative-robots" },
  { source: "/tm-robots-at-a-glance", destination: "/techman-collaborative-robots" },

  // Mobile robots — duplicated overview and an unedited clone.
  { source: "/mobile-robot-solutions-1", destination: "/intelligent-mobile-robot-solutions" },

  // PANDA — two overview pages for one brand.
  { source: "/panda-robotics", destination: "/panda-robotics-usa" },

  // Complimentary services — 99% identical pair.
  { source: "/complimentary-services", destination: "/robotic-soldering-complimentary-services" },

  // ET7383KC — duplicate pair, keeping the descriptive slug.
  { source: "/et7383kc", destination: "/et7383kc-screw-driving-robot" },

  // Byte-identical copy of the homepage.
  { source: "/landing-promationusa", destination: "/" },
];

/** Legacy "-copy" slugs left behind by page duplication, now cleaned. */
export const SLUG_CLEANUPS: Redirect[] = [
  { source: "/et8484-dispensing-robot-copy", destination: "/et8484-dispensing-robot" },
  { source: "/et8593-dispensing-robot-copy", destination: "/et8593-dispensing-robot" },
  { source: "/mobile-robot-line-unloading-copy", destination: "/mobile-robot-line-unloading" },
];

export const REDIRECTS: Redirect[] = [...CONSOLIDATIONS, ...SLUG_CLEANUPS];

/** Slugs (without leading slash) that must never appear in the sitemap. */
export const RETIRED_SLUGS: ReadonlySet<string> = new Set(
  REDIRECTS.map((r) => r.source.replace(/^\//, ""))
);
