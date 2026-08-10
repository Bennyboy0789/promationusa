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

export const productCategories: NavItem[] = [
  { label: "New Products", href: "/new-products" },
  { label: "PCB Handling", href: "/pcb-handling" },
  { label: "Robotics Division", href: "/robotics-division" },
  { label: "Robotic Soldering", href: "/robotic-soldering-glance" },
  { label: "Laser Marking", href: "/laser-marking-at-a-glance" },
  { label: "Robotic Dispensing", href: "/auto-dispensing-at-a-glance" },
  { label: "Robotic Screw Driving", href: "/auto-screw-driving-at-a-glance" },
  { label: "Mobile Robot Solutions", href: "/intelligent-mobile-robot-solutions" },
  { label: "TechMan Cobots", href: "/tm-robots-at-a-glance" },
  { label: "SEAMARK X-Ray", href: "/xray-at-a-glance" },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", children: productCategories },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Events", href: "/events" },
  { label: "Partners", href: "/partners" },
  { label: "Press Releases", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Training", href: "/virtual-training-gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Store", href: "/store" },
];
