import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brands, getBrand, brandProducts } from "@/lib/brands";
import { categories, categoryHref, productHref, heroImage } from "@/lib/products";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { CtaBar, RequestQuoteBlock } from "@/components/Conversion";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { shorten } from "@/lib/seo";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/brands/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return {
    alternates: { canonical: `/brands/${brand.slug}` },
    title: shorten(`${brand.name} — ${brand.relationship}`, 43),
    description: shorten(brand.summary, 158),
  };
}

/**
 * Brand page.
 *
 * The audit found PROMATION already wins "QUICK soldering robot distributor
 * USA" style queries; this is the page type that consolidates that demand
 * instead of scattering it across model pages. Claims are limited to the
 * relationship and the catalogue — no installed-base or market-share figures,
 * which would need the manufacturer to confirm them.
 */
export default async function BrandPage({ params }: PageProps<"/brands/[slug]">) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const models = brandProducts(brand);
  const cats = categories.filter((c) => brand.categoryKeys.includes(c.key));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Brands", href: "/brands" },
          { name: brand.name, href: `/brands/${brand.slug}` },
        ]}
      />

      <PageHero
        eyebrow={brand.relationship}
        title={brand.name}
        intro={brand.origin}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Brands", href: "/brands" },
          { label: brand.name },
        ]}
      />

      <CtaBar
        label={`Looking at ${brand.name} equipment?`}
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "Send us your board", href: "/pcb-trial" }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
            {brand.summary}
          </p>
        </Reveal>

        <div className="mt-14">
          <SectionHeading eyebrow="Why this line" title={`What ${brand.name} is good at`} />
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
            {brand.strengths.map((s) => (
              <RevealItem key={s} className="glass clip-corner flex items-start gap-3 p-6">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-blue-400" />
                <span className="text-sm leading-relaxed text-foreground/85">{s}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {cats.length > 0 && (
          <div className="mt-14">
            <SectionHeading eyebrow="Where it fits" title="Product lines" />
            <div className="mt-8 flex flex-wrap gap-3">
              {cats.map((c) => (
                <Link
                  key={c.key}
                  href={categoryHref(c)}
                  className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50 hover:text-blue-600"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {models.length > 0 && (
          <div className="mt-14">
            <SectionHeading
              eyebrow="The range"
              title={`${brand.name} machines we stock`}
              intro={`${models.length} model${models.length === 1 ? "" : "s"} in the catalogue.`}
            />
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

        <div className="mt-14">
          <SectionHeading eyebrow="Elsewhere" title="Other lines we carry" />
          <div className="mt-8 flex flex-wrap gap-3">
            {brands
              .filter((b) => b.slug !== brand.slug)
              .map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="clip-corner border border-blue-400/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-900 transition-colors hover:border-blue-400/50 hover:text-blue-600"
                >
                  {b.name}
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading={`Request a quote — ${brand.name}`}
          blurb="Tell us the process and the part. We will come back with the configuration that suits it, the price range and the lead time."
          secondary={{ label: "Send us your board", href: "/pcb-trial" }}
        />
      </div>
    </>
  );
}
