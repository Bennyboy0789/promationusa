import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  products,
  getProduct,
  getCategoryMeta,
  getProductsInCategory,
  getRelated,
  heroImage,
  specLabel,
  type ProductLink,
} from "@/lib/products";
import { PageHero, SectionHeading, Chip } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { Markdown } from "@/lib/markdown";
import { site } from "@/lib/site";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { CtaBar, RequestQuoteBlock } from "@/components/Conversion";
import { QuickRfq } from "@/components/QuickRfq";
import { ProductGallery } from "@/components/ProductGallery";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: metaDescription(product),
  };
}

/**
 * Search engines truncate around 160 characters, and a 29-character stub wastes
 * the slot. Build up from the tagline, then the body copy, then the category,
 * and trim on a word boundary.
 */
function metaDescription(product: {
  title: string;
  tagline?: string | null;
  description?: string | null;
  category?: string | null;
}): string {
  const cat = getCategoryMeta(product.category ?? "")?.label;
  const body = (product.description ?? "")
    .replace(/[#*_>`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const parts = [
    product.tagline?.trim(),
    body,
    cat ? `${cat} from PROMATION USA — in US stock, supported by IPC-certified engineers.` : null,
  ].filter(Boolean) as string[];

  let out = "";
  for (const part of parts) {
    if (out.length >= 140) break;
    out = out ? `${out} ${part}` : part;
  }
  if (!out) return site.description;
  if (out.length <= 160) return out;
  const cut = out.slice(0, 157);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

function linkHref(l: ProductLink): string {
  const raw = l.url ?? l.href ?? "#";
  return raw.replace(/^https?:\/\/(www\.)?promationusa\.com/, "") || "/";
}

function linkTitle(l: ProductLink): string {
  // prefer the linked product's canonical catalog title over the
  // (sometimes vague) anchor text captured from the old site
  const target = getProduct(linkHref(l).replace(/^\//, ""));
  return target?.title ?? l.title ?? l.text ?? l.label ?? "View product";
}

export default async function ProductPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cat = getCategoryMeta(product.category);
  const specs = Object.entries(product.specs ?? {}).filter(
    ([, v]) => typeof v === "string" || typeof v === "number"
  ) as [string, string | number][];
  const related = getRelated(product);
  const rawLinks: ProductLink[] = [
    ...(product.productLinks ?? []),
    ...((product.subProducts ?? []) as ProductLink[]),
  ].filter((l) => typeof l === "object" && l && (l.url || l.href));

  // Category landing pages always list every product in their division,
  // even when the crawled page carried no explicit links.
  if (cat && product.slug === cat.rootSlug) {
    for (const sibling of getProductsInCategory(cat.key)) {
      rawLinks.push({ title: sibling.title, url: `/${sibling.slug}` });
    }
  }

  // Drop self-links and duplicates (the old site had alias pages with
  // identical titles); first occurrence wins.
  const seenTargets = new Set([product.slug]);
  const seenTitles = new Set<string>();
  const links = rawLinks.filter((l) => {
    const target = linkHref(l).replace(/^\//, "");
    const name = linkTitle(l).toLowerCase();
    if (seenTargets.has(target) || seenTitles.has(name)) return false;
    seenTargets.add(target);
    seenTitles.add(name);
    return true;
  });
  const models = (product.models ?? []).filter(
    (m): m is string => typeof m === "string"
  );

  const isCategoryRoot = cat?.rootSlug === product.slug;
  const images = product.images ?? [];
  const hero = heroImage(product);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          ...(cat && !isCategoryRoot
            ? [{ name: cat.label, href: `/${cat.rootSlug}` }]
            : []),
          { name: product.title, href: `/${product.slug}` },
        ]}
      />
      {!isCategoryRoot && (
        <ProductJsonLd
          name={product.title}
          description={product.tagline ?? undefined}
          url={`/${product.slug}`}
          image={hero?.src}
          specs={product.specs as Record<string, string> | undefined}
        />
      )}
      <PageHero
        eyebrow={cat?.label ?? "Product"}
        title={product.title}
        intro={product.tagline}
        crumbs={[
          { label: "Products", href: "/products" },
          ...(cat && cat.rootSlug !== product.slug
            ? [{ label: cat.label, href: `/${cat.rootSlug}` }]
            : []),
          { label: product.title },
        ]}
      />

      <CtaBar
        label={`Considering the ${product.title}?`}
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "Send us your board", href: "/pcb-trial" }}
      />

      <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="min-w-0">
          {images.length > 0 && (
            <Reveal>
              <div className="mb-12">
                <ProductGallery images={images} alt={product.title} />
              </div>
            </Reveal>
          )}

          {product.description && (
            <Reveal>
              <div className="prose-future max-w-none">
                <Markdown text={product.description} />
              </div>
            </Reveal>
          )}

          {product.features && product.features.length > 0 && (
            <div className="mt-14">
              <SectionHeading eyebrow="Capabilities" title="Features & options" />
              <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2">
                {product.features.map((f, i) => (
                  <RevealItem
                    key={i}
                    className="glass clip-corner flex items-start gap-3 p-4"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-blue-400"
                    />
                    <span className="text-sm leading-relaxed text-foreground/85">
                      {f}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}

          {links.length > 0 && (
            <div className="mt-14">
              <SectionHeading eyebrow="Explore" title="In this product line" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {links.map((l, i) => (
                  <Reveal key={i} delay={(i % 2) * 0.06}>
                    <Link
                      href={linkHref(l)}
                      className="glass clip-corner group flex items-center justify-between gap-4 p-5 transition-colors hover:border-blue-400/40"
                    >
                      <span className="font-display text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-500">
                        {linkTitle(l)}
                      </span>
                      <span
                        aria-hidden
                        className="font-mono text-blue-600/60 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {specs.length > 0 && (
            <Reveal direction="left">
              <div className="border-beam clip-corner p-6">
                <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
                  {"// Technical Specs"}
                </h2>
                <dl className="space-y-3">
                  {specs.map(([k, v]) => (
                    <div key={k} className="border-b border-line pb-3 last:border-0">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                        {specLabel(k)}
                      </dt>
                      <dd className="mt-1 text-sm text-foreground/90">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          )}

          {models.length > 0 && (
            <Reveal direction="left" delay={0.08}>
              <div className="glass clip-corner p-6">
                <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
                  {"// Models"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {models.map((m) => (
                    <Chip key={m}>{m}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* The three-field RFQ rather than a button: same slot, but it starts
              the conversation instead of asking for another click first. */}
          <Reveal direction="left" delay={0.12}>
            <div className="space-y-3">
              <QuickRfq
                compact
                heading={`Ask about the ${product.title}`}
                blurb="Three fields. An applications engineer replies within one business day."
                source={`/${product.slug}`}
              />
              <a
                href={`tel:+1${site.phone.replace(/\./g, "")}`}
                className="block text-center font-mono text-xs uppercase tracking-[0.2em] text-blue-600 transition-colors hover:text-slate-900"
              >
                Or call {site.phone}
              </a>
            </div>
          </Reveal>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Related Systems" title={`More ${cat?.label ?? "products"}`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06}>
                <TiltCard className="group relative h-full">
                  <Link
                    href={`/${r.slug}`}
                    className="glass clip-corner flex h-full flex-col gap-3 p-6 transition-colors hover:border-blue-400/40"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600/60">
                      {cat?.label}
                    </span>
                    <h3 className="font-display text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                      {r.title}
                    </h3>
                    {r.tagline && (
                      <p className="text-xs leading-relaxed text-muted line-clamp-2">
                        {r.tagline}
                      </p>
                    )}
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="pb-20">
        <RequestQuoteBlock
          heading={`Request a quote for the ${product.title}`}
          secondary={{ label: "Send us your board", href: "/pcb-trial" }}
        />
      </div>
    </>
  );
}
