# SEO Audit — the PROMATION USA rebuild

Run 2026-08-27 against a local production build (`next build` + `next start`).

**This audits the new Next.js site, not promationusa.com.** The live-site audit is the
separate document in `audit/` that scored **45/100** and set the baseline for this rebuild;
nothing here overwrites it. Treat the two scores as before and after, with the caveat in
"Limits" below about what a local run cannot see.

## SEO Health Score — 79/100

| Category | Weight | Score | Contribution |
|---|---|---|---|
| Technical SEO | 22% | 88 | 19.4 |
| Content Quality | 23% | 66 | 15.2 |
| On-Page SEO | 20% | 80 | 16.0 |
| Schema / Structured Data | 10% | 84 | 8.4 |
| Performance (CWV) | 10% | 85 | 8.5 |
| AI Search Readiness | 10% | 70 | 7.0 |
| Images | 5% | 82 | 4.1 |
| **Total** | | | **78.6 → 79** |

Baseline on the live site was 45. The deck predicted "the Critical and High fixes move the
composite from 45 into the low 60s; the strategic programs are what make it a category
contender." The build has cleared that, mostly because the technical and schema layers are
now near-complete. What is holding it under 85 is content, which is the part that was always
going to need PROMATION.

**Business type:** B2B industrial equipment distributor — considered purchase, phone/RFQ
conversion, model-number search demand. Not a local-service business despite the single
address, so local-pack signals are secondary and no local audit pass was run.

**Crawl:** 262 pages reached, 0 broken links, 0 redirect chains, 0 orphans. 149 indexable,
113 deliberately noindexed (news tag/year archives and the retired events archive).

---

## Top 5 issues

1. **No security headers at all.** HSTS, X-Content-Type-Options, Referrer-Policy, CSP and
   Permissions-Policy are all unset. Not a ranking factor directly, but it is the one
   technical category where the build is at zero.
2. **44 indexable pages under 300 words.** 18 are store part pages, the rest are category
   hubs with few models and the thinner product entries. These are exactly the pages the
   audit found losing to competitors with real spec tables.
3. **No `llms.txt`, and few citable set-pieces outside the hubs.** The FAQ and definition
   blocks on category hubs are strong; nothing equivalent exists on model pages.
4. **23 titles over 60 characters and 23 descriptions over 160.** Almost all are news
   articles inheriting long press-release headlines; they will truncate in SERPs.
5. **No `aggregateRating`, no `VideoObject`.** Both are blocked rather than missed —
   ratings need real reviews, and the catalogue holds exactly one video URL.

## Top 5 quick wins

1. Add the five security headers in `next.config.ts` — one object, no design impact.
2. Add `lastmod` to the sitemap. The data exists on news articles already.
3. Publish an `llms.txt` pointing at the hubs, the trial offer and the contact route.
4. Truncate news `<title>` to ~60 chars while keeping the full headline as the `<h1>`.
5. Resolve the ET8484 / ET8384 page — one duplicate title and one duplicate description
   both trace to it. This needs PROMATION to say which machine the page is for.

---

## Technical SEO — 88

**Working**

- `viewport` and `lang` on 262/262 pages.
- **Canonical on 149/149 indexable pages, all unique, zero collisions.** Added during this
  audit; there were none before it.
- `robots.txt` valid, allows all agents including AI crawlers, declares the sitemap and host.
- `sitemap.xml` valid, 150 URLs, no retired or noindexed URLs leaking in.
- Crawl is clean: every internal link resolves 200 in one hop. The legacy flat URLs redirect
  once into the category-nested structure with no chains.
- `noindex` correctly scoped — 97 news tag archives, 15 event pages, 1 events index. No real
  content is blocked.

**Gaps**

- **No security headers.** Nothing set: no `Strict-Transport-Security`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Content-Security-Policy` or
  `Permissions-Policy`.
- **Sitemap has no `lastmod`, `changefreq` or `priority`.** `lastmod` in particular helps
  crawl scheduling on a 150-page site with a news section.
- **Case-variant tag URLs exist** (`/news/tag/promation` and `/news/tag/PROMATION`). They are
  noindexed so the duplicate-content cost is nil, but the crawl budget cost is not.

## Content Quality — 66

The weakest category, and the one least fixable without the client.

**Working**

- Every page has a description; all 16 news articles have unique ones.
- E-E-A-T signals are real: named CEO with a verbatim attributed quote, IPC certification,
  TITAN award, full NAP, staffed phone number, physical demo lab.
- Category hubs carry 40–60 word definition blocks written to be quotable standalone, plus
  2–4 buying questions each with substantive answers.

**Gaps**

- **44 indexable pages under 300 words**, 18 of them store parts. Median across the site is
  268 words.
- **No testimonials or case studies.** The competitive research identified this as where
  PROMATION loses most visibly — rivals show rated testimonials and recognisable logos.
  Blocked on PROMATION supplying 4–6.
- **No install-base number.** Uncontested ground: no competitor in any of the five categories
  publishes one. Only PROMATION knows the figure.
- **No author or reviewer attribution** on news or guides.
- **The `/compare/` and `/guides/` programmes do not exist yet.** Phase 2 by the deck's own
  plan, so on-schedule rather than late — but they are the single biggest content lever.

## On-Page SEO — 80

**Working**

- 0 missing titles, 0 missing descriptions, 0 missing H1s, 0 pages with multiple H1s.
- **H1s are server-rendered.** Worth flagging because until this session they were not: the
  decode animation shipped `<h1> </h1>` to crawlers on every page with the real text only in
  `aria-label`.
- Internal linking is healthy — median 34 links per page, minimum 27, no orphans.
- Breadcrumbs match the URL path on every product and category page.

**Gaps**

- 23 titles over 60 characters (longest 124) — all news.
- 23 descriptions over 160 characters (longest 322).
- One duplicate title and one duplicate description, both from ET8484/ET8384.
- The TM5-700 and TM5-900 pages share a description.

## Schema / Structured Data — 84

262/262 pages carry JSON-LD and **zero blocks fail to parse**.

| Type | Pages |
|---|---|
| Organization, WebSite, ContactPoint, PostalAddress | 262 |
| BreadcrumbList | 120 |
| Product + Offer + Brand | 110 |
| PropertyValue (spec pairs) | 62 |
| AggregateOffer (store variants) | 10 |
| FAQPage | 8 |
| LocalBusiness + OpeningHoursSpecification | 1 |
| JobPosting | 1 |

The competitive research found only 1 of ~15 competitors runs a real Product-schema
programme. This is the audit's "near-uncontested" lane and the build now holds it.

**Gaps**

- `Offer` carries availability and currency but **no price** — pending the pricing decision.
- **No `aggregateRating`.** Requires real reviews. Fabricating them would be a manual action
  and a lie; this stays blocked.
- **No `VideoObject`.** The catalogue holds one video URL. The screw-driving video the
  research flagged as an existing asset is not in the content set.

## Performance (Core Web Vitals) — 85

Measured over 8 page types at 1440×900 and 390×844 with cache cleared.

| Metric | Result |
|---|---|
| LCP | 84–820ms (budget 2500ms) |
| CLS | **0** on every page, both viewports |
| TTFB | 3–9ms |

CLS is worth noting: it measured **0.417 on the mobile product page** before this session.
The decode animation re-wrapped the heading mid-animation because scrambled glyphs are not
the same width as real ones. The real text now holds the box and the scramble paints over it.

Score is capped at 85 rather than higher because these are **lab numbers from localhost** —
no network latency, no real devices, no field data.

## Images — 82

- 565 `<img>` tags, **0 missing an alt attribute**.
- All served as WebP through `next/image` with responsive `srcset` and lazy loading.
- 429 carry empty `alt=""` — correct for card thumbnails whose adjacent heading already names
  the product, but it means most catalogue imagery contributes nothing to image search.
- Source files total 52MB for 293 product photographs recovered from the live site.

## AI Search Readiness — 70

**Working**

- No AI crawler is blocked — GPTBot, CCBot, PerplexityBot and ClaudeBot all have access.
  Two competitors in the research (Nordson, ASYS) block crawlers and forfeit citations.
- Content is server-rendered, so answer engines see the same text as users.
- `FAQPage` markup on hubs is backed by visible Q&A, which is the condition for it counting.
- The Organization node carries `disambiguatingDescription` separating PROMATION USA from the
  four unrelated companies sharing the name.

**Gaps**

- **No `llms.txt`.**
- Citable set-pieces exist only on the 8 hubs. Model pages have no definition block, no FAQ
  and no summary paragraph an engine can lift.
- No statistics an answer engine would cite — the install-base number would be exactly this.

---

## Fixed during this audit

Recorded because the scores above are post-fix.

1. **Canonical tags — 0 pages had one.** Added across all 149 indexable routes. The first
   implementation put a canonical in the root layout, which made 112 noindexed archives each
   declare themselves the homepage; corrected by moving it to the home page so unset routes
   emit nothing rather than something wrong.
2. **Four orphaned pages.** `/careers`, `/partners`, `/virtual-training-gallery` and
   `/events` were linked only from the header Company dropdown, which `AnimatePresence`
   mounts on hover — so the links never existed in server HTML and no crawler could reach
   them. A Company column in the footer fixes it, and also surfaces `/pcb-trial` and
   `/book-a-demo`, which were footer-invisible too.
3. **The retired events archive was indexable.** Marked KILL by the audit and excluded from
   the sitemap, but rendering with no `noindex` — and the footer fix had just made it
   crawlable. Now `noindex, follow`, matching how the tag archives are handled.

## Open question for PROMATION

**Events is in the primary navigation but retired from the index.** Either it is live content
and belongs in the sitemap, or it is retired and should come out of the nav. The audit chose
KILL; the nav still lists it. That is a business call, not a technical one.

## Limits of this audit

- **Local build, not the deployed site.** No CDN, no TLS, no real network. Performance
  numbers are optimistic and TTFB is meaningless off localhost.
- **No field data.** CrUX, Search Console and GA4 need a live verified property, so
  everything here is lab-measured or static analysis.
- **No live SERP or backlink data.** DataForSEO, Moz and Bing credentials are not configured
  in this environment, so rankings, referring domains and spam scores are absent. The live
  site's competitive position is covered in the original audit.
- **The skill's helper scripts were not present** (`scripts/` ships no files), so every pass
  here was run with a purpose-built crawler and Chrome DevTools Protocol rather than the
  packaged tooling.

---

# Second pass — gaps fixed

Everything in the High tier and most of Medium was implemented after the first pass and
re-measured the same way. Raw data in `crawl-data.json` is from the final crawl.

## Score — 79 → 83/100

| Category | Weight | Before | After |
|---|---|---|---|
| Technical SEO | 22% | 88 | **95** |
| Content Quality | 23% | 66 | 67 |
| On-Page SEO | 20% | 80 | **90** |
| Schema | 10% | 84 | 84 |
| Performance | 10% | 85 | 85 |
| AI Search Readiness | 10% | 70 | **78** |
| Images | 5% | 82 | **88** |
| **Total** | | **78.6** | **83.4** |

Content is now the only category under 80, and every remaining item in it is blocked on
PROMATION supplying something — testimonials, an install-base figure, price bands.

## Measured change

| Metric | Before | After |
|---|---|---|
| Security headers | 0 of 6 | **6 of 6** |
| Titles over 60 chars | 20 | **4** |
| Descriptions over 160 chars | 14 | **0** |
| Duplicate titles (indexable) | 1 | 1 — client-blocked |
| Duplicate descriptions (indexable) | 1 | 1 — same page |
| Sitemap entries with `lastmod` | 0 | **150 of 150** |
| `llms.txt` | absent | **present** |
| Tag archive URLs | 97 | **87** |
| Images with empty `alt` | 429 | **253** |
| Canonical coverage (indexable) | 149/149 | 149/149 |

## What changed

**Security headers.** All six now set in `next.config.ts`: HSTS with `preload`, `nosniff`,
`X-Frame-Options: DENY`, `strict-origin-when-cross-origin`, a Permissions-Policy closing
camera/mic/geolocation, and a CSP. The CSP keeps `unsafe-inline` for scripts because Next's
bootstrap and the GTM snippet both require it — tightening that needs a nonce threaded
through the app, which is a larger change than this pass warranted. It still blocks framing,
forbids plugins, pins form targets and upgrades insecure requests.

Verified with the browser open: **zero CSP violations and zero console errors** across five
page types, all rendering fully with images. A CSP that silently breaks a page is worse than
none, so this was checked rather than assumed.

**`llms.txt`.** Generated from the catalogue rather than hand-written, so a new category
cannot silently go missing from it. Describes the company, disambiguates it from the other
firms named Promation, lists every hub, and points at the trial and demo offers.

**Titles and descriptions.** News articles now drop the `| PROMATION USA` suffix and give the
full 60 characters to the headline — on a press release the headline carries the keywords and
the brand is already in the copy. Store titles lose the redundant `— Store`. Descriptions are
trimmed on a word boundary by a shared helper.

**Sitemap.** `lastmod` on all 150 entries — real publication dates for news, build date
elsewhere — plus `changeFrequency` and `priority`.

**Duplicate meta descriptions.** The generator now leads with the model name unless the
tagline already contains it. The TM5-700 and TM5-900 pages are word-for-word identical in the
source data with no specs at all, so their descriptions collided; leading with the model both
separates them and front-loads the model-number searches this catalogue already wins.

**Tag case variants.** The source data carries both `PROMATION` and `promation`, which
published two URLs for one archive. Tags are now folded by case in both the tag cloud and on
article pages, with the most-used spelling winning. The route resolver already matched
case-insensitively, so old inbound links still resolve rather than 404.

**Image alt text.** Catalogue card thumbnails carried `alt=""` — defensible for a screen
reader, since the heading beside them names the product, but it forfeited image search across
the entire catalogue. They now carry the product title. The 253 that remain empty are
genuinely decorative: background bands, textures, the parallax imagery.

## A correction to the first pass

The first pass reported **23 titles over 60 characters and 23 descriptions over 160**. Both
counts were too high: my crawler measured the raw HTML attribute, where `&amp;` counts as five
characters rather than one. Decoding entities first gives the true figures — **20 titles and
14 descriptions**. Four of the pages I had flagged were never over the limit.

The before/after table above uses the corrected numbers.

## Still open — all blocked on PROMATION

| Item | What is needed |
|---|---|
| ET8484 / ET8384 | The page describes an ET8384 at an ET8484 URL. It is the site's only duplicate title and only duplicate description. Which machine is the page for? |
| 44 thin pages | 18 store parts at 123–169 words. Thickening them needs real compatibility and replacement data, not invented copy. |
| `aggregateRating` | Real reviews. Fabricating them is a manual-action risk. |
| `VideoObject` | The catalogue holds one video URL; the screw-driving video is not in the content set. |
| Testimonials, install-base number | The largest content gap and the one competitors cannot counter. |
| Price bands | Would unlock `price` on the `Offer` node. |
| Events in nav | In the primary navigation but retired from the index. A business call. |

Four titles remain over 60 characters, by one to nine characters: the TM5-700 and TM5-900
pages at 61, and two store items. Shortening those means editing catalogue product names,
which is client content rather than a build decision.
