# Content Quality / E-E-A-T Audit — promationusa.com (Live Site)
Date of audit: 2026-08-08 | Method: Live HTTP fetch of sampled pages + full sitemap.xml analysis (348 URLs)

## Overall Content Quality Score: 42/100

Underlying data pulled from live pages: `pages/*.html`, `sitemap.xml`, `extracted_summary.json` in this scratchpad folder.

---

## 1. E-E-A-T Breakdown

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 35 | No first-hand case studies, no named engineers/customers, no photos of actual deployments with narrative. "Soldering Lab" / "Proof of Concept" service is mentioned but not demonstrated with real project examples. |
| Expertise | 25% | 30 | Zero named authors or credentialed staff on any content. All 17 news articles are bylined **"PROMATION Inc."** (generic corporate author, confirmed via `rel="author"` markup on /news) — no bios, titles, LinkedIn links, or engineering credentials anywhere sampled. |
| Authoritativeness | 25% | 45 | Real awards exist (NPI Award 2020, TITAN Gold 2025) and are referenced in /news, which is a genuine authority signal — but they're buried in blog posts, not surfaced as trust badges on /, /what-we-do, or product pages. No press mentions/backlink signals visible on-page, no schema.org Award markup. |
| Trustworthiness | 30% | 55 | Phone number present (262.764.4832) and consistent; LocalBusiness/Organization JSON-LD present on every page. However: 204 instances of unedited Squarespace placeholder text **"Make it stand out"** and 188 instances of **"Whatever it is, the way you tell your story online can make all the difference"** found live in image captions/titles across `sitemap.xml` (primarily /events image markup) — this is a severe, site-wide trust/credibility red flag suggesting neglect. Confirmed model-number inconsistency on live product copy (see §5). |

**Weighted E-E-A-T score: ~41/100**

---

## 2. Word Count vs. Page-Type Minimums

| Page | Type | Live Word Count | Minimum | Verdict |
|---|---|---|---|---|
| / (home) | Homepage | 384 | 500 | **Below minimum** |
| /what-we-do | Service/About | 618 | 800 | Below minimum |
| /robotic-soldering-glance | Service | 965 | 800 | Meets |
| /pcb-handling | Service | 794 | 800 | Borderline (-6) |
| /9544cj | Product | 696 | 300–400 | Exceeds (fine) |
| /tm12 | Product | 808 | 300–400 | Exceeds (fine) |
| /et8383-dispensing-robot | Product | 563 | 300–400 | Exceeds (fine) |
| /news (index) | Blog index | 1,877 | n/a (index) | n/a |
| /careers | Service/info | 806 | 800 | Meets (barely) |
| /events (index) | Index | 1,731 | n/a | n/a |
| /complimentary-services | Service | 673 | 800 | Below minimum |
| /robotic-soldering-complimentary-services | Service | 662 | 800 | Below minimum |
| /et7383kc | Product | 570 | 300–400 | Exceeds |
| /et7383kc-screw-driving-robot | Product | 566 | 300–400 | Exceeds |

Homepage and several service pages (About/What We Do, both Complimentary Services variants) fall under Google's topical-coverage floor — but per QRG these are floors not targets; the bigger problem for these pages is duplication (§5), not raw length.

---

## 3. Readability & Structure

- **Systemic H1 misuse across all 110+ pages**: every single page's *first* `<h1>` is the site logo image (`<h1 id="logoImage"><img alt="PROMATION USA">`), not the page topic. This duplicates an identical, non-descriptive H1 site-wide and pushes the real topical heading to H1-#2 (or lower).
- On several pages (e.g. /tm12, /robotic-soldering-glance) the CMS template repeats `<h1>` for **every section heading** ("SMART", "SIMPLE", "▲ What We Offer", "▲ Soldering Lab", "▲ Award Winning Service & Technology") instead of using H2/H3. /tm12 alone has 4+ H1 tags. This flattens semantic hierarchy and actively confuses topical-relevance signals for both classic search and AI/LLM crawlers trying to identify the page's primary subject.
- /events and /careers use **zero H2 tags** — flat, unstructured content despite having 1,700+ and 800 words respectively.
- Home page title tag is a bare `PROMATION USA` (18 characters) — no value proposition, keyword, or location in the single most important title tag on the site.

---

## 4. AI Citation Readiness — Score: 25/100

- JSON-LD present on all sampled pages, but **only `WebSite`, `Organization`, and `LocalBusiness` types** — no `Product` schema on any of the ~90+ product pages (missing GTIN/SKU/specs/offers), no `Article`/`BlogPosting` schema on any of the 17 news posts (no dateline, no author entity, no headline markup), no `FAQPage`, `HowTo`, or `Review` schema anywhere sampled.
- No named, citable author entities (`Person` schema) — AI answer engines strongly prefer content with identifiable expert authorship.
- Flattened H1-heavy heading structure (§3) makes it harder for LLM crawlers to extract a clean topic/answer hierarchy per page.
- Specs tables/quotable facts (weight, dimensions, cycle time) do exist on product pages in prose/table form, which is positive, but **accuracy problems undermine citability** (§5) — an AI engine that cites a wrong spec creates liability and erodes trust in the source.
- No visible "last updated" dates on service/product pages; only blog posts and events carry native dates.

---

## 5. Duplicate / Near-Duplicate & Thin Content (confirmed via live diff)

Measured with Python `difflib` sequence-matcher on stripped page text:

| Page A | Page B | Text Similarity |
|---|---|---|
| /complimentary-services | /robotic-soldering-complimentary-services | **99.1%** (near-identical) |
| /et7383kc | /et7383kc-screw-driving-robot | **93.8%** |
| /et8253n-dispensing-robot | /et8283-dispensing-robot | 89.9% |
| /et8253n-dispensing-robot | /et8353n-dispensing-robot | 90.7% |
| /et8253n-dispensing-robot | /et8383-dispensing-robot | 88.8% |
| /et8253n-dispensing-robot | /et8384-dispensing-robot | 89.4% |
| /et8253n-dispensing-robot | /et8483-dispensing-robot | 88.8% |

- Both duplicate pairs are indexed separately (both in sitemap.xml), meaning Google/LLMs must resolve which is canonical — classic self-cannibalization. No evidence of canonical-tag differentiation checked, but content overlap alone (99.1%) is a hard duplicate-content signal.
- The ET8x83 dispensing series (7 confirmed sitemap URLs: et8253n, et8283, et8353n, et8383, et8384, et8483, et8393sf, et8493sf, et8583ya, et8593-copy, et8484-copy) shares ~88–91% boilerplate text, differentiated mainly by model number and a spec table — this is a textbook "programmatic-style" thin-content pattern even though it wasn't built with a formal template pipeline.
- Two URLs literally contain `-copy` in the slug (`/et8484-dispensing-robot-copy`, `/et8593-dispensing-robot-copy`) — strong evidence of un-cleaned duplicated/cloned Squarespace pages left live and indexed.

## 6. Confirmed Factual/Data-Accuracy Issue (live, verified)

On the live page **`/9733d-pro-model`** (title, URL slug, and JSON collection title all say **"9733D"**), the body copy reads:
> "The **9433D** PRO MODEL Series features a robust Hot Iron soldering system..."

This is a confirmed model-number mismatch — the page is unambiguously about the 9733D (per its title/slug/breadcrumb) but the descriptive paragraph names a *different* product (9433D, which has its own separate page at `/quick-9433d-dual-tip-soldering-robot`). This is a direct, citable inaccuracy: an AI engine or buyer reading this copy would associate the wrong specs/features with the wrong SKU. Given the confirmed 88–99% content-duplication pattern across the product catalog (§5), this type of copy-paste model-number error is very likely to recur across other product pages in the ~110-page catalog (task brief also references "174lbs" and "230mm vs 250mm Overall Length" errors on pages outside the sampled set — consistent with the same copy/paste-and-edit workflow risk, though not independently re-verified in this session).

## 7. Content Freshness

- News/blog: 17 posts 2017–2025, but with a **hard gap in 2023** (zero posts) and thin years (2019 = index page only, no standalone article surfaced in sitemap for a full article that year). Cadence is 1–4 posts/year, irregular.
- Events: sitemap `lastmod` values cap out at **2023-03-17**; live event list content spans 2017–2023 with no 2024/2025 events despite the company clearly still being active (2025 TITAN award, Nov 2024 news post) — the /events page reads as stale/abandoned relative to /news.
- No visible "reviewed/updated" dates on evergreen product or service pages (/what-we-do, /pcb-handling, /robotic-soldering-glance), so freshness cannot be assessed by users or crawlers even if the underlying content is current.

## 8. Site-Wide Placeholder-Text Defect (new finding, high severity)

Grep of `sitemap.xml` (348 URLs) found:
- `"Make it stand out"` — **204 occurrences**
- `"Whatever it is, the way you tell your story online can make all the difference."` — **188 occurrences**

Both are literal default Squarespace image-caption/alt placeholder strings, indexed and exposed in the sitemap's `<image:caption>`/`<image:title>` fields (concentrated in /events image galleries, but pattern suggests broader occurrence). This is machine-readable evidence, visible to Google Image indexing and any crawler parsing the sitemap, that a large share of site imagery was never captioned/finished. For a B2B industrial supplier this materially damages Trustworthiness/Authoritativeness signals ("does this vendor sweat details?") and wastes image-SEO/AI-citation opportunity on every affected asset.

---

## 9. Priority Recommendations

1. **(Critical)** Fix the site-wide Squarespace placeholder text (204 + 188 instances) — replace with real, descriptive alt/caption text.
2. **(Critical)** Correct the 9733D/9433D model-number mismatch and audit the full ~110-page product catalog for the same copy/paste class of error (weights, dimensions, model numbers), given the 88–99% duplication rates found.
3. **(High)** Resolve duplicate page pairs: canonicalize or merge /complimentary-services + /robotic-soldering-complimentary-services (99.1% identical) and /et7383kc + /et7383kc-screw-driving-robot (93.8% identical); redirect the `-copy` slugs.
4. **(High)** Fix H1 architecture: remove H1 from the logo/header include (use it once, hidden or as branding only, not as a heading), and demote in-body "SMART/SIMPLE" style section headers to H2/H3.
5. **(Medium)** Add `Product` schema to product pages and `BlogPosting`/`Article` schema (with dateline + `Person` author) to news posts to materially improve AI citation readiness.
6. **(Medium)** Add named author bios/credentials for technical content instead of generic "PROMATION Inc." byline; surface NPI 2020 / TITAN Gold 2025 awards as visible trust badges on home and product pages, not just buried in news posts.
7. **(Low)** Refresh /events with 2024–2025 activity or retire stale 2017–2023 listings; establish a regular news cadence to close the 2023 gap.
