# E-commerce SEO Audit — promationusa.com/store
Live audit performed 2026-08-08 via direct HTTP fetch (curl, desktop UA) of the live Squarespace store. No DataForSEO Merchant API calls were made — no credentials/config for `dataforseo_costs.py` were found in this repo, so marketplace/competitor pricing benchmarking was skipped (noted limitation below, not a blocker for on-page findings). All findings below are "On-page analysis (static)".

Pages fetched: /store (index), /store/quick-ts1200, /store/conveyor-belts, /store/100-authentic-quick-solder-tips-912-series, /store/quick-191ad, plus title/meta sweep of all 21 product URLs discovered on the store index, /store?category=Solder+Tips, /robotic-soldering-glance, /robots.txt, /sitemap.xml.

Full product URL list (21): 100-authentic-quick-solder-tips-912-series, 100-authentic-quick-solder-tips-912-series-372mr, 2020d-hot-air-rework-station, brass-rollers, conveyor-belts, quick, quick-100-15s, quick-100-6c, quick-150watt-soldering-irons, quick-180-watt-robot-soldering-irons, quick-191ad, quick-376di, quick-6102a1, quick-885-hot-air-gun, quick-9039, quick-feed-tube, quick-feed-tube-zlbsm, quick-ts1200, quick-ts2200, quick-ylt4n, replacement-brass-mesh-insert.

---

## 1. Product Schema (JSON-LD)

All 4 sampled product pages emit a `Product` JSON-LD block (Squarespace native commerce schema), alongside `Organization`, `LocalBusiness`, `WebSite`. Present fields: `name`, `image`, `description`, `brand` (hardcoded "PROMATION USA" on every product — not the actual manufacturer, e.g. QUICK), `offers`.

Two offer patterns observed:
- **Single-variant products** (quick-ts1200, quick-191ad): `Offer` with `price`, `priceCurrency`, `availability: InStock`, `url`, `sku`.
- **Multi-variant products** (conveyor-belts, 912-series tips): `AggregateOffer` with `lowPrice`/`highPrice`/`offerCount`/`availability` only — **no individual `Offer` per variant**, no per-variant `url`, no per-variant `sku` in the structured data (SKU-per-variant only exists in Squarespace's internal `variants` JS blob, not in the LD-JSON graph).

**Missing fields across every product (all 21, confirmed on all 4 sampled + spot checks):**
- `gtin`/`gtin8`/`gtin12`/`gtin13`/`mpn` — required-or-recommended by Google for Shopping/Merchant Center identifier reconciliation. None present. Brand is generic "PROMATION USA" rather than true manufacturer (QUICK), compounding the identifier gap.
- `aggregateRating` / `review` — absent on every page.
- `itemCondition`, `shippingDetails`, `hasMerchantReturnPolicy` — absent (not blocking for Product rich results but recommended for Merchant Center/Shopping ads eligibility).
- Conveyor-belts / 912-series `AggregateOffer.lowPrice == highPrice` even though `offerCount` is 80 / 16 — confirmed via variant dump: all 80 belt SKUs are priced identically at $37.50 regardless of length/width, and all 16 tip SKUs at $94.00. If unintentional, this is a pricing-config issue, not just an SEO one; if intentional, structured data is technically valid but signals no price differentiation to shoppers comparing sizes.

**Verdict:** Base Product schema is valid and Google-eligible for Product snippets on single-SKU pages. Multi-variant pages lose per-variant offer granularity, and the identifier + review gaps will hurt/limit Google Shopping (free listings) and Merchant Center feed quality across the board.

## 2. Reviews / Ratings — confirmed disabled, not just absent

Inspected Squarespace's embedded commerce config JSON on every product page:
```
"productReviewsEnabled":false,
"displayNativeProductReviewsEnabled":false,
"displayImportedProductReviewsEnabled":false,
"hasOptedToCollectNativeReviews":true,
"productReviewsMerchantEmailEnabled":true
```
Squarespace's native Product Reviews feature is available on this plan/site and partially configured (collection is opted-in, merchant email notifications on) but **display is switched off**. This is a low-effort, high-value fix: turning on native reviews would populate `aggregateRating`/`review` in the existing JSON-LD automatically (Squarespace injects this natively when reviews are enabled) — no dev work, just a commerce settings toggle.

## 3. Title Tags — mixed, with a real duplicate/mismatch bug

Sampled all 21 product `<title>` tags:
- Good, keyword-rich examples: "QUICK TS1200", "100% Authentic QUICK Solder Tips (912 Series)", "150-Watt Soldering Robot Irons", "Solder Feed Tubes - 500mm Length".
- Weak, non-descriptive examples: "PROMATION 9039", "PROMATION 6102A1", "PROMATION 191AD" — internal part numbers with no product-type keyword (no "soldering iron", "fume extractor", "thermometer"), unlikely to match user search intent/queries.
- **Bug found:** `/store/quick` (filters for the 6101A1 fume extractor, per its own meta description) and `/store/quick-ylt4n` (filters for the 6102A1 fume extractor) share the **identical title tag** "PROMATION 6102A1 Replacement Filters" — i.e. `/store/quick`'s title incorrectly says "6102A1" while its content is about the 6101A1. This is both a duplicate-title issue (2 different URLs, same `<title>`) and a title/content mismatch that will confuse both users and Google's title-rewrite logic. A third, separate page `/store/quick-6102a1` (the actual extractor unit, not filters) exists alongside these, tripling the risk of Google conflating three distinct product URLs targeting the same model number.

## 4. Meta Descriptions / Content Uniqueness

Descriptions on all pages checked are unique, product-specific, non-manufacturer-boilerplate copy (good — no copy-paste duplication found). Minor issues: several contain literal HTML-entity leftovers (`&amp;nbsp;`) rendering as visible junk in the SERP snippet, e.g. quick-100-15s, quick-100-6c descriptions show "&amp;nbsp;" artifacts — a double-encoding bug in the CMS field, not just a display quirk.

## 5. Category Pages (`?category=` query URLs)

`/store?category=Solder+Tips` (and by extension all `?category=` filters, confirmed via the 9 category links present in every product page's footer/nav: Calibration Tools, Conveyor Belts, Conveyor Parts, Fume Extraction, Hand Soldering, Nitrogen Kits, QUICK Solder Tips, Replacement Filters, Robot Consumables, Solder Pots, Utility Tools) **self-canonicalizes to `/store`** (`<link rel="canonical" href="https://www.promationusa.com/store"/>`) and carries no `noindex` meta — the canonical alone tells Google not to index the filtered variant separately.

Effect: no duplicate-content risk from the 11 category filters, but also **zero standalone category landing pages** that could rank for category-level queries like "solder tips for QUICK stations" or "conveyor belt parts" — all that equity/relevance is folded into one generic `/store` page. The `/store` index itself has a non-descriptive, non-keyword title ("Order Online Today! — PROMATION USA") and a brand-only meta description, wasting the one URL that could rank for a broad "solder tips / conveyor parts / fume extraction supplier" head-term basket.

## 6. Variant Handling (up to 80 SKUs on one page)

Confirmed via the embedded `variants` JSON on `/store/conveyor-belts`: 80 belt-size variants (Length × Width combinations, e.g. "ESD Edge Belt (2.5 x 1155)") are all served from a single URL via a client-side dropdown selector — no per-variant URL fragments, no separate crawlable pages. Per-variant stock counts are present in the JS data but not reflected in structured data.

This consolidation is **net-positive for SEO** (avoids 80 thin/near-duplicate pages competing against each other and splitting link equity) but **net-negative for Shopping/Merchant Center** (no way to feed Google 80 distinct product offers with distinct GTIN/price/availability per size — the feed would need a separate mechanism, e.g. a Shopping feed app, since the on-page schema only exposes an `AggregateOffer` range). Same 16-variant pattern exists on the 912-series tips page.

## 7. Images / Alt Text

Sampled `alt` attributes across all 4 product pages are dominated by raw camera/file names, not descriptive alt text:
`alt="IMG_4213.jpg"`, `alt="IMG_E2611.jpg"`, `alt="TS+SERIES+ONLINE.jpg"`, `alt="image1.JPG"`, `alt="911G+IMG_E0765.jpg"`, `alt="IMG_0148.jpg"` (repeated pattern across 912-series gallery), plus several `alt=""` (empty) on decorative/thumbnail images. Only the top hero image on each page tends to carry a meaningful alt (e.g. `alt="QUICK TS1200"`, `alt="QUICK 191AD 2.jpg"` — the latter still filename-suffixed). None of the sampled images have keyword-descriptive alt text (e.g. "QUICK TS1200 lead-free soldering station front panel"). Images are served via Squarespace CDN with responsive width params (`?format=1500w` available) so resolution/format itself is not a blocker — this is purely an alt-text authoring gap in the CMS media library.

## 8. Internal Linking from Equipment Pages to Store Consumables

Checked `/robotic-soldering-glance` (a robot-soldering equipment overview page, prime candidate to cross-sell tips/feed tubes/consumables) — it contains exactly **one** link to `/store` (generic, no anchor context, no deep link to specific consumable categories or products) among 30+ outbound links to individual robot model pages (`/9544cj`, `/et7383k`, etc.) and site sections. No links from this page to solder-tip, feed-tube, or filter product pages despite robots requiring exactly these consumables. This pattern likely repeats across the other `/quick-usa-*` and product-family pages (not all sampled, but the one checked shows a clear, structural gap). Conversely, every store product page does link out to all 11 `?category=` filters in its own nav/footer — so linking flows product→category well, but content pages (equipment/solution pages) → store is essentially absent.

## 9. Google Shopping / Merchant Center Readiness

- Base requirement (Product schema with price/availability/currency) — met.
- `gtin`/`mpn` — missing sitewide → will trigger Merchant Center "missing identifier" warnings, capping eligibility for some surfaces unless `identifier_exists: false` is explicitly declared in a manual feed.
- Reviews/ratings feed for seller ratings — not applicable (native reviews off).
- No dedicated Merchant Center feed/tag script detected in the fetched HTML (only the standard Squarespace commerce JSON-LD); if Merchant Center is connected via the official Squarespace ↔ Google integration this would typically ride on the same product data, so the identifier gap above would carry through to any live feed.
- 80-variant products need per-size offers in any real Shopping feed — current on-page `AggregateOffer` cannot supply this; would require Squarespace's own Google integration (which does read variant-level data server-side) rather than relying on on-page JSON-LD.

## 10. Sitemap / Robots

`/sitemap.xml` includes store product URLs (spot-checked: 2020d-hot-air-rework-station, 100-authentic-quick-solder-tips-912-series[-372mr], brass-rollers, and `/store` itself all present). `/robots.txt` disallows `/search`, `/account`, `/config`, `/api/`, and various `?format=`/`?view=` query patterns, and blocks a long list of AI crawlers (GPTBot, ClaudeBot, Google-Extended, etc.) — does not block `/store` or product paths, so standard Googlebot access is unrestricted.

---

## Scoring

| Category | Score | Notes |
|---|---|---|
| Schema completeness | 55/100 | Valid Product/Offer base; missing gtin/mpn, review/rating, weak AggregateOffer on variant products |
| Images | 30/100 | Filename-based alt text sitewide, several empty alt |
| Content/titles | 55/100 | Unique descriptions (good) but weak internal-part-number titles, one confirmed duplicate/mismatched title pair, HTML-entity artifacts |
| Internal linking | 40/100 | Product→category solid; equipment/solution pages→store consumables essentially absent |
| Reviews/social proof | 10/100 | Feature available but disabled sitewide |
| **Overall e-commerce SEO** | **42/100** | |
