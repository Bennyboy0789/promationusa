import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { shorten } from "@/lib/seo";
import { articles, getArticleByPath, getAllTags, formatDate, type Article, foldTags } from "@/lib/news";
import { PageHero, SectionHeading, GlowButton, Chip } from "@/components/ui";
import { Reveal } from "@/components/fx/Reveal";
import { Markdown } from "@/lib/markdown";
import { NewsArticleJsonLd, VideoObjectJsonLd } from "@/components/JsonLd";
import { getVideoMeta } from "@/lib/videos";

/**
 * Catch-all for the original news URL space:
 *   /news/2025/11/11/some-article   → article (dated path)
 *   /news/panda-soldering-systems   → article (undated path)
 *   /news/tag/<tag>                 → tag archive
 *   /news/2019                      → year archive
 */

export function generateStaticParams() {
  const params = articles.map((a) => ({ slug: a.path.split("/") }));
  for (const { tag } of getAllTags()) params.push({ slug: ["tag", tag] });
  const years = [...new Set(articles.map((a) => a.date.slice(0, 4)))];
  for (const y of years) params.push({ slug: [y] });
  return params;
}

function resolve(slugParts: string[]):
  | { kind: "article"; article: Article }
  | { kind: "tag"; tag: string; matches: Article[] }
  | { kind: "year"; year: string; matches: Article[] }
  | null {
  const path = slugParts.map(decodeURIComponent).join("/");
  const article = getArticleByPath(path);
  if (article) return { kind: "article", article };

  if (slugParts[0] === "tag" && slugParts.length >= 2) {
    const tag = decodeURIComponent(slugParts.slice(1).join("/")).replace(/\+/g, " ");
    const matches = articles.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
    if (matches.length > 0) return { kind: "tag", tag, matches };
  }

  if (slugParts.length === 1 && /^\d{4}$/.test(slugParts[0])) {
    const matches = articles.filter((a) => a.date.startsWith(slugParts[0]));
    if (matches.length > 0) return { kind: "year", year: slugParts[0], matches };
  }

  return null;
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const res = resolve(slug);
  if (!res) return {};
  if (res.kind === "article")
    return {
      alternates: { canonical: `/news/${res.article.path}` },
      title: { absolute: shorten(res.article.title, 60) },
      description: shorten(res.article.excerpt, 160),
    };

  // Tag and year archives stay reachable so existing inbound links don't 404,
  // but are kept out of the index — they're thin, duplicative listings.
  const archiveRobots = { index: false, follow: true };
  if (res.kind === "tag")
    return { title: `News tagged "${res.tag}"`, robots: archiveRobots };
  return { title: `News from ${res.year}`, robots: archiveRobots };
}

function ArticleGrid({ items }: { items: Article[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((a, i) => (
        <Reveal key={a.slug} delay={(i % 3) * 0.06}>
          <Link
            href={`/news/${a.path}`}
            className="glass clip-corner group flex h-full flex-col gap-3.5 p-7 transition-colors hover:border-blue-400/40"
          >
            <time className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600">
              {formatDate(a.date)}
            </time>
            <h3 className="font-display text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-500">
              {a.title}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-muted line-clamp-3">
              {a.excerpt}
            </p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export default async function NewsCatchAll({
  params,
}: PageProps<"/news/[...slug]">) {
  const { slug } = await params;
  const res = resolve(slug);
  if (!res) notFound();

  if (res.kind === "tag" || res.kind === "year") {
    const label = res.kind === "tag" ? `#${res.tag}` : res.year;
    return (
      <>
        <PageHero
          eyebrow={res.kind === "tag" ? "Tag Archive" : "Year Archive"}
          title={label}
          intro={`${res.matches.length} transmission${res.matches.length === 1 ? "" : "s"} on file.`}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "News", href: "/news" },
            { label },
          ]}
        />
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ArticleGrid items={res.matches} />
        </div>
      </>
    );
  }

  const a = res.article;
  const related = articles
    .filter((x) => x.slug !== a.slug && x.tags.some((t) => a.tags.includes(t)))
    .slice(0, 3);

  return (
    <>
      <NewsArticleJsonLd
        headline={a.title}
        description={a.excerpt}
        url={`/news/${a.path}`}
        datePublished={a.date}
        author={a.author}
      />
      <PageHero
        eyebrow={`Transmission — ${formatDate(a.date)}`}
        title={a.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: a.date.slice(0, 4) },
        ]}
      />

      <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-line pb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              By {a.author}
            </span>
            <span className="text-muted" aria-hidden>
              |
            </span>
            <time
              dateTime={a.date}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-600"
            >
              {formatDate(a.date)}
            </time>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="prose-future">
            <Markdown text={a.body} />
          </div>
        </Reveal>

        {a.videos.length > 0 && (
          <div className="mt-12 space-y-6">
            {a.videos.map((v) => {
              const id =
                v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{6,})/)?.[1];
              if (!id) return null;
              const meta = getVideoMeta(v);
              return (
                <Reveal key={v}>
                  {meta && (
                    <VideoObjectJsonLd
                      id={meta.id}
                      name={meta.name}
                      description={meta.description}
                      uploadDate={meta.uploadDate}
                      duration={meta.duration}
                      pageUrl={`/news/${a.path}`}
                    />
                  )}
                  <div className="border-beam clip-corner p-1.5">
                    <div className="clip-corner relative aspect-video overflow-hidden bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        title="Embedded video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {a.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
            {foldTags(a.tags).map((t) => (
              <Link key={t} href={`/news/tag/${encodeURIComponent(t)}`}>
                <Chip>#{t}</Chip>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10">
          <GlowButton href="/news" variant="ghost">
            Back to All News
          </GlowButton>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Related Signals" title="Keep reading" />
          <div className="mt-10">
            <ArticleGrid items={related} />
          </div>
        </section>
      )}
    </>
  );
}
