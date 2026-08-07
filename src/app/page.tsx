"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "What We Do", href: "#services" },
  { label: "Events", href: "#events" },
  { label: "Partners", href: "#partners" },
];

const SERVICES = [
  {
    title: "PCB Handling Systems",
    description:
      "Complete board handling solutions including bare board loading, magazine line loading/unloading, inspection stations, transfer conveyors, buffering, slide lines, turning stations, inverters, accumulation, dual lane systems, and post-AOI/SPI sorting.",
    tags: ["Bare Board Loading", "Conveyors", "Buffering", "Sorting"],
  },
  {
    title: "Robotic Soldering",
    description:
      "Advanced robotic soldering solutions featuring ECO, E, N, F, and M series robots with hot air, molten drop, and hot bar capabilities. Includes Panda Intelligent Soldering with inline and custom configurations.",
    tags: ["ECO Series", "E Series", "N Series", "Hot Bar"],
  },
  {
    title: "Automatic Label Placement",
    description:
      "High-precision robotic dispensing and screw driving systems for automated label placement and assembly operations across electronics manufacturing lines.",
    tags: ["Dispensing", "Screw Driving", "Precision"],
  },
  {
    title: "Laser Mark Systems",
    description:
      "PCB laser marking solutions with Panda Robotics integration. Permanent, high-contrast marking for traceability, compliance, and quality control in electronics manufacturing.",
    tags: ["PCB Marking", "Traceability", "Panda Robotics"],
  },
  {
    title: "Work Flow Solutions",
    description:
      "Intelligent mobile robot solutions including line loading/unloading, collaborative robots (Techman TM series), and X-ray inspection systems. End-to-end workflow automation for smart factories.",
    tags: ["Mobile Robots", "Cobots", "X-Ray", "Smart Factory"],
  },
  {
    title: "Complimentary Services",
    description:
      "Full-service support including integration kits, heated nitrogen output kits, robot safety enclosures, training, and ongoing technical support for all PROMATION automation solutions.",
    tags: ["Integration", "Training", "Support", "Safety"],
  },
];

const PRODUCT_CATEGORIES = [
  { name: "PCB Handling", count: "22+ products" },
  { name: "Robotic Soldering", count: "18+ products" },
  { name: "Robotic Dispensing", count: "12+ products" },
  { name: "Robotic Screw Driving", count: "14+ products" },
  { name: "Laser Marking", count: "Panda Robotics" },
  { name: "Mobile Robots & Cobots", count: "Techman USA" },
  { name: "X-Ray Inspection", count: "Seamark USA" },
];

const EVENTS = [
  {
    title: "Stay tuned for upcoming trade shows and events",
    description:
      "PROMATION USA regularly exhibits at major electronics manufacturing trade shows across North America. Check back for our 2026 schedule.",
  },
];

const PARTNERS = [
  { name: "Techman Robot", description: "Collaborative robot solutions" },
  { name: "Seamark", description: "X-Ray inspection systems" },
  { name: "Panda Robotics", description: "Intelligent laser marking & soldering" },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen" id="home">
      {/* SCAM WARNING BANNER */}
      <div className="bg-red-700 text-white text-center py-3 px-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
        <span className="text-yellow-300 text-lg">⚠</span>
        <span>
          BEWARE OF SCAMS INVOLVING UNAUTHORIZED PROMATION USA DISTRIBUTORS OR
          SALES REPRESENTATIVES!
        </span>
        <span className="text-yellow-300 text-lg">⚠</span>
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-bold tracking-tight text-primary"
            >
              <span className="text-white">PROMATION</span>{" "}
              <span className="text-primary">USA</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted hover:text-white hover:bg-surface-light rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-2 px-5 py-2 text-sm font-semibold bg-primary text-black rounded-lg hover:bg-primary-dark transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-muted hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden pb-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-surface-light rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-primary hover:bg-surface-light rounded-lg transition-colors"
              >
                Contact
              </a>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden">
          {/* Background grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,158,11,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 lg:py-48">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                North American Headquarters
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Premium{" "}
                <span className="text-primary">Automation Solutions</span> for
                Electronics Manufacturing
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl leading-relaxed">
                PCB Handling Systems · Robotic Soldering · Automatic Label
                Placement · Laser Mark · Work Flow Solutions — engineered for
                reliability and precision.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="px-8 py-3.5 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
                >
                  Explore Products
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3.5 border border-border text-white font-semibold rounded-lg hover:bg-surface-light hover:border-primary/50 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our Products
              </h2>
              <p className="text-muted max-w-2xl mx-auto text-lg">
                Comprehensive automation product lines serving every stage of
                electronics manufacturing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {PRODUCT_CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  className="group p-6 rounded-xl bg-surface border border-border hover:border-primary/40 hover:bg-surface-light transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-lg">
                      {cat.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted">{cat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES / WHAT WE DO SECTION */}
        <section id="services" className="py-24 sm:py-32 bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                What We Do
              </h2>
              <p className="text-muted max-w-2xl mx-auto text-lg">
                End-to-end automated solutions for electronics manufacturing and
                assembly — from PCB handling to robotic soldering and beyond.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="p-6 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Events
              </h2>
              <p className="text-muted max-w-2xl mx-auto text-lg">
                Meet PROMATION USA at industry events and trade shows.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {EVENTS.map((event) => (
                <div
                  key={event.title}
                  className="p-8 rounded-xl bg-surface border border-border text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <svg
                      className="w-7 h-7 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERS SECTION */}
        <section id="partners" className="py-24 sm:py-32 bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our Partners
              </h2>
              <p className="text-muted max-w-2xl mx-auto text-lg">
                Trusted technology partners powering our automation solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="p-6 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  About{" "}
                  <span className="text-primary">PROMATION USA</span>
                </h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>
                    PROMATION USA is the North American headquarters for
                    PROMATION Inc., delivering premium automated solutions for
                    electronics manufacturing and assembly.
                  </p>
                  <p>
                    Our comprehensive product portfolio spans PCB handling
                    systems, robotic soldering, automatic label placement, laser
                    marking, and workflow solutions. We serve manufacturers
                    across North America with cutting-edge automation technology
                    backed by expert engineering support.
                  </p>
                  <p>
                    From individual assembly stations to complete smart factory
                    integrations, PROMATION USA provides the reliability,
                    precision, and innovation that modern electronics
                    manufacturing demands.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "22+", label: "Years of Innovation" },
                  { value: "100+", label: "Product Models" },
                  { value: "7", label: "Product Categories" },
                  { value: "USA", label: "North American HQ" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-xl bg-surface border border-border text-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 sm:py-32 bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Contact Us
              </h2>
              <p className="text-muted max-w-2xl mx-auto text-lg">
                Get in touch with our team for product inquiries, technical
                support, or partnership opportunities.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Address */}
              <div className="p-6 rounded-xl bg-surface border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Headquarters
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  9900 58TH PL. STE.#100
                  <br />
                  KENOSHA, WI 53144
                </p>
              </div>

              {/* Phone */}
              <div className="p-6 rounded-xl bg-surface border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">Phone</h3>
                <a
                  href="tel:+12627644832"
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  262.764.4832
                </a>
              </div>

              {/* Email */}
              <div className="p-6 rounded-xl bg-surface border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <a
                  href="mailto:Sales@PROMATIONUSA.com"
                  className="text-sm text-primary hover:text-primary-dark transition-colors break-all"
                >
                  Sales@PROMATIONUSA.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-lg">
                PROMATION<span className="text-primary">USA</span>
              </p>
              <p className="text-sm text-muted mt-1">
                North American Headquarters
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted">
            &copy; {new Date().getFullYear()} PROMATION USA. All rights
            reserved. 17 U.S.C. &sect; 506(a) and 18 U.S.C. &sect; 2319.
          </div>
        </div>
      </footer>
    </div>
  );
}
