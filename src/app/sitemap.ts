import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { articles, getAllTags } from "@/lib/news";
import { events } from "@/lib/content";
import { storeItems } from "@/lib/store";

const BASE = "https://www.promationusa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/products",
    "/what-we-do",
    "/events",
    "/partners",
    "/news",
    "/careers",
    "/virtual-training-gallery",
    "/contact",
    "/store",
  ];

  return [
    ...staticPaths.map((p) => ({ url: `${BASE}${p}` })),
    ...products.map((p) => ({ url: `${BASE}/${p.slug}` })),
    ...articles.map((a) => ({ url: `${BASE}/news/${a.path}` })),
    ...getAllTags().map(({ tag }) => ({
      url: `${BASE}/news/tag/${encodeURIComponent(tag)}`,
    })),
    ...events.map((e) => ({ url: `${BASE}${e.href}` })),
    ...storeItems.map((p) => ({ url: `${BASE}/store/${p.slug}` })),
  ];
}
