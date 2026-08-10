# PROMATION USA — Website Action Plan

Prioritized from the August 8, 2026 full website audit (see `FULL-AUDIT-REPORT.md`). Effort: S = under an hour, M = a day or less, L = multi-day.

## Critical — fix immediately

| # | Action | Effort | Why |
|---|--------|--------|-----|
| 1 | Add `<meta name="viewport" content="width=device-width, initial-scale=1">` sitewide | S | Sitewide mobile rendering + mobile-first indexing; confirmed absent by two independent checks |
| 2 | Consolidate the 4 TechMan duplicate pages into one canonical URL (301 the rest, update nav) | M | Four-way authority split on the highest-intent cobot keyword |
| 3 | Correct the Yelp listing address (9522 → 9900 58th Pl) and standardize NAP to one format sitewide + in schema | S | Tier-1 citation error actively feeding wrong data to maps/AI |
| 4 | Fix `/store/quick` title collision (6101A1 page titled 6102A1) and the 9733D/9433D wrong-model copy | S | Live factual errors on commercial pages |
| 5 | Bulk-replace 200+ "Make it stand out" placeholder image captions/alts | M | Trust + image SEO; signals site neglect to Google and AI models |

## Critical — conversion (added by CRO audit)

| # | Action | Effort | Why |
|---|--------|--------|-----|
| C1 | Add `tel:` links sitewide + phone number and a "Request a Quote" button in the sticky header | S | Phone is the #1 conversion; click-to-call currently impossible on mobile |
| C2 | Cut the contact form to 5 fields (model # optional), retitle "Request a Quote", fix cookie-bar covering Submit | S | 11 required fields incl. a model number is a hard wall for new buyers |
| C3 | Fix measurement: remove dead UA tag, install GA4 with call/email/order events; diagnose the Google Ads account (zero impressions since Nov 2024 — likely billing lapse or suspension after 9 years of continuous advertising) | M | The business has had no analytics since mid-2023 and no paid presence since Oct 2024, with nothing in place to notice either |
| C4 | Add a "Request a Quote" CTA block to every product/category page | M | RFQ language currently appears nowhere on the site |

## High — within 1 week

| # | Action | Effort | Why |
|---|--------|--------|-----|
| 6 | Noindex all `/news/tag/*` archives (or drop tag archives entirely in the new build) | S | Removes 101 thin pages (29% of sitemap) from the index |
| 7 | Enable built-in product reviews on the store | S | Free aggregateRating schema + social proof |
| 8 | Fix LocalBusiness JSON-LD: PostalAddress, telephone, geo, @id, openingHoursSpecification | M | Foundation for local pack + AI citations |
| 9 | Add BreadcrumbList JSON-LD sitewide (template in details/schema.md) | M | Sitelinks breadcrumbs on a deep catalog |
| 10 | Add JobPosting schema for the open Robotic Soldering Technician role | S | Google for Jobs visibility, template ready |
| 11 | Patch store Product schema: availability URL, priceValidUntil, shippingDetails, returns | M | Unlocks Product rich results on pages that already have base markup |
| 12 | Merge/canonicalize near-duplicate pairs (`/complimentary-services` pair, `/et7383kc` pair) and retire the two `-copy` slugs | M | 93–99% duplicate content |
| 13 | Rewrite homepage title + the keyword-stuffed `/laser-marking-at-a-glance` meta + `/panda-laser-marking` title | S | Basic on-page hygiene on money pages |
| 14 | Shrink/relocate the scam-warning banner (single dismissible line, or move to a security notice page) | S | First rendered element on every page; ~14% of mobile viewport |

## Medium — within 1 month

| # | Action | Effort | Why |
|---|--------|--------|-----|
| 15 | Add spec tables + Product schema to the ~19 main-catalog product pages (start with soldering SKUs) | L | The #1 page-type mismatch vs everything that outranks them |
| 16 | Publish 3 cluster-opening content pieces: "Robotic vs Hand Soldering ROI", "How to Choose a Soldering Robot", "PCB Conveyor & Buffer Guide" | L | Zero competition found in these gaps; site currently has no informational content |
| 17 | Publish `/llms.txt` + add `disambiguatingDescription`/`alternateName` to Organization schema | S | AI answer-engine context + entity disambiguation from other Promations |
| 18 | Add FAQPage schema + question-phrased H2s to `/robotic-soldering-glance` | M | Its definition block is already citation-ready |
| 19 | Rework `/store` and `/contact` above-the-fold (products/CTA and phone visible without scrolling); fix cookie-bar overlap | M | Screenshot-verified UX blockers on conversion pages |
| 20 | Fix image delivery: width/height attributes, size-matched `?format=` params, remove dead UA analytics tag | M | CLS + payload; low-risk wins |
| 21 | Add descriptive alt text to store product images; add GTIN/MPN + real manufacturer brand to product data | M | Image SEO + Merchant Center eligibility |
| 22 | Create an Awards page consolidating NPI 2020 + TITAN 2025 with award schema; ask Horizon Sales for a visible link; request globalsmt.net links | M | Authority consolidation + easiest link wins available |
| 23 | Add real service-area copy (Mexico/Canada/Europe) + `areaServed` schema + map embed on /contact | M | Backs the claimed markets with actual content |

## Medium — competitive responses (added by competitive analysis)

| # | Action | Effort | Why |
|---|--------|--------|-----|
| K1 | Build 7 category hub pages + buying guides with FAQ blocks (soldering, conveyors, dispensing, screw driving, laser marking, cobots, X-ray) | L | Manncorp's guides win every non-branded query and AI answer sampled |
| K2 | Activate existing proof assets as CTAs: free PCB trial submission form, virtual-session booking link, brochure download | M | Competitors converts with demos/BOM analysis; PROMATION's equivalents exist only as plain text |
| K3 | Collect and publish 4–6 customer testimonials/case studies with logos | M | Zero social proof vs competitors showing NASA/Boeing logos |
| K4 | Publish the authority story: "Official North American QUICK & TechMan source · TITAN-award-winning PANDA line" on homepage + About | S | Exclusivity framing is exactly what earns Fancort verbatim AI citations |
| K5 | Amplify US-stock + Kenosha training lab messaging | S | Direct counter to domestic manufacturers' Made-in-USA/tariff narrative |

## Google Ads relaunch (added Aug 10 — account dark since Nov 2024, see C3)

| # | Action | Effort | Why |
|---|--------|--------|-----|
| A1 | **Build dedicated ad landing pages in the new site** — one per product line (robotic soldering, screw driving, dispensing, PCB handling, laser marking, cobots), plus pages for whichever models/queries the historical search-terms data shows actually converted. Each page: headline matching the ad's query, spec table, price-band or "starting at" anchor, RFQ form above the fold, `tel:` link, demo/PCB-trial CTA | L | Ads must never relaunch onto the current pages (no CTAs, 11-field form, scam banner). Purpose-built landing pages are the single biggest determinant of relaunch ROI and Quality Score |
| A2 | Pull the all-time **search terms** + **campaigns** + **ads (with final URLs)** exports from the dormant account before touching anything | S | A decade of real query/conversion data — the only keyword-volume signal available without Search Console; it decides which A1 pages get built first |
| A3 | Add every historical ad final URL to the migration 301 map, pointed at its new landing page | S | Preserves ad-account history/Quality Score carryover and catches any stray traffic on old URLs |
| A4 | Relaunch gate: billing/suspension resolved, GA4 live, Ads conversion actions re-verified end-to-end (form submit + tel click), landing pages shipped — only then re-enable spend | M | The last 22 months happened because nothing verified that ads and measurement were alive; the relaunch checklist is the safeguard |

## Low — backlog

| # | Action | Effort |
|---|--------|--------|
| 24 | Clean legacy slugs (`/7483kxz`, `-copy` URLs) with 301s to clean paths | M |
| 25 | Named authors + bios on news posts; Person schema | M |
| 26 | Cross-link equipment pages to their consumables in the store (tips, filters, belts) | M |
| 27 | Add `/about` to sitemap or fix the nav link; add lastmod to remaining sitemap entries | S |
| 28 | Connect Google Search Console + CrUX and re-run performance audit with field data | S |
| 29 | Refresh or archive the 2017–2023 events section | S |

## Measurement

- Re-run this audit after the Critical + High items ship; expected composite movement from 45 into the low 60s.
- Wire up Search Console before item 15 lands so before/after impressions on product queries are visible.
- The rebuild in this repo already resolves several items by design (viewport, titles, breadcrumbs UI, alias consolidation, store on-site) — map completed items against this plan before scheduling work on the old platform.
