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
 * A slim conversion bar for directly beneath a page hero.
 *
 * Deep pages used to offer nothing until the visitor had scrolled past the
 * whole catalogue — worst case twenty screens on a phone. This sits high
 * enough to be seen without scrolling and is light enough not to push the
 * content it introduces out of view.
 */
export function CtaBar({
  label = "Know what you need?",
  primary = { label: "Request a quote", href: "/contact" },
  secondary,
  className = "",
}: {
  label?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={`border-b border-line bg-surface-light/40 ${className}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {label}
        </span>
        <div className="flex flex-wrap items-center gap-2.5 sm:ml-auto">
          <Link
            href={primary.href}
            data-cta="cta-bar-primary"
            className="clip-corner border border-blue-400/50 bg-blue-500/10 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700 transition-colors hover:bg-blue-500/20"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              data-cta="cta-bar-secondary"
              className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50"
            >
              {secondary.label}
            </Link>
          )}
          <a
            href={phoneHref}
            className="clip-corner px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:text-blue-600"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * A compact ask for dropping between blocks of content.
 *
 * Lighter than RequestQuoteBlock on purpose: on a long index it appears
 * several times, and the full block repeated would read as nagging.
 */
export function InlineAsk({
  heading = "Want pricing on any of these?",
  blurb = "Tell us the process and we will come back with the right configuration and what it costs.",
}: {
  heading?: string;
  blurb?: string;
}) {
  return (
    <aside className="glass clip-corner flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div className="max-w-xl">
        <p className="font-display text-lg font-semibold text-slate-900">{heading}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{blurb}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2.5">
        <Link
          href="/contact"
          data-cta="inline-ask-quote"
          className="clip-corner border border-blue-400/50 bg-blue-500/10 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700 transition-colors hover:bg-blue-500/20"
        >
          Request a quote
        </Link>
        <a
          href={phoneHref}
          className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50"
        >
          {site.phone}
        </a>
      </div>
    </aside>
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
            data-cta="rfq-block-quote"
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
              data-cta="rfq-block-secondary"
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
