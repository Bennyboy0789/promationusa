import newsData from "@/content/news.json";

export type Article = {
  slug: string;
  url: string;
  /** site path under /news/, e.g. "2025/11/11/slug" */
  path: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  body: string;
  videos: string[];
};

export const articles: Article[] = (newsData as Article[])
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getArticleByPath(path: string): Article | undefined {
  return articles.find((a) => a.path === path);
}

/**
 * Tags, folded by case.
 *
 * The source data carries both "PROMATION" and "promation", which produced two
 * URLs for one archive. The route resolver already matches case-insensitively,
 * so old links keep working — this just stops the tag cloud publishing both.
 * The most-used spelling wins as the display label.
 */
export function getAllTags(): { tag: string; count: number }[] {
  const groups = new Map<string, { forms: Map<string, number>; count: number }>();
  for (const a of articles) {
    for (const t of a.tags) {
      const key = t.toLowerCase();
      const g = groups.get(key) ?? { forms: new Map<string, number>(), count: 0 };
      g.forms.set(t, (g.forms.get(t) ?? 0) + 1);
      g.count++;
      groups.set(key, g);
    }
  }
  return [...groups.values()]
    .map(({ forms, count }) => ({
      tag: [...forms.entries()].sort((x, y) => y[1] - x[1])[0][0],
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Map a set of raw tags onto the canonical spelling used by {@link getAllTags},
 * so an article never links a case variant the tag cloud does not.
 */
export function foldTags(tags: string[]): string[] {
  const canonical = new Map(getAllTags().map((t) => [t.tag.toLowerCase(), t.tag]));
  const out = new Set<string>();
  for (const t of tags) out.add(canonical.get(t.toLowerCase()) ?? t);
  return [...out];
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
