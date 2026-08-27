import Link from "next/link";
import type { Metadata } from "next";
import { PageHero, SectionHeading, Chip } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { events } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/events" },
  robots: { index: false, follow: true },
  title: "Events",
  description:
    "PROMATION USA trade shows, expos and open houses — SMTA, IPC APEX, Automate, Productronica and technology demo days.",
};

export default function EventsPage() {
  const years = [...new Set(events.map((e) => e.year))].sort((a, b) => b - a);

  return (
    <>
      <PageHero
        eyebrow="Mission Log"
        title="Events"
        intro="Trade shows, expos and open houses — where PROMATION USA demos the platform live. Watch this space for the next scheduled appearance."
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {years.map((year) => (
          <section key={year} className="mb-16">
            <SectionHeading eyebrow="Archive" title={String(year)} decode />
            <div className="relative mt-10 space-y-6 border-l border-line pl-8">
              {events
                .filter((e) => e.year === year)
                .map((e, i) => (
                  <Reveal key={e.href} delay={i * 0.05}>
                    <Link href={e.href} className="group relative block">
                      <span
                        aria-hidden
                        className="absolute -left-[37px] top-6 inline-block h-2 w-2 rotate-45 bg-blue-400 transition-transform duration-300 group-hover:scale-150"
                      />
                      <article className="glass clip-corner p-6 transition-colors group-hover:border-blue-400/40">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="font-display text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-500">
                            {e.title}
                          </h3>
                          <Chip>{e.dates}</Chip>
                        </div>
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                          {e.location}
                        </p>
                        {e.description && (
                          <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-2">
                            {e.description}
                          </p>
                        )}
                      </article>
                    </Link>
                  </Reveal>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
