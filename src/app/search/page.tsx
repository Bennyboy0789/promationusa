import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { SiteSearch } from "@/components/SiteSearch";
import { CtaBar } from "@/components/Conversion";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the PROMATION USA catalogue by model number, machine type, part name or SKU.",
  // A results page is thin by nature and its content is a permutation of pages
  // that already rank on their own. Keep it usable, keep it out of the index.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Find it"
        title="Search"
        intro="Model numbers, machine types, part names and SKUs — all searchable."
        crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />

      <CtaBar
        label="Cannot find what you need?"
        primary={{ label: "Ask an engineer", href: "/contact" }}
        secondary={{ label: "Browse the catalog", href: "/products" }}
      />

      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        {/* useSearchParams needs a Suspense boundary to prerender. */}
        <Suspense fallback={<div className="glass clip-corner h-40 p-7" />}>
          <SiteSearch />
        </Suspense>
      </div>
    </>
  );
}
