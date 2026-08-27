import type { MetadataRoute } from "next";
import { products, categories, productHref, categoryHref } from "@/lib/products";
import { articles } from "@/lib/news";
import { storeItems } from "@/lib/store";
import { RETIRED_SLUGS } from "@/lib/redirects";

const BASE = "https://www.promationusa.com";

/**
 * Sitemap excludes, by audit decision (see audit/prebuild/content-inventory.csv):
 *  - /news/tag/*  — 101 thin archive pages, 29% of the old sitemap. Also noindexed.
 *  - /events/*    — stale 2017–2023 event pages, marked KILL. Also noindexed.
 *
 * `lastModified` is a real date where one exists — news carries its publication
 * date — and the build date everywhere else. A build date is honest for pages
 * generated from the catalogue: it is when the page as published last changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();

  const staticPaths = [
    "",
    "/products",
    "/why-promation",
    "/pcb-trial",
    "/book-a-demo",
    "/what-we-do",
    "/partners",
    "/news",
    "/careers",
    "/virtual-training-gallery",
    "/contact",
    "/store",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${BASE}${p}`,
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...categories.map((c) => ({
      url: `${BASE}${categoryHref(c)}`,
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...products
      .filter((p) => !RETIRED_SLUGS.has(p.slug))
      // Category landing pages are published as hubs above, not twice.
      .filter((p) => !categories.some((c) => c.rootSlug === p.slug))
      .map((p) => ({
        url: `${BASE}${productHref(p)}`,
        lastModified: built,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ...articles.map((a) => ({
      url: `${BASE}/news/${a.path}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...storeItems.map((p) => ({
      url: `${BASE}/store/${p.slug}`,
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
