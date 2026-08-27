import { REDIRECTS, type Redirect } from "./redirects";
import { products, categories, productHref } from "./products";

/**
 * The complete legacy-URL map for `next.config.ts`.
 *
 * Two sources are merged here:
 *
 *  1. The hand-authored consolidations in `redirects.ts` — duplicate clusters
 *     collapsed to one canonical page.
 *  2. Every flat product URL the old site published, pointed at its new
 *     category-nested home.
 *
 * Destinations are resolved to their *final* target before being emitted. A
 * consolidation written as `/techman-usa → /techman-collaborative-robots` would
 * otherwise land on a URL that itself redirects to `/collaborative-robots`,
 * producing exactly the redirect chain the migration plan forbids. Resolution
 * happens once, here, so every legacy URL reaches its destination in one hop.
 *
 * This module — not `redirects.ts` — is what the config imports. `redirects.ts`
 * deliberately has no imports so that `products.ts` can read `RETIRED_SLUGS`
 * from it without a cycle.
 */

/** Flat slug (no leading slash) → final nested URL, for anything in the catalogue. */
function nestedFor(slug: string): string | null {
  const cat = categories.find((c) => c.rootSlug === slug);
  if (cat) return `/${cat.path}`;
  const product = products.find((p) => p.slug === slug);
  return product ? productHref(product) : null;
}

/** Follow consolidations to the end, then map into the nested structure. */
function resolve(destination: string): string {
  const seen = new Set<string>();
  let current = destination;

  while (!seen.has(current)) {
    seen.add(current);
    const next = REDIRECTS.find((r) => r.source === current);
    if (!next) break;
    current = next.destination;
  }

  if (current === "/" || current.includes("/", 1)) return current;
  return nestedFor(current.replace(/^\//, "")) ?? current;
}

const map = new Map<string, string>();

// Legacy flat product and category URLs.
for (const product of products) {
  const nested = productHref(product);
  if (nested !== `/${product.slug}`) map.set(`/${product.slug}`, nested);
}
for (const cat of categories) {
  map.set(`/${cat.rootSlug}`, `/${cat.path}`);
}

// Hand-authored consolidations win over the generated entries, since they
// encode a decision the catalogue cannot express.
for (const r of REDIRECTS) {
  map.set(r.source, resolve(r.destination));
}

// A redirect to itself would loop.
for (const [source, destination] of map) {
  if (source === destination) map.delete(source);
}

export const LEGACY_REDIRECTS: Redirect[] = [...map].map(
  ([source, destination]) => ({ source, destination })
);

/** Sources that still appear as a destination — should always be empty. */
export const CHAINS: Redirect[] = LEGACY_REDIRECTS.filter((r) =>
  map.has(r.destination)
);
