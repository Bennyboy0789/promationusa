"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { mainNav } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.68, 0.19, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-blue-400/10 bg-white/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" onClick={closeMenus} className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center clip-corner bg-blue-400/10 border border-blue-400/40">
            <span className="font-display text-sm font-bold text-blue-600">P</span>
            <span className="absolute inset-0 clip-corner bg-blue-400/0 transition-colors duration-300 group-hover:bg-blue-400/15" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-slate-900">PROMATION</span>{" "}
            <span className="text-blue-600">USA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 xl:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                    pathname.startsWith("/products") || openDropdown === item.label
                      ? "text-blue-600"
                      : "text-muted hover:text-slate-900"
                  }`}
                >
                  {item.label}
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden>
                    <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full w-64 pt-2"
                    >
                      <div className="glass clip-corner p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMenus}
                            className={`block px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all hover:translate-x-1 hover:bg-blue-400/10 ${
                              pathname === child.href ? "text-blue-600" : "text-muted hover:text-blue-500"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className={`relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                  pathname === item.href ? "text-blue-600" : "text-muted hover:text-slate-900"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-blue-400"
                  />
                )}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-blue-600"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-px w-6 bg-blue-600"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-blue-600"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.68, 0.19, 1] }}
            className="overflow-hidden border-b border-blue-400/10 bg-white/95 backdrop-blur-xl xl:hidden"
          >
            <div className="max-h-[75vh] space-y-1 overflow-y-auto px-4 py-4">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    className={`block px-2 py-2.5 font-mono text-xs uppercase tracking-[0.2em] ${
                      pathname === item.href ? "text-blue-600" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 border-l border-line pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenus}
                          className="block px-2 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted/80 hover:text-blue-500"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
