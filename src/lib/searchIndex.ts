import { products, categories, productHref, categoryHref } from "@/lib/products";
import { storeItems } from "@/lib/store";
import { articles } from "@/lib/news";

/**
 * A flat, pre-built index shipped with the page.
 *
 * At roughly 250 entries the whole thing is smaller than a single product
 * photograph, so there is nothing to gain from a search API — and a lot to
 * lose, since a client-side index keeps search working with no runtime
 * dependency and no query latency.
 *
 * `haystack` is lowercased once at build time; matching at runtime is then a
 * plain substring test per token.
 */

export type SearchKind = "model" | "category" | "part" | "article" | "page";

export type SearchEntry = {
  title: string;
  href: string;
  kind: SearchKind;
  context: string;
  /** Model numbers and other exact tokens worth ranking first. */
  code?: string;
  haystack: string;
};

const STATIC_PAGES: { title: string; href: string; context: string }[] = [
  { title: "Request a quote", href: "/contact", context: "Talk to an applications engineer" },
  { title: "Send us your board", href: "/pcb-trial", context: "Free proof of concept on your part" },
  { title: "Book a demo", href: "/book-a-demo", context: "Live video session or visit the lab" },
  { title: "Why PROMATION", href: "/why-promation", context: "Official North American source" },
  { title: "About PROMATION USA", href: "/what-we-do", context: "Company" },
  { title: "Parts & consumables store", href: "/store", context: "Order replacement parts" },
  { title: "Press releases", href: "/news", context: "Company news" },
  { title: "Careers", href: "/careers", context: "Open positions" },
  { title: "Partners", href: "/partners", context: "Alliance network" },
];

/** Model numbers hidden inside a title, e.g. "QUICK 6101A1 Fume Extraction". */
function codeOf(title: string): string | undefined {
  const m = title.match(/\b([A-Z]{0,3}\d{3,5}[A-Z0-9-]*)\b/);
  return m ? m[1] : undefined;
}

export const searchIndex: SearchEntry[] = [
  ...categories
    .filter((c) => c.key !== "robotics-division")
    .map((c) => ({
      title: c.label,
      href: categoryHref(c),
      kind: "category" as const,
      context: c.blurb,
      haystack: `${c.label} ${c.blurb}`.toLowerCase(),
    })),

  ...products
    .filter((p) => !categories.some((c) => c.rootSlug === p.slug))
    .map((p) => {
      const cat = categories.find((c) => c.key === p.category);
      const specs = Object.entries(p.specs ?? {})
        .filter(([, v]) => typeof v === "string" || typeof v === "number")
        .map(([k, v]) => `${k} ${v}`)
        .join(" ");
      return {
        title: p.title,
        href: productHref(p),
        kind: "model" as const,
        context: p.tagline ?? cat?.label ?? "Product",
        code: codeOf(p.title),
        haystack: `${p.title} ${p.tagline ?? ""} ${cat?.label ?? ""} ${(p.models ?? []).join(" ")} ${specs}`.toLowerCase(),
      };
    }),

  ...storeItems.map((s) => ({
    title: s.name,
    href: `/store/${s.slug}`,
    kind: "part" as const,
    context: s.sku ? `SKU ${s.sku}` : "Parts & consumables",
    code: s.sku ?? codeOf(s.name),
    haystack: `${s.name} ${s.sku ?? ""} ${s.description ?? ""}`.toLowerCase(),
  })),

  ...articles.map((a) => ({
    title: a.title,
    href: `/news/${a.path}`,
    kind: "article" as const,
    context: a.date,
    haystack: `${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLowerCase(),
  })),

  ...STATIC_PAGES.map((p) => ({
    ...p,
    kind: "page" as const,
    haystack: `${p.title} ${p.context}`.toLowerCase(),
  })),
];

/**
 * Rank matches. An exact model-number hit outranks everything, because
 * model-number search is the demand this catalogue already wins.
 */
export function search(query: string, limit = 40): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of searchIndex) {
    let score = 0;
    for (const t of tokens) {
      if (!entry.haystack.includes(t)) {
        score = -1;
        break;
      }
      if (entry.code && entry.code.toLowerCase() === t) score += 100;
      else if (entry.title.toLowerCase().includes(t)) score += 20;
      else score += 5;
    }
    if (score < 0) continue;
    if (entry.title.toLowerCase() === q) score += 200;
    if (entry.kind === "model") score += 8;
    if (entry.kind === "category") score += 6;
    scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((s) => s.entry);
}
