# XML Sitemap Audit — https://www.promationusa.com

Date: 2026-08-08
Source: https://www.promationusa.com/sitemap.xml (fetched live, 200 OK, 431,207 bytes)
Platform: Squarespace auto-generated sitemap

## 1. Format Validation

| Check | Result |
|---|---|
| Valid XML declaration/namespace | PASS — `<?xml version="1.0" encoding="UTF-8"?>`, urlset with sitemap.org 0.9 namespace + image/xhtml/video extensions |
| Sitemap index vs single file | Single `<urlset>` file, NOT a sitemap index (0 `<sitemap>` entries) |
| `<loc>` count | **348 URLs** |
| File size / URL limit | 431KB, 348 URLs — well under Google's 50,000 URL / 50MB limit. No splitting needed. |
| Duplicate `<loc>` entries | 0 exact-duplicate URLs found |
| robots.txt sitemap reference | Present and correct: `Sitemap: https://www.promationusa.com/sitemap.xml` |

## 2. Deprecated / Ignored Tags

- `<priority>` present on **all 348/348** URLs (Squarespace auto-adds; Google ignores this tag entirely — info only, safe to ignore/remove if hand-editing).
- `<changefreq>` present on **all 348/348** URLs — same as above, ignored by Google since 2023.
- Neither tag causes harm, but their presence on every single URL (many `priority=0.5` "monthly" on stale 2016–2019 blog/event pages) suggests default auto-generation rather than intentional curation. No action required (Squarespace-managed, can't be edited directly).

## 3. Lastmod Accuracy

- `<lastmod>` present on 247/348 URLs (71%).
- **101/348 URLs missing `<lastmod>` entirely — 100% of these are `/news/tag/*` pages.**
- Of the 247 with lastmod, 62 unique dates are used, ranging 2016-08-12 → 2026-06-11 — dates appear to be genuine per-page timestamps (not a single fake/identical date across the whole file), which is good and passes the "all identical lastmod" check.

## 4. Low-Value URLs Polluting the Sitemap

- **`/news/tag/*` archive pages: 101 of 348 URLs (29% of the entire sitemap).** These are Squarespace auto-generated tag/category archive pages (e.g. `/news/tag/Best+Soldering+Station`, `/news/tag/promation`, `/news/tag/solder`, `/news/tag/kester+solder`, `/news/tag/wisconsin+manufacturing`). They:
  - Have no `<lastmod>` (see above)
  - Are typically thin, auto-generated listing pages with duplicate/overlapping content across tags
  - Dilute crawl budget and sitemap signal for the ~247 real content/product pages
  - robots.txt disallows `?tag=*` query-string tag filters but does **not** disallow the `/news/tag/` path itself, so these pages remain fully crawlable/indexable and are actively submitted via sitemap.
  - **Recommendation:** exclude `/news/tag/*` from the sitemap (Squarespace doesn't offer native sitemap exclusion, so consider `noindex` via page settings on tag pages, or a sitewide code-injection rule, or reducing tag proliferation in the blog editor).

## 5. Redirects / Non-200 URLs (spot-check of 15 URLs)

| URL | Result |
|---|---|
| `/` | 200 |
| `/careers` | 200 |
| `/contact` | 200 |
| `/store` | 200 |
| `/store/quick-885-hot-air-gun` | 200 |
| `/tm12` | 200 |
| `/9544cj` | 200 |
| `/et8383-dispensing-robot` | 200 |
| `/techman-usa-1` | **302 → redirects to `/tm-robots-at-a-glance`** |
| `/techman-usa` | 200 (dupe title, see §6) |
| `/new-page-1` | 200 (unoptimized leftover slug, see §6) |
| `/f-series-1` | 200 |
| `/mobile-robot-solutions-1` | 200 |
| `/news/tag/Best+Soldering+Station` | 200 |
| `/xray-at-a-glance` | 200 |

**Result: 14/15 = 200 OK, 1/15 = 302 redirect included in sitemap.**
`/techman-usa-1` is a stale/duplicate-slug page (Squarespace auto `-1` suffix from a page rename/duplication) that now 302-redirects to `/tm-robots-at-a-glance`. Per best practice, redirected URLs should be removed from the sitemap or updated to the final destination — currently it's neither.

## 6. Duplicate / Alias URL Cluster (Content Duplication Risk)

Found a 4-URL cluster referring to the same "Collaborative Robots" landing content, all live and all in the sitemap (except the redirect):

- `/tm-robots-at-a-glance` — 200, title: "Collaborative Robots At a Glance"
- `/techman-collaborative-robots` — 200, title: "Collaborative Robots At a Glance" (**identical title/duplicate content risk**)
- `/techman-usa` — 200, title: "Collaborative Robots At a Glance" (**identical title/duplicate content risk**)
- `/techman-usa-1` — 302 → redirects to `/tm-robots-at-a-glance` (leftover alias, should be dropped from sitemap)

Three separately indexable, sitemap-listed URLs share an identical `<title>`, which is a classic canonicalization/duplicate-content signal Google may fold together or choose the "wrong" canonical for. Recommend picking one canonical URL (likely `/tm-robots-at-a-glance`, since it's the one the dead `-1` alias already redirects to) and either 301-redirecting or canonical-tagging the other two, then removing the non-canonical ones from the sitemap.

Other `-N` suffix URLs in the sitemap were checked and are **legitimate distinct product variants**, not duplicates (e.g. `/quick-usa-442-2` = "QUICK 442-2 Anti-Static Ionizing Fan" vs `/quick-usa-442-3` = "QUICK 442-3 Anti-Static Ionizing Fan" — different SKUs, not a duplication problem).

`/new-page-1` is in the sitemap and returns 200, but its actual content title is "Book Your Service" — a live, legitimate page sitting on a leftover Squarespace default slug (`new-page-1`). Not a duplicate/error, but poor URL hygiene worth a slug cleanup + 301 to a descriptive URL (e.g. `/book-service`).

## 7. Missing Pages (crawl/nav vs sitemap coverage)

The task brief listed a set of "known missing" pages based on presumed stale site knowledge. Live verification shows the sitemap has since caught up — **all of the following are present and return 200 in the current sitemap**: `/careers`, `/contact`, `/virtual-training-gallery`, `/store` + its ~21 `/store/*` product pages, `/new-products`, `/robotics-division`, `/tm-robots-at-a-glance`, `/laser-marking-at-a-glance`, `/auto-dispensing-at-a-glance`, `/auto-screw-driving-at-a-glance`, `/xray-at-a-glance`, `/tm12`, `/9544cj`, `/et8383-dispensing-robot`. No action needed on these.

However, cross-referencing the homepage main navigation (`/`, `/products`, `/about`, `/what-we-do`, `/events`, `/partners`, `/news`, `/careers`, `/virtual-training-gallery`, `/contact`, `/store`) against the sitemap found one real gap:

- **`/about` — present in the primary site navigation but NOT in the sitemap.** All other primary nav links (`/products`, `/what-we-do`, `/events`, `/partners`, `/news`, `/careers`, `/virtual-training-gallery`, `/contact`, `/store`) are present. `/about` should be added, or if it 404s/redirects, the nav link should be fixed.

(Note: this check was limited to homepage nav links due to time constraints; a full crawl-vs-sitemap diff of all internal links was not performed.)

## 8. Extra / Low-Quality Pages in Sitemap

- 101 `/news/tag/*` pages (see §4) — primary sitemap bloat issue.
- `/techman-usa-1` — redirected URL, should be removed (see §5).
- Duplicate-content trio in §6 — 2 of the 3 should be removed once canonicalized.

## 9. Location Page Quality Gate

- No location/city-pattern URLs (`/location-*`, `/[city]-robot*`, "near-me", etc.) were found anywhere in the sitemap.
- **Quality gate: NOT TRIGGERED.** 0 location pages present — no warning or hard-stop applies. No doorway-page risk from geo-scaled pages on this site currently.

## 10. Summary Table

| Check | Severity | Status |
|---|---|---|
| Invalid XML | Critical | PASS |
| >50,000 URLs | Critical | PASS (348 URLs) |
| Non-200 URLs | High | 1 found (`/techman-usa-1`, 302) of 15 spot-checked |
| Noindexed URLs in sitemap | High | Not directly testable without page-source crawl of all 348; not observed in spot-check |
| Redirected URLs | Medium | 1 confirmed (`/techman-usa-1` → `/tm-robots-at-a-glance`) |
| All identical lastmod | Low | PASS (62 distinct real dates) |
| Missing lastmod | Low | 101/348 (29%) missing, all `/news/tag/*` |
| priority/changefreq | Info | Present on all 348 (ignored by Google, harmless) |
| Low-value URL pollution | Medium-High | 101/348 (29%) are thin `/news/tag/*` archive pages |
| Duplicate content cluster | Medium | 3 live URLs sharing identical title ("Collaborative Robots At a Glance") |
| Missing key page | Medium | `/about` in main nav but absent from sitemap |
| Location page quality gate | — | Not triggered (0 location pages) |
