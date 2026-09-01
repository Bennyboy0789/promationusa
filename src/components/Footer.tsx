import Link from "next/link";
import { site, mainNav, productCategories, companyNav } from "@/lib/site";
import { Wordmark } from "@/components/Wordmark";

const socials = [
  { label: "YouTube", href: site.social.youtube },
  { label: "Facebook", href: site.social.facebook },
  { label: "Instagram", href: site.social.instagram },
  { label: "LinkedIn", href: site.social.linkedin },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="grid-bg grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              aria-label="PROMATION USA — home"
              className="inline-flex transition-opacity hover:opacity-80"
            >
              <Wordmark height={30} />
            </Link>
            <p className="text-sm leading-relaxed text-muted">
              Premium automated solutions for electronics manufacturing and
              assembly. {site.tagline}.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping-soft" />
              Systems Online — Kenosha, WI
            </div>
          </div>

          {/* Site */}
          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
              {"// Navigate"}
            </h3>
            <ul className="space-y-2.5">
              {mainNav
                .filter((i) => i.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
              {"// Product Lines"}
            </h3>
            <ul className="space-y-2.5">
              {productCategories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company — the only crawlable path to these pages.
              The header dropdown that lists them is mounted on hover, so its
              links never appear in server HTML and a crawler sees no route to
              /partners, /careers or the training gallery at all. */}
          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
              {"// Company"}
            </h3>
            <ul className="space-y-2.5">
              {companyNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-muted transition-colors hover:text-blue-600"
                >
                  Buyer&rsquo;s Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-sm text-muted transition-colors hover:text-blue-600"
                >
                  Compare &amp; Alternatives
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="text-sm text-muted transition-colors hover:text-blue-600"
                >
                  Brands We Source
                </Link>
              </li>
              <li>
                <Link
                  href="/pcb-trial"
                  className="text-sm text-muted transition-colors hover:text-blue-600"
                >
                  Free Board Trial
                </Link>
              </li>
              <li>
                <Link
                  href="/book-a-demo"
                  className="text-sm text-muted transition-colors hover:text-blue-600"
                >
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
              {"// Headquarters"}
            </h3>
            <address className="space-y-2.5 text-sm not-italic text-muted">
              <p>
                PROMATION INC. USA
                <br />
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p>
                <a href={`tel:+1${site.phone.replace(/\./g, "")}`} className="transition-colors hover:text-blue-600">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-blue-600">
                  {site.email}
                </a>
              </p>
            </address>
            <div className="mt-5 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-all hover:border-blue-400/50 hover:text-blue-600"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            © {new Date().getFullYear()} PROMATION INC. USA — All rights reserved
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Automation. Precision. Future.
          </p>
        </div>
      </div>
    </footer>
  );
}
