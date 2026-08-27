import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { storeItems, getStoreItem, getRelatedItems } from "@/lib/store";
import { PageHero, SectionHeading, GlowButton, Chip } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { Markdown } from "@/lib/markdown";
import { site } from "@/lib/site";
import { StoreProductJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBar, TrustStrip } from "@/components/Conversion";
import { products } from "@/lib/products";
import { shorten } from "@/lib/seo";

export function generateStaticParams() {
  return storeItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/store/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getStoreItem(slug);
  if (!item) return {};
  return {
    alternates: { canonical: `/store/${item.slug}` },
    // Several parts share a name with the catalogue machine they belong to.
    // Both pages are legitimate — one describes the unit, one sells it — but an
    // identical title makes them compete for the same query.
    title: shorten(
      products.some((p) => p.title.toLowerCase() === item.name.toLowerCase())
        ? `${item.name} — Order Online`
        : item.name,
      43
    ),
    description: item.description?.slice(0, 160) ?? `${item.name} — genuine PROMATION replacement part.`,
  };
}

export default async function StoreItemPage({
  params,
}: PageProps<"/store/[slug]">) {
  const { slug } = await params;
  const item = getStoreItem(slug);
  if (!item) notFound();

  const related = getRelatedItems(item);
  const orderSubject = encodeURIComponent(`Order: ${item.name}`);
  const orderBody = encodeURIComponent(
    `Hello PROMATION USA,\n\nI'd like to order the following part:\n\n  Part: ${item.name}${item.sku ? `\n  SKU: ${item.sku}` : ""}${item.price ? `\n  Listed price: ${item.price}` : ""}\n  Quantity: \n\nShipping address:\n\n`
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Store", href: "/store" },
          { name: item.name, href: `/store/${item.slug}` },
        ]}
      />
      <StoreProductJsonLd
        name={item.name}
        description={item.description?.slice(0, 300)}
        url={`/store/${item.slug}`}
        image={item.images?.[0]?.src}
        sku={item.sku}
        price={item.price}
        variants={item.variants}
      />
      <PageHero
        eyebrow="Parts Depot"
        title={item.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Store", href: "/store" },
          { label: item.name },
        ]}
      />
      <CtaBar
        label="Need help identifying a part?"
        primary={{ label: "Ask an engineer", href: "/contact" }}
        secondary={{ label: "All parts", href: "/store" }}
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* image */}
        <Reveal>
          <div className="glass clip-corner relative aspect-square w-full overflow-hidden bg-white">
            {item.images?.[0]?.src ? (
              <Image
                src={item.images[0].src}
                alt={item.images[0].alt ?? item.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Image coming soon
              </div>
            )}
          </div>
        </Reveal>

        {/* details */}
        <div>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              {(item.categories ?? []).map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
              {item.sku && <Chip>SKU {item.sku}</Chip>}
            </div>

            <p className="mt-6 font-display text-4xl font-bold text-blue-600">
              {item.price ?? "Call for pricing"}
            </p>

            {item.variants && item.variants.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
                  {"// Options"} — {item.variants.length} available
                </h2>
                <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
                  {item.variants.map((v) => (
                    <li
                      key={v.sku ?? v.name}
                      className="flex items-center justify-between gap-3 border border-line bg-surface-light/40 px-4 py-2.5 text-sm"
                    >
                      <span className="text-foreground/85">
                        {v.name}
                        {v.sku && (
                          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                            {v.sku}
                          </span>
                        )}
                      </span>
                      {v.price && (
                        <span className="shrink-0 font-mono font-semibold text-blue-600">
                          {v.price}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.description && (
              <div className="prose-future mt-8 max-w-none">
                <Markdown text={item.description} />
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4">
              <GlowButton
                cta="store-order"
                href={`mailto:${site.email}?subject=${orderSubject}&body=${orderBody}`}
              >
                Order This Part
              </GlowButton>
              <p className="text-sm text-muted">
                Orders are confirmed same business day. Prefer the phone? Call{" "}
                <a
                  href={`tel:+1${site.phone.replace(/\./g, "")}`}
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  {site.phone}
                </a>{" "}
                — Mon–Fri, 8AM–5PM CST.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                100% authentic OEM parts · Fast shipping · Satisfaction
                guaranteed
              </p>
              <TrustStrip className="mt-2 border-t border-line pt-5" />
            </div>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Also in the Depot" title="Related parts" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/store/${p.slug}`}
                  className="glass clip-corner group flex h-full flex-col gap-2.5 p-5 transition-colors hover:border-blue-400/40"
                >
                  <h3 className="font-display text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                    {p.name}
                  </h3>
                  <span className="mt-auto font-mono text-base font-bold text-blue-600">
                    {p.price ?? "Call for price"}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
