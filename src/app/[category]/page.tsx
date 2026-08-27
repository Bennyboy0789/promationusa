import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  getProductsInCategory,
  getProduct,
  heroImage,
  productHref,
  specLabel,
} from "@/lib/products";
import { categoryContent } from "@/lib/categoryContent";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { Markdown } from "@/lib/markdown";
import { CtaBar, RequestQuoteBlock } from "@/components/Conversion";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.path }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.path === category);
  if (!cat) return {};
  const extra = categoryContent[cat.key];
  return {
    alternates: { canonical: `/${cat.path}` },
    title: `${cat.label} — US Stock & Support`,
    description: (extra?.definition ?? cat.blurb).slice(0, 158),
  };
}

/**
 * Category hub.
 *
 * The page type the audit found winning every category SERP the old site lost:
 * a citable definition, a comparison table of every model in the line, buying
 * guidance phrased as the questions people actually search, and a quote path.
 * It replaces the legacy "at a glance" landing page, whose copy it inherits.
 */
export default async function CategoryHub({
  params,
}: PageProps<"/[category]">) {
  const { category } = await params;
  const cat = categories.find((c) => c.path === category);
  if (!cat) notFound();

  const root = getProduct(cat.rootSlug);
  const models = getProductsInCategory(cat.key).filter(
    (p) => p.slug !== cat.rootSlug
  );
  const extra = categoryContent[cat.key];

  // Spec columns are chosen from what this category actually publishes: the
  // three keys most of its models share. Several categories carry specs on only
  // one or two models — there the table would repeat the card grid with a row
  // of dashes, so it is dropped entirely rather than padded out.
  const counts = new Map<string, number>();
  for (const m of models) {
    for (const [k, v] of Object.entries(m.specs ?? {})) {
      if (typeof v === "string" || typeof v === "number") {
        counts.set(k, (counts.get(k) ?? 0) + 1);
      }
    }
  }
  const columns = [...counts.entries()]
    .filter(([, n]) => n >= 3 && n >= models.length * 0.25)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: cat.label, href: `/${cat.path}` },
        ]}
      />
      {extra && <FaqJsonLd items={extra.faqs} />}

      <PageHero
        eyebrow="Product Category"
        title={cat.label}
        intro={cat.blurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: cat.label },
        ]}
      />

      <CtaBar
        label={`Choosing a ${cat.label.toLowerCase()} system?`}
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "Send us your board", href: "/pcb-trial" }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {extra && (
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
              {extra.definition}
            </p>
          </Reveal>
        )}

        {/* Comparison table — the artefact category SERPs reward */}
        {models.length > 1 && columns.length > 0 && (
          <div className="mt-16">
            <SectionHeading
              eyebrow="Compare the range"
              title={`Every ${cat.label.toLowerCase()} model`}
              intro="Pricing depends on configuration, so we quote per build rather than list a headline figure — ask and we will send the range for any model here."
            />
            <Reveal>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="py-3 pr-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Model
                      </th>
                      {columns.map((c) => (
                        <th
                          key={c}
                          className="py-3 pr-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
                        >
                          {specLabel(c)}
                        </th>
                      ))}
                      <th className="py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((m) => (
                      <tr
                        key={m.slug}
                        className="border-b border-line/60 last:border-0"
                      >
                        <td className="py-3 pr-4">
                          <Link
                            href={productHref(m)}
                            className="font-display font-semibold text-slate-900 transition-colors hover:text-blue-600"
                          >
                            {m.title}
                          </Link>
                        </td>
                        {columns.map((c) => (
                          <td key={c} className="py-3 pr-4 text-muted">
                            {String((m.specs as Record<string, unknown>)?.[c] ?? "—")}
                          </td>
                        ))}
                        <td className="py-3">
                          <Link
                            href="/contact"
                            data-cta="hub-table-quote"
                            className="font-mono text-[11px] uppercase tracking-[0.15em] text-blue-600 hover:text-blue-500"
                          >
                            Get range →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        )}

        {/* The models themselves */}
        {models.length > 0 && (
          <div className="mt-16">
            <SectionHeading eyebrow="The range" title="Models in this line" />
            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m) => {
                const img = heroImage(m);
                return (
                  <RevealItem key={m.slug} className="h-full">
                    <TiltCard className="group relative h-full" maxTilt={5}>
                      <Link
                        href={productHref(m)}
                        className="glass clip-corner flex h-full flex-col gap-2.5 p-5 transition-colors hover:border-blue-400/40"
                      >
                        {img && (
                          <div className="relative -mx-1 mb-1 aspect-[4/3] overflow-hidden bg-white/60">
                            <Image
                              src={img.src}
                              alt={m.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                              className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          </div>
                        )}
                        <h3 className="font-display text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                          {m.title}
                        </h3>
                        {m.tagline && (
                          <p className="text-xs leading-relaxed text-muted line-clamp-2">
                            {m.tagline}
                          </p>
                        )}
                      </Link>
                    </TiltCard>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        )}

        {/* Inherited landing-page copy */}
        {root?.description && (
          <Reveal>
            <div className="prose-future mt-16 max-w-3xl">
              <Markdown text={root.description} />
            </div>
          </Reveal>
        )}

        {/* Buying guidance — visible, which is what makes the FAQ markup honest */}
        {extra && extra.faqs.length > 0 && (
          <div className="mt-16">
            <SectionHeading
              eyebrow="Buying guidance"
              title="Questions worth asking"
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {extra.faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="glass clip-corner h-full p-7">
                    <h3 className="font-display text-lg font-semibold text-slate-900">
                      {f.q}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Cluster links */}
        <div className="mt-16">
          <SectionHeading eyebrow="Elsewhere" title="Related lines" />
          <div className="mt-8 flex flex-wrap gap-3">
            {categories
              .filter((c) => c.key !== cat.key && c.key !== "robotics-division")
              .map((c) => (
                <Link
                  key={c.key}
                  href={`/${c.path}`}
                  className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50 hover:text-blue-600"
                >
                  {c.label}
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading={`Request a quote — ${cat.label}`}
          blurb="Tell us the process and the part. We will come back with the configuration that suits it, the price range and the lead time."
          secondary={{ label: "Send us your board", href: "/pcb-trial" }}
        />
      </div>
    </>
  );
}
