/**
 * The four PDF brochures published on the old site, pulled into /public and
 * attached at category level — every model page in a line carried its line's
 * brochure there, and the category is the durable way to keep that true as
 * models come and go.
 *
 * Sizes are stated on the button so nobody taps into an 8 MB download on a
 * phone without warning.
 */

export type Brochure = {
  label: string;
  href: string;
  size: string;
  /** category keys whose hub and product pages offer this download */
  categories: string[];
};

export const brochures: Brochure[] = [
  {
    label: "Product Line Brochure",
    href: "/brochures/promation-product-line-brochure.pdf",
    size: "8 MB",
    categories: ["pcb-handling", "mobile-robots", "new-products"],
  },
  {
    label: "Robotic Soldering Brochure",
    href: "/brochures/promation-robotic-soldering-brochure.pdf",
    size: "5 MB",
    categories: ["soldering"],
  },
  {
    label: "Robotic Screw Driving Brochure",
    href: "/brochures/promation-robotic-screw-driving-brochure.pdf",
    size: "3 MB",
    categories: ["screw-driving"],
  },
  {
    label: "Robotic Dispensing Brochure",
    href: "/brochures/promation-robotic-dispensing-brochure.pdf",
    size: "3 MB",
    categories: ["dispensing"],
  },
];

export function brochuresFor(categoryKey: string): Brochure[] {
  return brochures.filter((b) => b.categories.includes(categoryKey));
}
