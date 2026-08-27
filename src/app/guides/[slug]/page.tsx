import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guides, getGuide, GUIDE_KIND_LABEL } from "@/lib/guides";
import { categories, categoryHref } from "@/lib/products";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { CtaBar, RequestQuoteBlock } from "@/components/Conversion";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { shorten } from "@/lib/seo";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    alternates: { canonical: `/guides/${guide.slug}` },
    title: { absolute: shorten(guide.metaTitle, 60) },
    description: shorten(guide.description, 158),
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const cat = categories.find((c) => c.key === guide.category);
  const related = guides
    .filter((g) => g.slug !== guide.slug && g.category === guide.category)
    .slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />
      {guide.faqs.length > 0 && <FaqJsonLd items={guide.faqs} />}

      <PageHero
        eyebrow={GUIDE_KIND_LABEL[guide.kind]}
        title={guide.title}
        intro={guide.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: GUIDE_KIND_LABEL[guide.kind] },
        ]}
      />

      <CtaBar
        label="Want this answered for your part?"
        primary={{ label: "Ask an engineer", href: "/contact" }}
        secondary={{ label: "Send us your board", href: "/pcb-trial" }}
      />

      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* The short answer, written to stand alone so it can be quoted. */}
        <Reveal>
          <p className="border-l-2 border-blue-400/40 pl-5 text-lg leading-relaxed text-foreground/90">
            {guide.definition}
          </p>
        </Reveal>

        <div className="mt-14 space-y-12">
          {guide.sections.map((s) => (
            <Reveal key={s.heading}>
              <section>
                <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {guide.priceNote && (
          <Reveal>
            <div className="glass clip-corner mt-14 p-7">
              <h2 className="font-display text-lg font-bold text-slate-900">
                On published prices
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {guide.priceNote}
              </p>
            </div>
          </Reveal>
        )}

        {guide.faqs.length > 0 && (
          <div className="mt-16">
            <SectionHeading eyebrow="Questions" title="Commonly asked" />
            <div className="mt-8 space-y-4">
              {guide.faqs.map((f) => (
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
          {related.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50 hover:text-blue-600"
            >
              {GUIDE_KIND_LABEL[g.kind]}: {g.title.slice(0, 40)}
            </Link>
          ))}
          <Link
            href="/guides"
            className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50 hover:text-blue-600"
          >
            All guides
          </Link>
        </div>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Get the answer for your actual part"
          blurb="A guide can only take you so far. Send us the board, the fluid or the fastener and we will run it, film it, and come back with cycle times and a quote."
          secondary={{ label: "Send us your board", href: "/pcb-trial" }}
        />
      </div>
    </>
  );
}
