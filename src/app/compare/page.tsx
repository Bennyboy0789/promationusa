import Link from "next/link";
import type { Metadata } from "next";
import { comparisons } from "@/lib/comparisons";
import { categories } from "@/lib/products";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { CtaBar, RequestQuoteBlock } from "@/components/Conversion";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Compare & Alternatives",
  description:
    "Straight comparisons between the equipment we sell and the alternatives — including where the alternative is the better choice.",
};

export default function ComparePage() {
  const byCategory = categories
    .map((c) => ({ cat: c, items: comparisons.filter((x) => x.category === c.key) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Comparisons"
        title="Compare and alternatives"
        intro="Nobody else in this market will name a competitor. These pages do — fairly, including where the other option is the better buy."
        crumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
      />

      <CtaBar
        label="Want it settled on your part?"
        primary={{ label: "Send us your board", href: "/pcb-trial" }}
        secondary={{ label: "Request a quote", href: "/contact" }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
            An honest comparison is more useful than a sales sheet, and it is
            easier to trust. Each page below sets out what the alternative is
            genuinely good at, where we think we are the better fit, and who
            should pick which. We do not reproduce other manufacturers&rsquo;
            specifications, because we have not verified them — for that, ask
            them, then send us the part and let the result decide.
          </p>
        </Reveal>

        {byCategory.map(({ cat, items }) => (
          <section key={cat.key} className="mt-16">
            <SectionHeading
              eyebrow={`${items.length} comparison${items.length === 1 ? "" : "s"}`}
              title={cat.label}
              intro={cat.blurb}
            />
            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <RevealItem key={c.slug} className="h-full">
                  <TiltCard className="group relative h-full" maxTilt={4}>
                    <Link
                      href={`/compare/${c.slug}`}
                      className="glass clip-corner flex h-full flex-col gap-3 p-6 transition-colors hover:border-blue-400/40"
                    >
                      <h3 className="font-display text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                        {c.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted line-clamp-3">
                        {c.description}
                      </p>
                      <span
                        aria-hidden
                        className="mt-auto font-mono text-blue-600 transition-all duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>
        ))}
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Comparing something not listed here?"
          blurb="Tell us what else you are looking at. We will give you a straight read on it, including when the honest answer is that the other machine suits you better."
          secondary={{ label: "Read the guides", href: "/guides" }}
        />
      </div>
    </>
  );
}
