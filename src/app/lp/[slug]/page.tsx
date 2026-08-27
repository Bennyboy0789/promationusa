import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { landingPages, getLandingPage } from "@/lib/landingPages";
import {
  categories,
  getProductsInCategory,
  productHref,
  heroImage,
  specLabel,
} from "@/lib/products";
import { QuickRfq } from "@/components/QuickRfq";
import { TrustStrip } from "@/components/Conversion";
import { site } from "@/lib/site";
import { shorten } from "@/lib/seo";

export function generateStaticParams() {
  return landingPages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lp/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lp = getLandingPage(slug);
  if (!lp) return {};
  return {
    title: { absolute: shorten(lp.metaTitle, 60) },
    description: shorten(lp.subhead, 158),
    // A landing page shadows the category page it duplicates. Letting both
    // compete organically is how you lose the one you want ranking.
    robots: { index: false, follow: false },
  };
}

/**
 * Ad landing page.
 *
 * Deliberately not wrapped in the site chrome: minimal header with logo and
 * phone only, no navigation, one CTA repeated, minimal footer. Every link that
 * is not the CTA is a way to leak a paid click.
 */
export default async function LandingPage({ params }: PageProps<"/lp/[slug]">) {
  const { slug } = await params;
  const lp = getLandingPage(slug);
  if (!lp) notFound();

  const cat = categories.find((c) => c.key === lp.category);
  const models = cat
    ? getProductsInCategory(cat.key)
        .filter((p) => p.slug !== cat.rootSlug)
        .slice(0, 3)
    : [];

  const specKeys = (() => {
    const counts = new Map<string, number>();
    for (const m of models) {
      for (const [k, v] of Object.entries(m.specs ?? {})) {
        if (typeof v === "string" || typeof v === "number") {
          counts.set(k, (counts.get(k) ?? 0) + 1);
        }
      }
    }
    return [...counts.entries()]
      .filter(([, n]) => n === models.length && models.length > 1)
      .slice(0, 2)
      .map(([k]) => k);
  })();

  const phoneHref = `tel:+1${site.phone.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header — logo and phone, no navigation */}
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-slate-900">PROMATION</span>{" "}
            <span className="text-blue-600">USA</span>
          </span>
          <a
            href={phoneHref}
            className="inline-flex min-h-[24px] items-center font-mono text-xs uppercase tracking-[0.15em] text-slate-900 transition-colors hover:text-blue-600"
          >
            {site.phone}
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
            <div>
              <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {lp.headline}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                {lp.subhead}
              </p>

              <ul className="mt-8 space-y-3">
                {lp.proof.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-blue-500"
                    />
                    <span className="text-sm leading-relaxed text-foreground/85">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RFQ above the fold — the whole point of the page */}
            <QuickRfq
              compact
              heading="Get a quote"
              blurb="Three fields. An applications engineer replies within one business day."
              source={`/lp/${lp.slug}`}
            />
          </div>
        </section>

        <section className="border-y border-line bg-surface-light/40">
          <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3">
            {lp.bullets.map((b) => (
              <div key={b.heading}>
                <h2 className="font-display text-base font-semibold text-slate-900">
                  {b.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {models.length > 0 && (
          <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Representative models
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {models.map((m) => {
                const img = heroImage(m);
                return (
                  <div key={m.slug} className="glass clip-corner flex flex-col gap-2.5 p-5">
                    {img && (
                      <div className="relative -mx-1 mb-1 aspect-[4/3] overflow-hidden bg-white/60">
                        <Image
                          src={img.src}
                          alt={m.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 300px"
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                    <h3 className="font-display text-sm font-semibold leading-snug text-slate-900">
                      {m.title}
                    </h3>
                    {specKeys.map((k) => (
                      <p key={k} className="text-xs text-muted">
                        <span className="font-mono uppercase tracking-[0.12em]">
                          {specLabel(k)}:
                        </span>{" "}
                        {String((m.specs as Record<string, unknown>)[k])}
                      </p>
                    ))}
                    <Link
                      href={productHref(m)}
                      className="mt-auto inline-flex min-h-[24px] items-center pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-600 hover:text-blue-500"
                    >
                      Full specifications →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* The single CTA, repeated */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 text-center sm:px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              {lp.cta.label === "Request the trial"
                ? "Send us your board"
                : "Ready for pricing?"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Tell us the process and the part. We will come back with the
              configuration that suits it, the price range, and lead time from US
              stock.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={lp.cta.href}
                data-cta={`lp-${lp.slug}`}
                className="clip-corner bg-blue-600 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-500"
              >
                {lp.cta.label}
              </Link>
              <a
                href={phoneHref}
                className="clip-corner inline-flex min-h-[24px] items-center border border-blue-400/25 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50"
              >
                Or call {site.phone}
              </a>
            </div>
            <TrustStrip className="mt-9 justify-center" />
          </div>
        </section>
      </main>

      {/* Minimal footer — no link farm */}
      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 text-center sm:px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            PROMATION INC. USA · {site.address.city}, {site.address.state} ·{" "}
            {site.phone}
          </p>
        </div>
      </footer>
    </div>
  );
}
