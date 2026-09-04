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
 * Destinations here are written as flat slugs. `legacyRoutes.ts` resolves them
 * through the catalogue into their final category-nested URLs and merges in a
 * generated entry for every other legacy flat URL, so the config never emits a
 * redirect chain. Import that module, not this one, when you need the live map.
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

/**
 * Pages withdrawn from the site, pointed at the nearest useful destination.
 *
 * Unlike a consolidation, there is no equivalent page to send the visitor to:
 * the X-ray line is no longer carried, and the other three were never products
 * at all — a positioning page, an accessories index and a support page that the
 * content recovery swept into the catalogue because they sat under the same URL
 * pattern. They are listed here so their inbound links and any lingering
 * index entries land somewhere sensible rather than on a 404.
 */
export const RETIREMENTS: Redirect[] = [
  // X-ray inspection and the SEAMARK line, no longer carried.
  { source: "/xray-at-a-glance", destination: "/products" },
  { source: "/x-ray-inspection", destination: "/products" },
  { source: "/xc1000", destination: "/products" },
  { source: "/lp/x-ray-inspection", destination: "/products" },
  { source: "/brands/seamark", destination: "/brands" },
  { source: "/guides/x-ray-vs-aoi-inspection", destination: "/guides" },
  { source: "/guides/solder-joint-voids-and-quality", destination: "/guides" },

  // Not products — recovered pages that belong elsewhere in the new structure.
  { source: "/official-robot-center", destination: "/why-promation" },
  { source: "/schedule-service", destination: "/contact" },
  { source: "/new-page-1", destination: "/contact" },
  { source: "/thank-you", destination: "/contact" },

  // Mobile robots are OMRON's line; TechMan stays under cobots.
  { source: "/tm-mobile-robot-solutions", destination: "/mobile-robots" },
];

/**
 * Products that changed category after launch. The flat legacy URL follows the
 * catalogue automatically, but the previously published nested URL does not —
 * these keep it answering.
 */
export const MOVED: Redirect[] = [
  { source: "/robotic-soldering/quick-usa-6101a1", destination: "/soldering-accessories/quick-usa-6101a1" },
  { source: "/robotic-soldering/quick-usa-6102a1", destination: "/soldering-accessories/quick-usa-6102a1" },
  { source: "/robotic-soldering/quick-usa-6301", destination: "/soldering-accessories/quick-usa-6301" },
  { source: "/robotic-soldering/quick-usa-447", destination: "/soldering-accessories/quick-usa-447" },
  { source: "/robotic-soldering/quick-usa-440a", destination: "/soldering-accessories/quick-usa-440a" },
  { source: "/robotic-soldering/quick-usa-441b", destination: "/soldering-accessories/quick-usa-441b" },
  { source: "/robotic-soldering/quick-usa-442-2", destination: "/soldering-accessories/quick-usa-442-2" },
  { source: "/robotic-soldering/quick-usa-442-3", destination: "/soldering-accessories/quick-usa-442-3" },
  { source: "/robotic-soldering/quick-usa-443c", destination: "/soldering-accessories/quick-usa-443c" },
  { source: "/robotic-soldering/quick-usa-443c-2", destination: "/soldering-accessories/quick-usa-443c-2" },
  { source: "/robotic-soldering/quick-usa-492e", destination: "/soldering-accessories/quick-usa-492e" },
  { source: "/robotic-soldering/quick-usa-100-6c", destination: "/soldering-accessories/quick-usa-100-6c" },
  { source: "/robotic-soldering/quick-usa-100-155", destination: "/soldering-accessories/quick-usa-100-155" },
  { source: "/robotic-soldering/quick-usa-870", destination: "/soldering-accessories/quick-usa-870" },
  { source: "/robotic-soldering/quick-usa-957d", destination: "/soldering-accessories/quick-usa-957d" },
  { source: "/robotic-soldering/quick-usa-885-1", destination: "/soldering-accessories/quick-usa-885-1" },
  { source: "/robotic-soldering/quick-usa-854", destination: "/soldering-accessories/quick-usa-854" },
  { source: "/robotic-soldering/quick-usa-372b", destination: "/soldering-accessories/quick-usa-372b" },
  { source: "/robotic-soldering/quick-usa-300-series", destination: "/soldering-accessories/quick-usa-300-series" },
  { source: "/robotic-soldering/quick-usa-3202", destination: "/soldering-accessories/quick-usa-3202" },
  { source: "/robotic-soldering/quick-usa-ts1200", destination: "/soldering-accessories/quick-usa-ts1200" },
  { source: "/robotic-soldering/quick-ts2200", destination: "/soldering-accessories/quick-ts2200" },
  { source: "/robotic-soldering/quick-usa-ts2300", destination: "/soldering-accessories/quick-usa-ts2300" },
  { source: "/robotic-soldering/quick-usa-tr1100", destination: "/soldering-accessories/quick-usa-tr1100" },
  { source: "/robotic-soldering/quick-usa-tr1300", destination: "/soldering-accessories/quick-usa-tr1300" },
  { source: "/robotic-soldering/quick-usa-376di", destination: "/soldering-accessories/quick-usa-376di" },
  { source: "/robotic-soldering/quick-usa-191ad", destination: "/soldering-accessories/quick-usa-191ad" },
  { source: "/robotic-soldering/agv", destination: "/mobile-robots/agv" },
  { source: "/robotic-soldering/arc21-automatic-routing-machine", destination: "/pcb-depaneling/arc21-automatic-routing-machine" },
  { source: "/robotic-soldering/pcb-routing-at-a-glance", destination: "/pcb-depaneling" },
  { source: "/pcb-handling/labelpro", destination: "/label-placement/labelpro" },
  { source: "/pcb-handling/auto-label-placement-at-a-glance", destination: "/label-placement" },
  { source: "/mobile-robots/tm-mobile-robot-solutions", destination: "/mobile-robots" },
];

export const REDIRECTS: Redirect[] = [
  ...CONSOLIDATIONS,
  ...SLUG_CLEANUPS,
  ...RETIREMENTS,
  ...MOVED,
];

/** Slugs (without leading slash) that must never appear in the sitemap. */
export const RETIRED_SLUGS: ReadonlySet<string> = new Set(
  REDIRECTS.map((r) => r.source.replace(/^\//, ""))
);
