import type { MetadataRoute } from "next";

/**
 * All crawlers allowed, including AI crawlers (GPTBot, ClaudeBot, CCBot,
 * PerplexityBot, Google-Extended) — being citable in AI answers is a stated
 * goal of the content strategy, and several competitors block these agents.
 *
 * Thin archive listings are kept out of the index via page-level noindex
 * rather than disallowed here, so crawlers can still follow their links.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.promationusa.com/sitemap.xml",
    host: "https://www.promationusa.com",
  };
}
