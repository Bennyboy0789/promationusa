import Link from "next/link";
import type { Metadata } from "next";
import { guides, GUIDE_KIND_LABEL, type Guide } from "@/lib/guides";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { TiltCard } from "@/components/fx/TiltCard";
import { CtaBar, RequestQuoteBlock } from "@/components/Conversion";

export const metadata: Metadata = {
  alternates: { canonical: "/guides" },
  title: "Buyer's Guides & Cost Guides",
  description:
    "Costs, comparisons and specification guidance for robotic soldering, dispensing, screw driving, PCB handling and laser marking.",
};

const ORDER: Guide["kind"][] = ["cost", "buyers", "decision", "technical"];

const BLURB: Record<Guide["kind"], string> = {
  cost: "What actually drives the price, and what the cost classes are. No manufacturer publishes this; a distributor can.",
  buyers: "How to specify each machine type — the questions to ask before you shortlist anything.",
  decision: "Straight comparisons where the answer genuinely depends on your process.",
  technical: "The process detail behind the purchase.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Buyer's guides and cost guides"
        intro="Written to answer the questions people actually search for — starting with the ones nobody in this market answers."
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
      />

      <CtaBar
        label="Want it answered for your part?"
        primary={{ label: "Ask an engineer", href: "/contact" }}
        secondary={{ label: "Send us your board", href: "/pcb-trial" }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
            Most equipment sites answer &ldquo;what does it do&rdquo; and stop
            short of &ldquo;what does it cost&rdquo; or &ldquo;is it right for
            us&rdquo;. These guides take the second set. Where a number depends
            on your configuration we say so rather than inventing a figure —
            and we will send the range for a build that suits your part.
          </p>
        </Reveal>

        {ORDER.map((kind) => {
          const items = guides.filter((g) => g.kind === kind);
          if (items.length === 0) return null;
          return (
            <section key={kind} className="mt-16">
              <SectionHeading
                eyebrow={`${items.length} ${items.length === 1 ? "guide" : "guides"}`}
                title={GUIDE_KIND_LABEL[kind] + "s"}
                intro={BLURB[kind]}
              />
              <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((g) => (
                  <RevealItem key={g.slug} className="h-full">
                    <TiltCard className="group relative h-full" maxTilt={4}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="glass clip-corner flex h-full flex-col gap-3 p-6 transition-colors hover:border-blue-400/40"
                      >
                        <h3 className="font-display text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                          {g.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted line-clamp-3">
                          {g.description}
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
          );
        })}
      </div>

      <div className="pb-20">
        <RequestQuoteBlock
          heading="Still deciding?"
          blurb="Tell us the process and the part. We will tell you which machine class fits — including when the honest answer is that automation is not worth it yet."
          secondary={{ label: "Book a demo", href: "/book-a-demo" }}
        />
      </div>
    </>
  );
}
