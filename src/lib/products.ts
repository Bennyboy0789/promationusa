import productsData from "@/content/products.json";

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
  images?: unknown[];
  note?: string;
};

export const products: Product[] = productsData as Product[];

export type CategoryMeta = {
  key: string;
  label: string;
  /** slug of the category's landing page */
  rootSlug: string;
  blurb: string;
};

export const categories: CategoryMeta[] = [
  {
    key: "new-products",
    label: "New Products",
    rootSlug: "new-products",
    blurb: "The newest additions to the PROMATION automation platform.",
  },
  {
    key: "pcb-handling",
    label: "PCB Handling",
    rootSlug: "pcb-handling",
    blurb:
      "Loaders, unloaders, conveyors, buffers, turners, sorters and inspection stations for complete board flow.",
  },
  {
    key: "soldering",
    label: "Robotic Soldering",
    rootSlug: "robotic-soldering-glance",
    blurb:
      "QUICK and PANDA intelligent soldering robots for batch and in-line selective soldering.",
  },
  {
    key: "dispensing",
    label: "Robotic Dispensing",
    rootSlug: "auto-dispensing-at-a-glance",
    blurb:
      "ET and QS series precision dispensing platforms for adhesives, coatings and paste.",
  },
  {
    key: "screw-driving",
    label: "Robotic Screw Driving",
    rootSlug: "auto-screw-driving-at-a-glance",
    blurb:
      "Auto-feed, torque-controlled screw driving robots for repeatable assembly.",
  },
  {
    key: "laser-marking",
    label: "Laser Marking",
    rootSlug: "laser-marking-at-a-glance",
    blurb:
      "PANDA Robotics laser marking systems for permanent, high-contrast PCB traceability.",
  },
  {
    key: "cobots",
    label: "TechMan Cobots",
    rootSlug: "tm-robots-at-a-glance",
    blurb:
      "TechMan collaborative robots with built-in vision — TM5 through TM20 payload classes.",
  },
  {
    key: "mobile-robots",
    label: "Mobile Robot Solutions",
    rootSlug: "intelligent-mobile-robot-solutions",
    blurb:
      "OMRON autonomous mobile robots for intelligent line loading and unloading.",
  },
  {
    key: "xray-inspection",
    label: "X-Ray Inspection",
    rootSlug: "xray-at-a-glance",
    blurb: "SEAMARK X-ray inspection systems for hidden solder-joint quality.",
  },
  {
    key: "services",
    label: "Services & Support",
    rootSlug: "complimentary-services",
    blurb:
      "Integration kits, nitrogen output kits, safety enclosures, training and complimentary lab services.",
  },
  {
    key: "robotics-division",
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
