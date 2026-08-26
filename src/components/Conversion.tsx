import Link from "next/link";
import { site } from "@/lib/site";

const phoneHref = `tel:+1${site.phone.replace(/\D/g, "")}`;

/**
 * Trust strip — the differentiators that answer imported-equipment concerns.
 * Kept short enough to read at a glance; appears above the quote ask.
 */
export function TrustStrip({ className = "" }: { className?: string }) {
  const points = [
    "Official QUICK & TechMan source",
    "US stock",
    "IPC-certified engineers",
    "TITAN Award 2025",
  ];
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted ${className}`}
    >
      {points.map((p) => (
        <li key={p} className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-blue-500" />
          {p}
        </li>
      ))}
    </ul>
  );
}

/**
 * The single quote ask, reused across product, category and guide pages.
 * Every page that describes a machine ends with a way to ask about it.
 */
export function RequestQuoteBlock({
  heading = "Request a quote",
  blurb = "Tell us what you're building and we'll come back with pricing, lead time and the right configuration.",
  secondary,
}: {
  heading?: string;
  blurb?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section
      aria-labelledby="rfq-heading"
      className="glass clip-corner mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-12"
    >
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2
            id="rfq-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900"
          >
            {heading}
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">{blurb}</p>
          <TrustStrip className="mt-5" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
          <Link
            href="/contact"
            className="clip-corner border border-blue-400/50 bg-blue-500/10 px-6 py-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700 transition-colors hover:bg-blue-500/20"
          >
            Request a quote
          </Link>
          <a
            href={phoneHref}
            className="clip-corner border border-blue-400/25 px-6 py-3 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50"
          >
            Call {site.phone}
          </a>
          {secondary && (
            <Link
              href={secondary.href}
              className="clip-corner border border-blue-400/25 px-6 py-3 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
