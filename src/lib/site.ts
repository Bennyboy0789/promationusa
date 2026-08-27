export const site = {
  name: "PROMATION USA",
  tagline: "Start Your Automation Journey",
  description:
    "PROMATION USA provides premium automated solutions for electronics manufacturing and assembly — PCB handling systems, robotic soldering, dispensing, screw driving, laser marking, cobots and X-ray inspection.",
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
  { label: "Mobile Robot Solutions", href: "/mobile-robots" },
  { label: "TechMan Cobots", href: "/collaborative-robots" },
  { label: "SEAMARK X-Ray", href: "/x-ray-inspection" },
  { label: "Services & Support", href: "/services" },
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
  { label: "Why PROMATION", href: "/why-promation" },
  { label: "Company", href: "/what-we-do", children: companyNav },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Store", href: "/store" },
];
