import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { articles } from "@/lib/news";
import { storeItems } from "@/lib/store";
import { RETIRED_SLUGS } from "@/lib/redirects";

const BASE = "https://www.promationusa.com";

/**
 * Sitemap excludes, by audit decision (see audit/prebuild/content-inventory.csv):
 *  - /news/tag/*  — 101 thin archive pages, 29% of the old sitemap. Also noindexed.
 *  - /events/*    — stale 2017–2023 event pages, marked KILL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/products",
    "/why-promation",
    "/pcb-trial",
    "/what-we-do",
    "/partners",
    "/news",
    "/careers",
    "/virtual-training-gallery",
    "/contact",
    "/store",
  ];

  return [
    ...staticPaths.map((p) => ({ url: `${BASE}${p}` })),
    ...products
      .filter((p) => !RETIRED_SLUGS.has(p.slug))
      .map((p) => ({ url: `${BASE}/${p.slug}` })),
    ...articles.map((a) => ({ url: `${BASE}/news/${a.path}` })),
    ...storeItems.map((p) => ({ url: `${BASE}/store/${p.slug}` })),
  ];
}
