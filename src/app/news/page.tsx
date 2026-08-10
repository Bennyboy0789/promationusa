import Link from "next/link";
import type { Metadata } from "next";
import { PageHero, SectionHeading, Chip } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { articles, getAllTags, formatDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "Press Releases",
  description:
    "News and press releases from PROMATION USA — product launches, awards, partnerships and innovations in electronics manufacturing automation.",
};

export default function NewsPage() {
  const [featured, ...rest] = articles;
  const topTags = getAllTags().slice(0, 14);

  return (
    <>
      <PageHero
        eyebrow="Transmission Log"
        title="Press Releases"
        intro="Product launches, awards, partnerships and innovations — the PROMATION USA news archive, 2017 to present."
        crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Featured */}
        <Reveal>
          <Link
            href={`/news/${featured.path}`}
            className="border-beam clip-corner group block p-8 sm:p-12"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-blue-600 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white clip-corner">
                Latest
              </span>
              <time className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600/70">
                {formatDate(featured.date)}
              </time>
            </div>
            <h2 className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500 sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted line-clamp-3">
              {featured.excerpt}
            </p>
            <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600">
              Read Transmission →
            </span>
          </Link>
        </Reveal>

        {/* Tag cloud */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {topTags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/news/tag/${encodeURIComponent(tag)}`}
                className="border border-line bg-surface-light/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-blue-400/50 hover:text-blue-600"
              >
                {tag} <span className="text-blue-600/60">×{count}</span>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Archive */}
        <div className="mt-16">
          <SectionHeading eyebrow="Archive" title="All transmissions" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/news/${a.path}`}
                  className="glass clip-corner group flex h-full flex-col gap-3.5 p-7 transition-colors hover:border-blue-400/40"
                >
                  <time className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600/70">
                    {formatDate(a.date)}
                  </time>
                  <h3 className="font-display text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
                    {a.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                    {a.excerpt}
                  </p>
                  {a.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {a.tags.slice(0, 3).map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
