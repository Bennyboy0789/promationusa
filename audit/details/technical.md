# Technical SEO Audit — promationusa.com (live site)
Audited: 2026-08-08/09. Platform: Squarespace 7.1.

## Overall Technical Score: 64/100

---

## 1. Crawlability — PARTIAL PASS
- `/robots.txt` (200 OK) present, standard Squarespace ruleset. AI crawler user-agents (GPTBot, ClaudeBot, Google-Extended, Amazonbot, Bytespider, CCBot, etc.) are grouped with `User-agent: *` (no blank line separates them from the `*` block per RFC grouping rules), so they inherit the same permissive rules as `Allow: /` — they are NOT blocked, which is good for AI visibility but means the owner has made no explicit AI-crawler policy decision.
- Standard disallows: `/config`, `/search`, `/account`, `/api/` (with `Allow: /api/ui-extensions/`), `/static/`, and query params (`?tag=`, `?author=`, `?format=json`, etc.).
- `Sitemap:` directive present, points to `https://www.promationusa.com/sitemap.xml`.
- Sitemap.xml: 200 OK, 348 `<url>` entries, well-formed XML with image extensions. **101 of 348 URLs (29%) are `/news/tag/*` archive pages** — a large share of crawl budget spent on low-value tag pages.
- Sitemap response carries `X-Robots-Tag: noindex` header (harmless — applies only to the XML file itself, not to indexing of listed URLs).
- No crawl traps found in faceted nav; store/product pagination not tested beyond sample.

## 2. Indexability — FAIL (Critical duplicate content cluster)
- **Confirmed duplicate content cluster**: `/tm-robot-usa`, `/tm-robots-at-a-glance`, `/techman-collaborative-robots`, `/techman-usa` all return HTTP 200 with **identical `<title>`** ("Collaborative Robots At a Glance — PROMATION USA") and **identical meta description**, each with a *self-referencing* canonical tag (no consolidation). This is 4 fully duplicate indexable pages competing for the same rankings/backlinks.
- `/techman-usa-1` correctly 302-redirects to `/tm-robots-at-a-glance`, but Squarespace's URL-slug-change redirect uses **302 (temporary)** instead of 301 — this is a platform-wide Squarespace pattern, not a one-off, so all historical slug-change redirects likely dilute link equity.
- Trailing-slash duplicate (`/what-we-do/` vs `/what-we-do`) resolves correctly via self-referencing canonical pointing to the non-trailing-slash URL — no action needed.
- `/news/tag/*` pages (101 of them): sample `/news/tag/solder` returns 200, self-referencing canonical, **empty meta description** (`content=""`), thin auto-generated tag-archive content. At this scale this is a significant thin/duplicate-content footprint that's fully indexable and in the sitemap.
- No `noindex` meta tags found on any sampled page (including thin tag pages) — nothing is being suppressed that should be.
- Messy legacy slugs confirmed live and indexed: `/quick-usa-6101a1`, `/9544cj`, `/7483kxz`, `/9264ec`, plus numerous bare part-number slugs (`/9464`, `/9334`, `/9244cj`, etc.) — not inherently harmful to SEO (Google doesn't penalize ugly URLs) but poor for CTR/brand trust in SERPs and hard to maintain.

## 3. Security — PARTIAL PASS
- HTTPS enforced site-wide; HTTP→HTTPS and non-www→www both single-hop 301 redirects (no redirect chains found across all tested variants).
- `X-Content-Type-Options: nosniff` present.
- **`Strict-Transport-Security: max-age=0`** — this actively tells browsers to stop treating the site as HSTS-enforced, effectively disabling HSTS protection against SSL-stripping/downgrade attacks. This is a Squarespace platform default and not owner-configurable, but should be flagged.
- **No Content-Security-Policy, no X-Frame-Options, no Referrer-Policy, no Permissions-Policy** headers on any tested response (homepage, sitemap). Platform limitation (Squarespace does not expose custom header injection at the edge), but leaves the site more exposed to clickjacking/XSS-adjacent risk than a hardened stack.
- No `.well-known/security.txt`.

## 4. URL Structure — PARTIAL PASS
- Clean top-level paths for core pages (`/what-we-do`, `/pcb-handling`, `/contact`, `/store`).
- Legacy/import-era slugs are messy and inconsistent: mixed patterns like `/quick-usa-6101a1`, `/9544cj`, `/7483kxz`, plus `*-copy` suffixed pages referenced by the brief (e.g., `/mobile-robot-line-unloading-copy`, `/et8484-dispensing-robot-copy`) indicating duplicated-then-abandoned Squarespace page clones — these should be audited individually and either 301-redirected/merged or deleted if truly orphaned duplicates.
- No case-sensitivity redirect: `/What-We-Do` (mixed case) returns a hard 404 instead of redirecting to canonical lowercase — minor risk if any external links/backlinks use different casing.
- Redirect chain testing (http, non-www, trailing slash) shows single-hop 301s only — good.

## 5. Mobile Optimization — FAIL (Critical)
- **No `<meta name="viewport">` tag found anywhere in the rendered HTML source**, confirmed across homepage, `/store`, `/store/conveyor-belts`, `/contact`, and re-confirmed with a mobile Safari/iPhone user-agent (result unchanged — this is server-rendered, not UA-sniffed). Absence of a viewport tag causes mobile browsers to fall back to a desktop-width virtual viewport (~980px), forcing pinch-zoom/pan and directly harming mobile usability signals and mobile-first indexing rendering. This is unusual for Squarespace 7.1 (which normally injects this tag) and should be verified/fixed immediately in Squarespace's Advanced Settings / Code Injection.

## 6. Core Web Vitals Signals (source-inspection only, not lab/field data) — NEEDS IMPROVEMENT
- Heavy HTML payloads: homepage 155KB, `/store` 169KB, **`/store/conveyor-belts` 507KB of raw HTML** — well above typical lean-page budgets, likely driven by inline component config/JSON and repeated block markup typical of Squarespace 7.1.
- 50-63 `<script>` tags per page (homepage: 59; contact: 63), including render-blocking Typekit web-font loader in `<head>` with `fetchpriority="high"` — likely LCP-delaying if the LCP element is text needing custom font.
- 8 render-blocking `<link rel="stylesheet">` tags in `<head>` before body content — CSS delivery not optimized/inlined, a common Squarespace CLS/LCP risk factor.
- No `loading="lazy"` attributes detected on any of the 8 images sampled on `/store/conveyor-belts` — all images eagerly loaded, increasing initial page weight and risking LCP competition.
- Squarespace's own polyfiller/vendor bundle architecture (multiple `common-vendors`, `commerce`, `performance` JS bundles loaded on every page regardless of whether commerce/interactive features are used) adds unnecessary JS execution weight — INP risk on lower-end mobile devices, though not independently measurable via source inspection alone.
- CLS risk: no explicit width/height attributes verified on all images (not exhaustively tested); Squarespace 7.1 generally handles image aspect-ratio boxes reasonably well via CSS, so this is lower-confidence.

## 7. Structured Data — PARTIAL PASS
- JSON-LD present on every sampled page (3 blocks: `Organization`, `WebSite`, `LocalBusiness` — standard Squarespace boilerplate).
- `/store` and `/store/conveyor-belts` (commerce pages) additionally carry `Product` and `AggregateOffer` schema — correct for e-commerce.
- **Individual equipment/product pages sampled (`/quick-usa-6101a1`, `/9544cj`, `/pcb-handling`) carry only `Organization`/`WebSite`/`LocalBusiness` — no `Product` schema**, despite being product-spec pages for physical automation equipment. This is a missed opportunity for rich results (these are catalog pages, not Squarespace "Store" commerce items, so Squarespace doesn't auto-generate Product schema for them).
- No `BreadcrumbList` structured data detected on any sampled page — missed opportunity for breadcrumb rich snippets given deep IA (products under categories under solutions).
- No FAQ, Article, or Event schema detected on `/news` or `/events` despite being clear candidates (Event schema in particular for `/events` listing individual event pages).

## 8. JavaScript Rendering — PASS
- Content is server-side rendered; product/page copy (e.g., "Fume Extraction" text on `/quick-usa-6101a1`) is present directly in the raw HTML response, not requiring JS execution to appear. Squarespace 7.1 serves fully-formed HTML; no CSR-dependency risk for crawlability.
- Numerous deferred/async component-definition scripts (`website.components.*`) load interactive widgets (search, video, forms, social links) but these are progressive enhancements layered on top of static content, not blocking indexation of primary content.

## 9. IndexNow Protocol — NOT SUPPORTED
- No IndexNow key file found at `/indexnow.txt` or common well-known paths (404). Squarespace does not natively support the IndexNow protocol (no UI/API for submitting key files or pinging api.indexnow.org), so this cannot be remediated without custom code injection workarounds, which carries limited reliability on this platform. Site relies solely on standard sitemap discovery/Search Console + Bing Webmaster Tools submission cadence.

---

## Sampled URLs Reference Table

| URL | Status | Canonical Self-Ref | Notes |
|---|---|---|---|
| `/` | 200 | Yes | Title is bare "PROMATION USA" — no keyword targeting |
| `/what-we-do` | 200 | Yes | 2 H1s |
| `/pcb-handling` | 200 | Yes | Clean |
| `/robotic-soldering-glance` | 200 | Yes | 5 H1s (heading hierarchy issue) |
| `/quick-usa-6101a1` | 200 | Yes | No Product schema |
| `/9544cj` | 200 | Yes | No Product schema |
| `/tm-robots-at-a-glance` | 200 | Yes | Duplicate cluster member |
| `/tm-robot-usa` | 200 | Yes | Duplicate cluster member |
| `/techman-collaborative-robots` | 200 | Yes | Duplicate cluster member |
| `/techman-usa` | 200 | Yes | Duplicate cluster member |
| `/techman-usa-1` | 302 | — | Redirects to `/tm-robots-at-a-glance` (should be 301) |
| `/news` | 200 | Yes | 12 H1s (listing page markup) |
| `/events` | 200 | Yes | 18 H1s (listing page markup) |
| `/contact` | 200 | Yes | Clean |
| `/store` | 200 | Yes | Product/AggregateOffer schema present |
| `/store/conveyor-belts` | 200 | Yes | 507KB HTML, heaviest page tested |
| `/sitemap.xml` | 200 | — | 348 URLs, 101 are `/news/tag/*` |
| `/robots.txt` | 200 | — | Standard, AI bots not blocked |

---

## Prioritized Issues

### Critical
1. No `<meta name="viewport">` tag anywhere on the site — breaks mobile rendering scale, harms mobile-first indexing.
2. Duplicate content cluster: 4 identical-content, identically-titled pages (`/tm-robot-usa`, `/tm-robots-at-a-glance`, `/techman-collaborative-robots`, `/techman-usa`) all self-canonicalized and indexable, splitting authority for TechMan robot keywords.

### High
3. 101 thin `/news/tag/*` archive pages (29% of sitemap) indexable with empty meta descriptions — crawl-budget dilution and thin-content risk.
4. Squarespace slug-redirects use 302 instead of 301 (confirmed on `/techman-usa-1`), leaking link equity on any historically-redirected URL sitewide.
5. `/store/conveyor-belts` and similar pages ship 500KB+ of raw HTML with 8 render-blocking stylesheets, 50+ scripts, zero lazy-loaded images, and a high-priority blocking web-font script — elevated LCP/INP risk.

### Medium
6. No `Product` schema on individual equipment spec pages (only on true Store commerce pages).
7. No `BreadcrumbList` or `Event` schema despite clear IA/content fit.
8. Homepage `<title>` is just "PROMATION USA" with no descriptive/keyword content.
9. Missing security headers (CSP, X-Frame-Options, Referrer-Policy) and HSTS effectively disabled (`max-age=0`) — Squarespace platform limitation.

### Low
10. Multiple/duplicate H1 tags on listing pages (`/news`: 12, `/events`: 18).
11. Legacy messy product slugs (`/quick-usa-6101a1`, `/9544cj`, `/7483kxz`, `*-copy` pages) — cosmetic/CTR impact only.
12. No case-insensitive URL redirect (mixed-case paths 404 instead of redirecting).
13. No IndexNow support (platform limitation, low remediation priority).

---

## Recommendations

1. **Fix viewport tag**: Contact Squarespace support / check Developer Mode & Code Injection settings to confirm why `<meta name="viewport">` is missing from template output; this may indicate a corrupted template override. Priority: immediate.
2. **Consolidate TechMan duplicate pages**: Pick one canonical URL (recommend `/techman-collaborative-robots` for keyword clarity), 301-redirect the other three, and update all internal links/nav to point only to the surviving URL.
3. **Noindex or prune `/news/tag/*` pages**: Add `noindex,follow` via Squarespace's page-level SEO settings where possible, or exclude the `/news/tag/` path pattern from the sitemap; consider consolidating tags to only the handful actually used for internal navigation.
4. **Rewrite homepage title/meta**: Replace bare "PROMATION USA" title with a descriptive, keyword-rich title (e.g., "PCB Handling, Robotic Soldering & Automation Equipment | PROMATION USA").
5. **Reduce page weight on commerce/product pages**: audit block content on `/store/conveyor-belts` for redundant markup; enable lazy-loading on below-fold images; defer non-critical scripts.
6. **Add Product and BreadcrumbList JSON-LD** via Code Injection on equipment spec pages for rich-result eligibility.
7. **Fix H1 hierarchy** on `/news` and `/events` listing templates (use H1 once for page title, H2/H3 for individual entries).
