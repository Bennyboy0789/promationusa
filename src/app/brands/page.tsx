import Link from "next/link";
import type { Metadata } from "next";
import { brands, brandProducts } from "@/lib/brands";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { CtaBar, RequestQuoteBlock } from "@/components/Conversion";

export const metadata: Metadata = {
  alternates: { canonical: "/brands" },
  title: "Brands We Source",
  description:
    "The lines PROMATION USA is the named North American source for — QUICK, PANDA Robotics, TechMan, SEAMARK and OMRON.",
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Line Card"
        title="Brands we source"
        intro="Five manufacturers, one supplier. Held in US stock, configured here, supported by the people who set them up."
        crumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />

      <CtaBar
        label="Know the brand you need?"
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "Browse the catalog", href: "/products" }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
            Buying an imported machine direct means an ocean between you and
            support. Every line below is held in US stock, configured and tested
            in Kenosha before it ships, and supported afterwards by the same
            IPC-certified engineers who set it up.
          </p>
        </Reveal>

        <div className="mt-14">
          <SectionHeading eyebrow="The line card" title="Five manufacturers" />
          <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2">
            {brands.map((b) => {
              const count = brandProducts(b).length;
              return (
                <RevealItem key={b.slug} className="h-full">
                  <TiltCard className="group relative h-full" maxTilt={4}>
                    <Link
                      href={`/brands/${b.slug}`}
                      className="glass clip-corner flex h-full flex-col gap-3 p-7 transition-colors hover:border-blue-400/40"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600">
                        {b.relationship}
                      </span>
                      <h2 className="font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-500">
                        {b.name}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted line-clamp-4">
                        {b.summary}
                      </p>
                      <span className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {count > 0
                          ? `${count} model${count === 1 ? "" : "s"} in the catalogue`
                          : "Integrated solutions"}
                      </span>
                    </Link>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Not sure which line fits?"
          blurb="Tell us the process you are automating and we will tell you which of these makes sense for it — including when the answer is none of them."
          secondary={{ label: "Send us your board", href: "/pcb-trial" }}
        />
      </div>
    </>
  );
}
