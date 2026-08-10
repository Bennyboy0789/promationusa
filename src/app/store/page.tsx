import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { StoreCatalog } from "@/components/StoreCatalog";
import { storeItems, storeCategories } from "@/lib/store";

export const metadata: Metadata = {
  title: "Store — Order Online Today",
  description:
    "Order 100% authentic OEM PROMATION replacement parts — solder tips, conveyor belts, fume extraction, nitrogen kits and more.",
};

const promises = [
  "On-the-fly order processing — satisfaction guaranteed",
  "100% authentic OEM replacement parts",
  "Genuine soldering products and replacement parts",
  "Easy ordering and fast shipping",
];

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Parts Depot"
        title="Order Online Today"
        intro="Ordering your PROMATION USA replacement parts has never been easier — the full parts catalog, right here."
        crumbs={[{ label: "Home", href: "/" }, { label: "Store" }]}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Promises */}
        <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <RevealItem key={p} className="glass clip-corner flex items-start gap-3 p-5">
              <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rotate-45 bg-emerald-400" />
              <span className="text-sm leading-relaxed text-foreground/85">{p}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Catalog */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Full Catalog"
            title="Every part, in one depot"
            intro="Filter by category, open a part for details and options, and order in one step."
          />
          <Reveal delay={0.1}>
            <div className="mt-10">
              <StoreCatalog items={storeItems} categories={storeCategories} />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
