import productsData from "../content/products.json";
import { RETIRED_SLUGS } from "./redirects";

/** A product photograph pulled from the live site, with its intrinsic size. */
export type ProductImage = {
  src: string;
  width: number;
  height: number;
};

export type ProductLink = {
  title?: string;
  label?: string;
  /** anchor text captured from the old site */
  text?: string;
  /** grouping heading on category overview pages */
  group?: string;
  url?: string;
  href?: string;
};

export type Product = {
  slug: string;
  url: string;
  title: string;
  category: string;
  tagline?: string;
  description?: string;
  features?: string[];
  specs?: Record<string, unknown>;
  models?: unknown[];
  videos?: string[];
  subProducts?: unknown[];
  productLinks?: ProductLink[];
  images?: ProductImage[];
  note?: string;
};

/**
 * The catalog, minus every slug the redirect map retires.
 *
 * Those URLs 308 before a page ever renders, so linking to them from a listing
 * sends visitors and crawlers through a needless hop — and surfaces the retired
 * page alongside the canonical one it was merged into, recreating the duplicate
 * clusters the consolidation existed to remove.
 */
export const products: Product[] = (productsData as Product[]).filter(
  (p) => !RETIRED_SLUGS.has(p.slug)
);

/**
 * The lead photograph for a product, or null.
 *
 * Not every entry has one: a couple of pages on the old site only ever carried
 * thumbnails too small to enlarge, so callers must handle the empty case
 * rather than assume an image exists.
 */
export function heroImage(product: Product): ProductImage | null {
  return product.images?.[0] ?? null;
}

/** Canonical URL for a model page: /<category-path>/<model-slug>. */
export function productHref(product: Product): string {
  const cat = getCategoryMeta(product.category);
  if (!cat) return `/${product.slug}`;
  // A category's own landing page is the hub, not a model beneath it.
  if (cat.rootSlug === product.slug) return `/${cat.path}`;
  return `/${cat.path}/${product.slug}`;
}

/** Canonical URL for a category hub. */
export function categoryHref(cat: CategoryMeta): string {
  return `/${cat.path}`;
}

export type CategoryMeta = {
  key: string;
  label: string;
  /**
   * URL segment for the hub — every model in the category is nested beneath it,
   * so a model page inherits its category's relevance signal and breadcrumbs
   * match the path rather than merely asserting a hierarchy.
   */
  path: string;
  /**
   * Slug of the legacy landing page this hub replaces. The hub inherits its
   * copy; the slug itself redirects to the hub.
   */
  rootSlug: string;
  blurb: string;
};

export const categories: CategoryMeta[] = [
  {
    key: "new-products",
    path: "new-products",
    label: "New Products",
    rootSlug: "new-products",
    blurb: "The newest additions to the PROMATION automation platform.",
  },
  {
    key: "pcb-handling",
    path: "pcb-handling",
    label: "PCB Handling",
    rootSlug: "pcb-handling",
    blurb:
      "Loaders, unloaders, conveyors, buffers, turners, sorters and inspection stations for complete board flow.",
  },
  {
    key: "soldering",
    path: "robotic-soldering",
    label: "Robotic Soldering",
    rootSlug: "robotic-soldering-glance",
    blurb:
      "QUICK and PANDA intelligent soldering robots for batch and in-line selective soldering.",
  },
  {
    key: "dispensing",
    path: "robotic-dispensing",
    label: "Robotic Dispensing",
    rootSlug: "auto-dispensing-at-a-glance",
    blurb:
      "ET and QS series precision dispensing platforms for adhesives, coatings and paste.",
  },
  {
    key: "screw-driving",
    path: "robotic-screw-driving",
    label: "Robotic Screw Driving",
    rootSlug: "auto-screw-driving-at-a-glance",
    blurb:
      "Auto-feed, torque-controlled screw driving robots for repeatable assembly.",
  },
  {
    key: "laser-marking",
    path: "laser-marking",
    label: "Laser Marking",
    rootSlug: "laser-marking-at-a-glance",
    blurb:
      "PANDA Robotics laser marking systems for permanent, high-contrast PCB traceability.",
  },
  {
    key: "cobots",
    path: "collaborative-robots",
    label: "TechMan Cobots",
    rootSlug: "techman-collaborative-robots",
    blurb:
      "TechMan collaborative robots with built-in vision — TM5 through TM20 payload classes.",
  },
  {
    key: "depaneling",
    path: "pcb-depaneling",
    label: "PCB Depaneling",
    rootSlug: "pcb-routing-at-a-glance",
    blurb:
      "Automatic routing and depaneling systems that separate finished boards from the panel without stressing the joints.",
  },
  {
    key: "label-placement",
    path: "label-placement",
    label: "Label Placement",
    rootSlug: "auto-label-placement-at-a-glance",
    blurb:
      "LabelPRO pick-and-place labelling — barcode and traceability labels applied and verified in line.",
  },
  {
    key: "mobile-robots",
    path: "mobile-robots",
    label: "Mobile Robot Solutions",
    rootSlug: "intelligent-mobile-robot-solutions",
    blurb:
      "OMRON autonomous mobile robots for intelligent line loading and unloading.",
  },
  {
    key: "services",
    path: "services",
    label: "Services & Support",
    rootSlug: "robotic-soldering-complimentary-services",
    blurb:
      "Integration kits, nitrogen output kits, safety enclosures, training and complimentary lab services.",
  },
  {
    key: "robotics-division",
    path: "robotics-division",
    label: "Robotics Division",
    rootSlug: "robotics-division",
    blurb:
      "The official robot and cobot source for electronics manufacturing.",
  },
];

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getCategoryMeta(key: string): CategoryMeta | undefined {
  return categories.find((c) => c.key === key);
}

export function getProductsInCategory(key: string): Product[] {
  return products.filter((p) => p.category === key);
}

/** Sibling products in the same category, excluding the current one. */
export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

/** Human label for a raw camelCase/snake spec key. */
export function specLabel(key: string): string {
  return key
    .replace(/[_-]/g, " ")
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
