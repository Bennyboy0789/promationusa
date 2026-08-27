import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { comparisons, getComparison } from "@/lib/comparisons";
import { categories, categoryHref } from "@/lib/products";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { CtaBar, RequestQuoteBlock } from "@/components/Conversion";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { shorten } from "@/lib/seo";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return {
    alternates: { canonical: `/compare/${c.slug}` },
    title: { absolute: shorten(c.metaTitle, 60) },
    description: shorten(c.description, 158),
  };
}

export default async function ComparePage({
  params,
}: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const cat = categories.find((x) => x.key === c.category);
  const related = comparisons
    .filter((x) => x.slug !== c.slug && x.category === c.category)
    .slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" },
          { name: c.title, href: `/compare/${c.slug}` },
        ]}
      />
      {c.faqs.length > 0 && <FaqJsonLd items={c.faqs} />}

      <PageHero
        eyebrow="Comparison"
        title={c.title}
        intro={c.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: cat?.label ?? "Comparison" },
        ]}
      />

      <CtaBar
        label="Want this settled on your own part?"
        primary={{ label: "Send us your board", href: "/pcb-trial" }}
        secondary={{ label: "Request a quote", href: "/contact" }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <p className="border-l-2 border-blue-400/40 pl-5 text-lg leading-relaxed text-foreground/90">
            {c.summary}
          </p>
        </Reveal>

        {/* Side by side. Their column is written to be fair — a comparison that
            reads as a hatchet job convinces nobody. */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="glass clip-corner h-full p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {c.them.maker}
              </span>
              <h2 className="mt-2 font-display text-xl font-bold text-slate-900">
                {c.them.name}
              </h2>
              <h3 className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600">
                Where they are strong
              </h3>
              <ul className="mt-3 space-y-2.5">
                {c.them.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-blue-400" />
                    {s}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600">
                Worth considering
              </h3>
              <ul className="mt-3 space-y-2.5">
                {c.them.considerations.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-amber-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-beam clip-corner h-full p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                PROMATION USA
              </span>
              <h2 className="mt-2 font-display text-xl font-bold text-slate-900">
                {c.us.name}
              </h2>
              <h3 className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600">
                What we offer
              </h3>
              <ul className="mt-3 space-y-2.5">
                {c.us.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-blue-500" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href={c.us.href}
                className="clip-corner mt-7 inline-flex min-h-[24px] items-center border border-blue-400/50 bg-blue-500/10 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700 transition-colors hover:bg-blue-500/20"
              >
                See the range
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="The honest answer" title="Which should you pick?" />
          <div className="mt-6 space-y-4">
            {c.verdict.map((v, i) => (
              <Reveal key={i}>
                <p className="leading-relaxed text-muted">{v}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {c.faqs.length > 0 && (
          <div className="mt-16">
            <SectionHeading eyebrow="Questions" title="Commonly asked" />
            <div className="mt-8 space-y-4">
              {c.faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="glass clip-corner p-7">
                    <h3 className="font-display text-base font-semibold text-slate-900">
                      {f.q}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 flex flex-wrap gap-3">
          {cat && (
            <Link
              href={categoryHref(cat)}
              className="clip-corner border border-blue-400/50 bg-blue-500/10 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700 transition-colors hover:bg-blue-500/20"
            >
              {cat.label} systems
            </Link>
          )}
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/compare/${r.slug}`}
              className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50 hover:text-blue-600"
            >
              {r.metaTitle.slice(0, 44)}
            </Link>
          ))}
          <Link
            href="/compare"
            className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50 hover:text-blue-600"
          >
            All comparisons
          </Link>
        </div>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Settle it with your own board"
          blurb="Specification sheets argue. A run does not. Send us the assembly and we will show you the cycle time and the joint quality on the machine you are considering."
          secondary={{ label: "How the trial works", href: "/pcb-trial" }}
        />
      </div>
    </>
  );
}
