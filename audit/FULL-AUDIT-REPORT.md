# PROMATION USA — Full Website Audit (Live Site)

**Site audited:** https://www.promationusa.com
**Date:** August 8, 2026 (competitive product-line analysis added August 10, 2026)
**Note:** The site is being rebuilt on a new platform. Recommendations below are platform-neutral — implement them in the new build rather than as fixes to the current site.
**Method:** 14 parallel specialist audits — technical, content/E-E-A-T, schema, sitemap, performance, visual (Playwright screenshots, desktop + mobile), AI search readiness (GEO), search experience (SXO with live SERP sampling), e-commerce, local, backlinks (free sources), topic-cluster analysis, **conversion (CRO)**, and **competitive analysis** — plus a 6-track competitive deep dive of the client-named competitor list by product line. Detailed per-specialist findings are in `audit/details/`.

---

## Executive Summary

# Website Health Score: 45 / 100

| Category | Weight | Score | Basis |
|---|---|---|---|
| Technical SEO | 22% | **64** | Direct crawl of 14+ pages, headers, robots.txt, sitemap |
| Content Quality | 23% | **38** | Content audit (42) blended with content architecture (28) |
| On-Page SEO | 20% | **37** | SXO SERP analysis (33) + e-commerce on-page (42) + title/H1 findings |
| Schema / Structured Data | 10% | **38** | 12 pages inspected, JSON-LD validated |
| Performance (CWV) | 10% | **45** *(estimated)* | PSI quota exhausted — HTML/header analysis only, no field data |
| AI Search Readiness | 10% | **49** | Citability, llms.txt, entity, crawler access |
| Images | 5% | **30** | Alt text, sizing, placeholder captions |

**Supplementary scores (not in the weighted composite):** Sitemap 74 · Visual/UX 42 · Local SEO 33 · **Conversion 31** · Backlinks ~15–25 (insufficient data, low confidence) · Content Architecture 28 · SXO 33.

**The one-paragraph verdict:** The site's infrastructure is serviceable (fast Fastly CDN, WebP images, valid sitemap, AI crawlers permitted) but nearly every layer above it leaks value: a missing viewport tag hurts all mobile rendering and ranking, duplicate page clusters split authority four ways, 19 of 21 catalog products have no Product schema, the store's own theme has reviews built in but disabled, NAP data conflicts across the web including a wrong street address on Yelp, and the site has **zero organic visibility on every one of 30+ non-branded keywords tested** — because the content that ranks in its SERPs (spec tables, buyer guides, distributor pages) doesn't exist on the site.

### Top 5 Critical Issues

1. **No `<meta name="viewport">` tag on any page** (confirmed independently by two specialists, desktop + mobile UA). Mobile browsers render at desktop width — this degrades mobile usability, Core Web Vitals, and mobile-first indexing sitewide.
2. **Duplicate-content clusters splitting authority.** Four identical, self-canonicalized, indexable TechMan pages (`/tm-robot-usa`, `/tm-robots-at-a-glance`, `/techman-collaborative-robots`, `/techman-usa`); near-duplicates at 99.1% (`/complimentary-services` pair) and 93.8% (`/et7383kc` pair); two live `-copy` slugs; a store title collision where `/store/quick` (a 6101A1 filter page) wears a 6102A1 title shared with `/store/quick-ylt4n`.
3. **Structured data coverage stops at the store.** 19 of 21 main catalog products have no Product schema; no BreadcrumbList anywhere; the live job posting has no JobPosting markup (invisible to Google for Jobs); events render dates/venues with no Event schema; the store's existing Product/Offer markup fails modern Google requirements (bare-text availability, no priceValidUntil/shipping/returns).
4. **NAP and entity integrity.** Yelp lists the wrong street address (9522 vs 9900 58th Pl); four phone formats coexist; LocalBusiness schema uses a plain-string address with no telephone/geo; at least four unrelated "Promation" companies exist with zero disambiguation on-site or in schema.
5. **Content trust erosion.** 200+ unedited placeholder captions ("Make it stand out") in image metadata; the `/9733d-pro-model` page describes itself as the 9433D (wrong product); ~110 catalog pages built on 88–91% duplicated boilerplate; every page's H1 is the logo alt text; zero named authors.

### Top 5 Quick Wins

1. **Add the viewport meta tag** sitewide — minutes of work, sitewide mobile impact.
2. **Noindex the 101 `/news/tag/*` archive pages** — removes 29% of sitemap bloat and thin-content dilution instantly.
3. **Enable product reviews on the store** — social proof plus automatic aggregateRating schema; build review support into the new store from day one.
4. **Standardize NAP everywhere and fix Yelp** — one canonical name/address/phone format on-site and in schema, then correct the Yelp listing.
5. **301-consolidate the TechMan cluster into one page** titled around "Authorized TechMan Cobot Distributor — USA" — kills the duplication AND targets the highest-intent keyword found in SERP analysis.

---

## 1. Technical SEO — 64/100

**Working well:** HTTPS everywhere, fast TTFB (77–110ms via Fastly), valid 348-URL sitemap, robots.txt permits all major crawlers *including* AI crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended share the permissive `*` ruleset — one specialist initially misread this as a block; the stacked user-agent group resolves to *allowed*).

**Issues:**
- **[Critical]** Viewport meta tag absent sitewide.
- **[Critical]** TechMan duplicate cluster (4 identical indexable pages, each self-canonicalized).
- **[High]** 101 thin `/news/tag/*` pages, all indexable, empty meta descriptions.
- **[High]** Legacy slug redirects are 302 (temporary), not 301 — link equity leaks on every historically renamed URL (confirmed `/techman-usa-1` → `/tm-robots-at-a-glance`). The migration redirect map must ship as true 301s.
- **[High]** `/store/conveyor-belts` ships 507KB of raw HTML (80 variants inlined) with 8 render-blocking stylesheets and 50+ scripts.
- **[Medium]** Homepage `<title>` is just "PROMATION USA" — no keywords, no description of the business.
- Messy legacy slugs (`/7483kxz`, `/mobile-robot-line-unloading-copy`, `/et8484-dispensing-robot-copy`) ship in the sitemap.

## 2. Content Quality — 42/100 (architecture 28/100)

- E-E-A-T: real awards exist (2020 NPI, 2025 TITAN 3× Gold) but are buried in dated press releases; no Awards page, no named authors, no bios, no credentials anywhere.
- 17 news posts are 100% press releases — none match any informational search intent.
- Catalog: ET8x83 dispensing series pages are 88–91% identical boilerplate; factual errors live on product pages (9733D/9433D mixup; impossible weights like "174lbs" on a desktop ionizing fan; a "230mm Length" product described as 250mm).
- Heading structure is broken sitewide: logo alt text is the H1 on every page; some pages have 4+ H1s.
- **Zero organic visibility** on all 30+ non-branded keywords sampled; competitors own every informational SERP. The highest-value uncontested gaps: robotic soldering ROI content, soldering robot buyer's guides, PCB conveyor system guides.

## 3. On-Page / Search Experience — 37/100

SERP-backwards analysis of 8 money keywords found PROMATION visible on only 2. The pages that *do* rank in these SERPs are: dedicated spec-table product pages (vs PROMATION's thin marketing stubs with zero tables and no prices), consolidated category pages (vs PROMATION's fragmented unlinked SKU pages), and pages explicitly framed as "distributor" (a word PROMATION's TechMan page never uses). Meta descriptions range from missing (tag pages) to raw keyword-stuffed comma lists (`/laser-marking-at-a-glance`). `/panda-laser-marking` is titled "PANDA ROBOTICS USA" with no topic signal.

## 4. Schema / Structured Data — 38/100

The current platform injects a working baseline (WebSite, Organization, LocalBusiness, auto-Article on posts, auto-Product on store items) — the new build must replicate at least this before adding more. Beyond that: nothing. No BreadcrumbList (0/12 pages), no JobPosting for the live opening, no Event markup, no FAQPage, http://schema.org context throughout, plain-string addresses, string authors, no Organization logo. Ready-to-paste JSON-LD templates for Organization/LocalBusiness, Product+Offer, NewsArticle, BreadcrumbList and JobPosting are included in `audit/details/schema.md`.

## 5. Performance — 45/100 (estimated; no field data)

PageSpeed Insights keyless quota was exhausted (HTTP 429), so no Lighthouse/CrUX numbers. Direct analysis found: 8 synchronous render-blocking stylesheets per page; 52–59 scripts per page with only 2–3 async; a dead Universal Analytics tag (sunset 2023) still executing; hero images requested at full 1940×879 resolution regardless of display size, without width/height attributes (CLS risk); duplicate image markup risking double downloads. Strengths: fast TTFB, WebP via CDN, 1-year cache headers. **Recommendation:** connect Search Console/CrUX for real field data.

## 6. Visual / UX — 42/100 (screenshots captured)

Playwright captured 20 desktop/mobile screenshots. The scam-warning banner is the first rendered element on every page (~14% of the mobile viewport) and undermines trust before the logo appears. `/store` above-the-fold is nearly empty; `/contact` hides phone/email/form below the fold; the cookie bar covers the contact form's Submit button until dismissed.

## 7. AI Search Readiness — 49/100

No `/llms.txt`. Entity confusion with at least three other "Promation" companies and no disambiguation. Most pages are marketing copy that answer engines can't cite — the strong exception is `/robotic-soldering-glance`'s definition block, which is near-optimal citation length but lacks question-phrased headings and FAQPage markup. Genuine strength: all AI crawlers are permitted in robots.txt.

## 8. E-commerce — 42/100

Product reviews built into the theme but disabled sitewide; no GTIN/MPN (caps Merchant Center eligibility); part-number-only titles ("PROMATION 9039"); raw-filename alt text (`IMG_4213.jpg`); the `/store/quick` title collision; weak cross-linking (equipment pages barely link to the consumables they require).

## 9. Local SEO — 33/100

Wrong address on Yelp (Tier 1 citation); four phone formats; LocalBusiness schema missing telephone/geo/PostalAddress; no service-area content for the claimed Mexico/Canada/Europe markets (the only text matches were a hidden phone dropdown); no map embed on /contact. GBP itself couldn't be verified programmatically (CAPTCHA) — manual dashboard review recommended.

## 10. Backlinks — insufficient data (indicative 15–25/100, low confidence)

Confirmed dofollow links from smttoday.com (2 press releases, naked-URL anchors). Horizon Sales' dedicated supplier page references the site only in JSON-LD `sameAs` — not a crawlable link. Common Crawl has no data for the domain (historical CCBot blocking). No toxic signals found. Real profile measurement needs Moz/Ahrefs/GSC link data.

## 11. Sitemap — 74/100

Valid, 348 URLs, no 404s in spot checks, all key pages present. Issues: 29% tag-page bloat, the 302-redirecting `/techman-usa-1` still listed, `/about` in nav but absent from sitemap, no lastmod on tag pages.

## 12. Conversion (CRO) — 31/100

The site's #1 conversion is a phone call or email to sales — and the site actively resists both.

- **[Critical] No quote path exists.** "Request a Quote"/RFQ appears nowhere on the site. Most product and category pages have zero CTAs; model pages carry only a small tertiary "Request info" link to the generic contact page.
- **[Critical] The contact form is an 11-required-field wall** — including full postal address and a *required* "PROMATION Model Number" (blocking buyers who don't know their model yet). It sits two screens below decorative graphics, and the cookie bar covers the Submit button until dismissed.
- **[High] Zero `tel:` links sitewide.** The phone number is plain text everywhere and absent from the header — click-to-call is impossible on mobile for a phone-first business.
- **[High] The scam banner leads with fraud anxiety** ("$250,000 fine… imprisonment", all caps, 3 lines) on every page, while genuine trust assets — 1-year ROI, IPC certifications, awards, the free proof-of-concept lab — sit as unlinked body text.
- **[High] Both measurement and advertising are dead — and nobody could tell.** Legacy Universal Analytics (defunct 2023) fires alongside a Google Ads tag (`AW-941699073`) and a GTM container (`GTM-PV6GFMN`) wired with Ads conversion tags, enhanced conversions, and form-submit triggers. *Update Aug 10 (verified from the account's all-time impression export):* the Ads account itself served **zero impressions from November 2024 onward** — dark for ~22 months after nearly a decade of continuous advertising (typically 100k–500k impressions/month, 2015–2024; the Oct 2024 cliff pattern suggests a billing lapse or suspension rather than a deliberate pause). With UA dead since mid-2023 and no GA4 ever installed, the business has had no paid presence *and* no analytics to notice. Diagnose the account (billing/suspension), install GA4, and decide deliberately whether to relaunch ads onto the new site's landing pages.
- Unactivated conversion assets: "Submit your PCB for trial today!" (plain text, no link), "Book a Virtual Video Session Today!" (no booking mechanism), the product brochure PDF (not promoted or gated), store `expressCheckout:true` suppressing multi-item consumable carts, null return/ToS policies.

**Quick wins:** `tel:` links + phone and a quote button in a sticky header; cut the form to 5 fields and retitle it "Request a Quote"; attach real CTAs/booking to the trial-lab and virtual-session offers that already exist as text.

## 13. Competitive Analysis

Two layers, two documents: `details/competitive.md` profiles the **SERP-discovered rivals** (the distributors who actually win US searches); `details/competitive-product-lines.md` (added Aug 10) deep-dives the **client-named competitor list by product line** and reality-checks it against ~35 live US SERPs.

### 13a. SERP-discovered competitor set

**Confirmed direct competitor set:** Manncorp (full-line SMT distributor — the benchmark threat), Fancort Industries (exclusive Japan Unix robotic-soldering distributor for US/CA/MX — the most direct rival), Apollo Seiko's US channel (incl. Murray Percival), Hentec/RPS Automation (US-made selective soldering), DDM Novastar (all-USA-made SMT line), TM Robotics/ELMOTEC (secondary, OEM cobot channel). NEFF, Hartfiel, Electromate, Signode, Nordson and Mountz overlap only single categories.

**Position:** PROMATION already owns page-1 real estate for *model-level* robotic-soldering queries (ET9484E, 9252N, QUICK 9434) but is outgunned on *category* terms, site scale (~230 URLs vs Manncorp's 1,000+), conversion flow, and social proof — while facing a Made-in-USA/tariff narrative from domestic manufacturers.

**The five gaps vs competitors:**
1. No category/buying-guide content — Manncorp's guides ("Your First SMT Line") win every non-branded query and AI answer sampled.
2. Conversion flow — competitors offer Schedule-a-Demo, free BOM analysis (Manncorp) and send-your-part application sampling (Fancort); PROMATION offers an email address.
3. Zero reviews/testimonials/case studies — competitors show rated testimonials and NASA/Boeing logos.
4. No trust/compliance stack on display — Fancort flaunts ITAR/NASA/IPC; PROMATION's IPC certs and awards are buried.
5. Structured data — weak across the *whole* competitor set: an uncontested win for whoever moves first.

**Three moves to win:** (1) seven category hub pages + buying guides with FAQ blocks; (2) demo/proof-of-concept CTAs and structured RFQ forms on every product page, anchored on the Kenosha training lab and US stock — the direct counter to the tariff attack; (3) an authority story ("Official North American QUICK & TechMan source, TITAN-award-winning PANDA line") with 4–6 testimonials and a schema sweep, mirroring the exclusivity framing that earns Fancort verbatim AI-answer citations.

### 13b. Product-line deep dive (client-named competitors)

The client supplied competitors per product line: PCB handling (YJ LINK, NUTEK, CTI Systems, FlexLink), robotic soldering (Japan Unix, Apollo Seiko, Thermaltronics), laser marking (YJ LINK, ASYS, FlexLink, HK Laser), robotic dispensing (Fisnar, Nordson, GPD), and robotic screw driving ("no real competitors"). Six research tracks tested that list against live US search; all complete.

**Reality check on the list:**
- **Most of the named OEMs barely rank in US search.** YJ LINK has no English SEO at all; NUTEK's exclusive Americas distributor's websites are dead (US SERP shelf unguarded); CTI Systems (ctisystems.net, NC) appeared in zero sampled SERPs. Only FlexLink, ASYS, and the dispensing trio actually compete in US organic search.
- **"HK Laser" is misidentified** — hklasers.com is parked and HK Laser & Systems sells sheet-metal cutting. The #1 US ranker for "PCB laser marking machine" is **Han's Laser**. Confirm with client.
- **"No competitors in screw driving" is false as stated** (Janome, ASG/Jergens, Sumake NA, Visumatic sell competing benchtop systems; Robotiq/UR/DEPRAG own the broad SERPs — PROMATION has zero non-branded rankings there) **but true in spirit**: no incumbent has locked the benchtop segment with strong content. The winnable position is "turnkey benchtop screwdriving robot, US stock and support."

**Four structural openings recur in every category:** empty comparison/alternative SERPs ("QUICK vs Japan Unix"-type queries have no owner anywhere in the line card); a schema vacuum (of ~15 competitors inspected only GPD Global runs real Product schema; Nordson emits only breadcrumbs); a pricing vacuum (no manufacturer publishes machine prices — a distributor can); and distributor click-capture (every Asian OEM loses its US clicks to distributors/marketplaces — a game PROMATION already wins for QUICK, holding 7 of the top 10 for "QUICK soldering robot distributor USA").

**New self-inflicted issues found:** the ranking ET8484 dispensing URL is the `/et8484-dispensing-robot-copy` duplicate slug; `/panda-laser-marking` carries a robotic-*soldering* meta description; Nordson takes 3 of 10 slots on PROMATION's own branded QUICK ET SERPs.

Full profiles, SERP-ownership tables, and the prioritized keyword/content plan per category: `details/competitive-product-lines.md`.

---

## Cross-Cutting Themes

1. **Most critical issues are configuration and content hygiene, not engineering projects** (viewport, reviews disabled, placeholder captions, 302s) — and the planned platform rebuild is the chance to fix all of them at once, provided none are carried over.
2. **Authority is being split, not built.** Duplicate clusters, alias URLs, fragmented SKU pages and tag bloat divide what little equity the site earns.
3. **The site sells but doesn't answer.** Zero informational content + thin spec-less product stubs = invisible in both classic SERPs and AI answers, despite owning defensible expertise (awards, 20+ years, training lab).
4. **Trust signals point the wrong way.** A scam warning as the first element, placeholder text, wrong-model copy, and a wrong address on Yelp all erode the trust the brand has earned offline.

*See `ACTION-PLAN.md` for the prioritized fix list with effort estimates.*
