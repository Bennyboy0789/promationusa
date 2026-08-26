import Link from "next/link";
import type { Metadata } from "next";
import { categories, getProductsInCategory } from "@/lib/products";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { RequestQuoteBlock } from "@/components/Conversion";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The full PROMATION USA automation catalog — PCB handling, robotic soldering, dispensing, screw driving, laser marking, cobots, mobile robots and X-ray inspection.",
};

export default function ProductsPage() {
  const visible = categories.filter((c) => c.key !== "robotics-division");

  return (
    <>
      <PageHero
        eyebrow="Product Index"
        title="The Automation Catalog"
        intro="Every PROMATION system, organized by division — from bare-board loading to X-ray inspection."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <div className="mx-auto w-full max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {visible.map((cat, ci) => {
          const items = getProductsInCategory(cat.key);
          if (items.length === 0) return null;
          const rest = items.filter((p) => p.slug !== cat.rootSlug);
          return (
            <section key={cat.key}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading
                  eyebrow={`Division ${String(ci + 1).padStart(2, "0")} — ${items.length} ${items.length === 1 ? "entry" : "entries"}`}
                  title={cat.label}
                  intro={cat.blurb}
                />
                <Reveal delay={0.1}>
                  <Link
                    href={`/${cat.rootSlug}`}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600 transition-colors hover:text-blue-500"
                  >
                    Division Overview →
                  </Link>
                </Reveal>
              </div>
              {rest.length > 0 && (
                <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <RevealItem key={p.slug} className="h-full">
                      <TiltCard className="group relative h-full" maxTilt={5}>
                        <Link
                          href={`/${p.slug}`}
                          className="glass clip-corner flex h-full flex-col gap-2.5 p-5 transition-colors hover:border-blue-400/40"
                        >
                          <h3 className="font-display text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                            {p.title}
                          </h3>
                          {p.tagline && (
                            <p className="text-xs leading-relaxed text-muted line-clamp-2">
                              {p.tagline}
                            </p>
                          )}
                          <span
                            aria-hidden
                            className="mt-auto font-mono text-blue-600/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
                          >
                            →
                          </span>
                        </Link>
                      </TiltCard>
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </section>
          );
        })}
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Not sure which machine fits?"
          blurb="Send us your board or your process and we'll tell you which configuration suits it — and what it costs."
          secondary={{ label: "Browse parts & consumables", href: "/store" }}
        />
      </div>
    </>
  );
}
