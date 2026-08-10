# Pre-Rebuild Content Inventory — promationusa.com

Date: 2026-08-10
Source: https://www.promationusa.com/sitemap.xml (348 URLs, fetched live)
Full row-level inventory: `audit/prebuild/content-inventory.csv` (one row per sitemap URL)

Basis: audit/details/technical.md, sitemap.md, content.md, plus 20+ live spot-fetches performed for this inventory (titles + text diffs).

## Verdict Counts (sum = 348)

| Verdict | Count | Meaning |
|---|---|---|
| KEEP | 209 | Migrate roughly as-is (10 of these flagged SLUG-CLEAN — new URL + 301) |
| REWRITE | 11 | Page needed, copy must be redone |
| MERGE | 10 | Consolidate into named target URL, 301 the source |
| KILL | 118 | Do not migrate; 301 to nearest parent or 410 |
| **Total** | **348** | |

## Counts per Category

| Category | Count | Verdict split |
|---|---|---|
| news-tag | 101 | 101 KILL (Squarespace tag archives = 29% of sitemap) |
| product-soldering | 81 | 80 KEEP, 1 REWRITE (/9733d-pro-model) |
| category-hub | 30 | 26 KEEP, 3 MERGE, 1 KILL (/landing-promationusa) |
| product-pcb-handling | 28 | 27 KEEP, 1 MERGE |
| store-product | 21 | 21 KEEP (live commerce) |
| news-post | 17 | 17 KEEP (press-release archive) |
| event-page | 15 | 15 KILL (stale 2017–2023) |
| product-screw-driving | 13 | 12 KEEP, 1 MERGE |
| product-dispensing | 11 | 9 REWRITE, 2 MERGE (boilerplate series) |
| product-cobot | 10 | 7 KEEP, 2 MERGE, 1 KILL (/techman-usa-1) |
| core-company | 9 | 9 KEEP |
| utility | 3 | 3 KEEP (/thank-you noindex) |
| product-other / product-accessory | 4 | 4 KEEP |
| service | 2 | 1 KEEP, 1 MERGE |
| events-index | 1 | 1 REWRITE |
| news-index | 1 | 1 KEEP |
| store-index | 1 | 1 KEEP |

## Merge Clusters (explicit)

1. **TechMan cobot cluster (4 identical pages, same title/meta, all self-canonical)**
   - `/tm-robot-usa` → **/techman-collaborative-robots**
   - `/tm-robots-at-a-glance` → **/techman-collaborative-robots**
   - `/techman-usa` → **/techman-collaborative-robots**
   - `/techman-usa-1` = KILL (already 302→/tm-robots-at-a-glance; repoint 301 to the new canonical)
2. **Complimentary services pair (99.1% identical)**
   - `/complimentary-services` → **/robotic-soldering-complimentary-services**
3. **ET7383KC pair (93.8% identical)**
   - `/et7383kc` → **/et7383kc-screw-driving-robot**
4. **`-copy` clone slugs (no non-copy version exists in sitemap — migrate content to the clean canonical slug + 301)**
   - `/et8484-dispensing-robot-copy` → **/et8484-dispensing-robot** (new slug)
   - `/et8593-dispensing-robot-copy` → **/et8593-dispensing-robot** (new slug)
5. **Mobile robot solutions (identical title, verified live)**
   - `/mobile-robot-solutions-1` → **/intelligent-mobile-robot-solutions**
6. **AMR line loader clone (identical title "AMR Magazine Line Loader", verified live)**
   - `/mobile-robot-line-unloading-copy` → **/mobile-robot-line-loading** (if a real *unloading* page is wanted, rewrite it under a clean slug instead)
7. **PANDA brand hub (77% similar, same title intent, verified live)**
   - `/panda-robotics` → **/panda-robotics-usa**

## REWRITE List (11)

- `/9733d-pro-model` — body copy describes the wrong product (9433D); confirmed factual error
- `/events` — hub needed, but all content is 2017–2023 stale
- ET8x dispensing series, 88–91% shared boilerplate (9 pages): `/et8253n-dispensing-robot`, `/et8283-dispensing-robot`, `/et8353n-dispensing-robot`, `/et8383-dispensing-robot`, `/et8384-dispensing-robot`, `/et8483-dispensing-robot`, `/et8393sf-dispensing-robot`, `/et8493sf-dispensing-robot`, `/et8583ya-dispensing-robot`

## SLUG-CLEAN List (KEEP content, new URL + 301)

| Current | New slug |
|---|---|
| /7483kxz | /promation-7483kxz-screw-driving-robot |
| /new-page-1 | /book-service (page title is "Book Your Service") |
| /f-series-1 | /f-series-soldering |
| /hotbarsoldering | /hot-bar-soldering |
| /quick-usa-885-1 | /quick-usa-885 |
| /9101 | /quick-9101 |
| /9181 | /quick-9181 |
| /9334 | /quick-9334 |
| /9464 | /quick-9464 |
| /news/2019 | /news/2019-new-products (bare year slug collides with archive convention) |

(Other bare model-number slugs with letter suffixes — /9152n, /9544cj, /et9484e etc. — are cosmetically ugly but rank-bearing and unambiguous; per technical audit they are cosmetic-only. Renaming all ~80 is optional; if done, 301 every one.)

## Top 20 Highest-Value Pages to Migrate First

Judged by: known-ranking model pages, category hubs that feed them, and live commerce.

1. `/et9484e` — flagship E-series soldering robot, known ranker
2. `/9252n` — known-ranking soldering robot model
3. `/quick-9434-soldering-robot` — known-ranking QUICK 9434 model
4. `/et7383k` — known-ranking screw-driving robot
5. `/store` — live commerce hub (revenue)
6. `/products` — master catalog hub
7. `/robotic-soldering-glance` — soldering category hub (965 words, strongest hub content)
8. `/techman-collaborative-robots` — canonical cobot hub; absorbs equity from 3 merged duplicates
9. `/auto-dispensing-at-a-glance` — dispensing category hub
10. `/auto-screw-driving-at-a-glance` — screw-driving category hub
11. `/laser-marking-at-a-glance` — laser-marking category hub
12. `/pcb-handling` — PCB handling category hub
13. `/9544cj` — flagship large-platform soldering robot (own news tag, strong copy)
14. `/tm12` — top cobot model page (808 words)
15. `/et9384e` — E-series soldering robot
16. `/9394f` — QUICK 9394F (subject of NPI-award-era launch news)
17. `/panda-soldering` — PANDA line hub (2020 NPI award, 2025 TITAN award brand)
18. `/quick-usa-376di` — popular hand-soldering station (heavy tag presence)
19. `/what-we-do` — primary company/service page
20. `/contact` — primary conversion page

## Additional Migration Notes

- **Homepage (`/`) is NOT in the sitemap** — 348 URLs are all non-root. Migrate it regardless; content audit flags it as thin (384 words, bare 18-char title) → treat as REWRITE outside this inventory.
- `/about` is in main navigation but absent from sitemap — resolve during rebuild (create or fix nav link).
- `/landing-promationusa` is a byte-identical duplicate of the homepage (verified 1.000 diff ratio) → KILL, 301 to `/`.
- `/thank-you` (form confirmation): KEEP functionally but noindex + exclude from new sitemap.
- `/store/quick` title collision: retitle on migration (flagged in CSV).
- All KILL rows: 301 news tags → `/news`, event pages → `/events`, or serve 410 where no parent fits.
