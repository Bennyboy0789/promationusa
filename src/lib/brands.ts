import { products, categories, type Product } from "@/lib/products";

/**
 * The lines PROMATION USA is the named source for.
 *
 * Copy here is limited to what the audit research and the client's own material
 * established: who makes the equipment, what PROMATION's relationship to it is,
 * and which of its machines are in this catalogue. No installed-base figures,
 * founding dates or market-share claims — those need the manufacturer to
 * confirm them, and a brand page that overstates the relationship is worse than
 * no brand page.
 */

export type Brand = {
  slug: string;
  name: string;
  /** How PROMATION is positioned against this line. */
  relationship: string;
  origin: string;
  summary: string;
  /** Why a buyer would choose it, in the buyer's terms. */
  strengths: string[];
  /** Category keys this brand supplies, for cross-linking. */
  categoryKeys: string[];
  /** Matched against product titles to build the model list. */
  match: RegExp;
};

export const brands: Brand[] = [
  {
    slug: "quick",
    name: "QUICK",
    relationship: "Official North American source",
    origin: "Manufactured by QUICK, China",
    summary:
      "QUICK builds the soldering and fume-extraction range that makes up the largest part of this catalogue — benchtop and in-line soldering robots, iron and laser heads, solder stations, and the extraction that goes with them. PROMATION USA is the official North American source, which means the machines are held in US stock, configured here, and supported by the engineers who set them up rather than by an overseas help desk.",
    strengths: [
      "The broadest soldering-robot range in this catalogue, from single-head benchtop cells to in-line selective systems",
      "Iron-tip, laser and hot-air heads across one control platform, so operators learn one interface",
      "Consumables — tips, feed tubes, filters — stocked in the US and orderable from the parts store",
      "Configured and run on a customer part before shipping, not drop-shipped from a container",
    ],
    categoryKeys: ["soldering"],
    match: /\bQUICK\b/i,
  },
  {
    slug: "panda-robotics",
    name: "PANDA Robotics",
    relationship: "Designed and engineered in the USA",
    origin: "PANDA Robotics USA",
    summary:
      "PANDA is the US-engineered line covering intelligent soldering and laser marking, with vision alignment, network connectivity and remote support built in rather than added on. It is the range PROMATION points at when a buyer wants domestic engineering and a support path that does not cross an ocean. The line was recognised in the 2025 TITAN Innovation Awards.",
    strengths: [
      "Vision alignment and network connectivity as standard, with remote diagnostic support",
      "Covers both robotic soldering and inline laser marking for PCB traceability",
      "US engineering, so design questions and support requests go to the same organisation",
      "TITAN Innovation Award recognition in 2025",
    ],
    categoryKeys: ["soldering", "laser-marking"],
    match: /\bPANDA\b/i,
  },
  {
    slug: "techman",
    name: "TechMan Robot",
    relationship: "Authorised cobot distributor",
    origin: "Techman Robot, Taiwan",
    summary:
      "TechMan builds collaborative robots with a camera and vision system integrated into the arm rather than bolted on, and a flow-based programming interface that a manufacturing engineer can learn without a robotics background. PROMATION USA distributes and integrates the TM5 through TM20 payload classes for electronics manufacturing — tending, inspection and material movement between processes.",
    strengths: [
      "Built-in vision, so alignment and inspection do not need a separate camera integration",
      "Hand-guided teaching and a flow-based interface instead of robot code",
      "TM5 through TM20 covers the payload and reach range electronics assembly typically needs",
      "Force-limited design intended to work beside people, subject to an application risk assessment",
    ],
    categoryKeys: ["cobots"],
    match: /\bTECHMAN\b|\bTM\d/i,
  },
  {
    slug: "seamark",
    name: "SEAMARK",
    relationship: "X-ray inspection partner",
    origin: "SEAMARK ZM, China",
    summary:
      "SEAMARK supplies the X-ray inspection systems in this catalogue — the machines that see solder joints hidden underneath BGAs, QFNs and connectors, where an optical camera cannot reach. The same platforms are widely used for X-ray component counting, which often justifies the purchase on inventory accuracy alone.",
    strengths: [
      "Non-destructive inspection of bottom-terminated components that AOI cannot see",
      "Void, short, insufficient-solder and head-in-pillow detection",
      "Component counting on reels as a secondary use of the same machine",
    ],
    categoryKeys: ["xray-inspection"],
    match: /\bSEAMARK\b|X-?RAY/i,
  },
  {
    slug: "omron",
    name: "OMRON",
    relationship: "Mobile robot integration partner",
    origin: "OMRON Automation",
    summary:
      "OMRON supplies the autonomous mobile robots PROMATION integrates for line loading and unloading — machines that navigate from an onboard map rather than from tape, wire or magnets in the floor. They connect processes that sit near each other in sequence but not in space, without re-engineering the facility to suit a fixed path.",
    strengths: [
      "Map-based navigation, so a changed layout does not mean re-laying a guide path",
      "Re-routes around obstacles rather than stopping at them",
      "Integrated by PROMATION with the loading and unloading stations it serves",
    ],
    categoryKeys: ["mobile-robots"],
    match: /\bOMRON\b|MOBILE ROBOT/i,
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/** Catalogue models attributable to a brand, excluding category landing pages. */
export function brandProducts(brand: Brand): Product[] {
  const roots = new Set(categories.map((c) => c.rootSlug));
  return products.filter(
    (p) =>
      !roots.has(p.slug) &&
      brand.match.test(p.title) &&
      brand.categoryKeys.includes(p.category)
  );
}
