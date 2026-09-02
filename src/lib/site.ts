export const site = {
  name: "PROMATION USA",
  tagline: "Start Your Automation Journey",
  description:
    "PROMATION USA provides premium automated solutions for electronics manufacturing and assembly — PCB handling systems, robotic soldering, dispensing, screw driving, laser marking, cobots, PCB depaneling and label placement.",
  phone: "262.764.4832",
  email: "sales@promationusa.com",
  address: {
    street: "9900 58th Place, Suite #100",
    city: "Kenosha",
    state: "WI",
    zip: "53144",
  },
  social: {
    youtube: "https://www.youtube.com/@promationusa",
    facebook: "https://www.facebook.com/promationusa",
    instagram: "https://www.instagram.com/promationusa",
    linkedin: "https://www.linkedin.com/company/promation-usa",
  },
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
};

// Category hubs. Kept in sync with `categories` in lib/products.ts — these
// are the canonical hub paths, not the legacy landing-page slugs.
export const productCategories: NavItem[] = [
  { label: "New Products", href: "/new-products" },
  { label: "PCB Handling", href: "/pcb-handling" },
  { label: "Robotic Soldering", href: "/robotic-soldering" },
  { label: "Laser Marking", href: "/laser-marking" },
  { label: "Robotic Dispensing", href: "/robotic-dispensing" },
  { label: "Robotic Screw Driving", href: "/robotic-screw-driving" },
  { label: "PCB Depaneling", href: "/pcb-depaneling" },
  { label: "Label Placement", href: "/label-placement" },
  { label: "Mobile Robot Solutions", href: "/mobile-robots" },
  { label: "TechMan Cobots", href: "/collaborative-robots" },
  { label: "Services & Support", href: "/services" },
];

/** Educational content — the cluster the growth plan is built on. */
export const resourcesNav: NavItem[] = [
  { label: "Buyer’s Guides", href: "/guides" },
  { label: "Compare & Alternatives", href: "/compare" },
  { label: "Brands We Source", href: "/brands" },
  { label: "Free Board Trial", href: "/pcb-trial" },
  { label: "Book a Demo", href: "/book-a-demo" },
];

export const companyNav: NavItem[] = [
  { label: "About", href: "/what-we-do" },
  { label: "Partners", href: "/partners" },
  { label: "Events", href: "/events" },
  { label: "Training", href: "/virtual-training-gallery" },
  { label: "Careers", href: "/careers" },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", children: productCategories },
  { label: "Guides", href: "/guides", children: resourcesNav },
  { label: "Why PROMATION", href: "/why-promation" },
  { label: "Company", href: "/what-we-do", children: companyNav },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Store", href: "/store" },
];
