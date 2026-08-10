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

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
