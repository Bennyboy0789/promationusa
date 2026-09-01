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

---

# Third pass — Phase 1 and Phase 2 complete

The client deck's full page inventory is now built, and a migration gap found during the work
turned out to matter more than any of it.

## The migration gap

Site search was returning nothing for **QUICK 9434** — a model the audit deck cites repeatedly
as one PROMATION already owns page-one results for. It was not in the catalogue.

Checking the whole live URL set against `content-inventory.csv` found **76 pages marked KEEP
that had never made it into `products.json`**. Not one was a deliberate KILL. The catalogue
held 107 products where the migration plan called for 183 — 42% of the product pages were
missing, and because there was nothing to redirect *to*, the redirect map could not have
covered for it. Launching in that state would have dropped a page that ranks today.

All 76 were still live, so the content was recoverable rather than lost. Each page was fetched
and parsed into the catalogue schema:

| Recovered | |
|---|---|
| Pages | **76 of 76**, zero failures |
| With description | 76 |
| With specification tables | 35 |
| With photography | 70 (203 images, 35.9 MB) |
| Catalogue total | 107 → **183** |
| Live URLs still absent | **0** |

Spec keys were normalised to the catalogue's Title Case convention, categories inferred from
URL and copy, and the file checked for encoding damage — zero mojibake, special characters
(`°C`, `μm`, `×`, `≤`, `±`) all intact.

## Page inventory — the deck's Phase 1 and 2

| Sheet | Page type | Target | Built |
|---|---|---|---|
| 01 | Global frame | 1 | ✅ |
| 02 | Home | 1 | ✅ |
| 03 | Category hub | 7 | ✅ 10 |
| 04 | Product / model | ≈82 | ✅ **176** |
| 05 | Comparison & alternatives | 13 | ✅ **13** |
| 06 | Cost guide & buyer's pillar | 22 | ✅ **22** |
| 07 | Ad landing page (noindex) | 6–12 | ✅ **8** |
| 08 | Store — catalogue & part | 1 + ~50–80 | ✅ |
| 09 | News index & article | ≈18 | ✅ |
| 10 | Authority & brand pages | 5 | ✅ **5 brands + /why-promation** |
| 11 | Offer pages | 2 | ✅ `/pcb-trial`, `/book-a-demo` |
| 12 | Search & 404 | 2 | ✅ |

## Measured state

| Metric | Second pass | Now |
|---|---|---|
| Pages crawled | 262 | **371** |
| Indexable | 149 | **268** |
| Sitemap URLs | 150 | **269** |
| FAQPage pages | 8 | **208** |
| Product schema pages | 110 | **186** |
| Median words (indexable) | 268 | **553** |
| Titles over 60 chars | 4 | **0** |
| Descriptions over 160 | 0 | **0** |
| Duplicate titles | 1 | **1** — client-blocked |
| Canonical coverage | 149/149 | **268/268** |
| Broken links / redirect hops | 0 | **0** |
| Invalid JSON-LD | 0 | **0** |
| Images missing alt | 0 | **0** |
| CLS | 0 | **0** |
| LCP range | 76–908ms | **100–880ms** |

WCAG re-checked on the new page types: **0 structural issues, 0 undersized targets, 0 contrast
failures** across guides, comparisons, brands, search and a recovered model page.

## What was built

**Guides — 22.** Five cost guides, six buyer's guides, five decision comparisons, six technical
guides. **No guide states a price.** PROMATION has not approved publishing bands, and a figure
a buyer is later quoted differently against destroys trust in the whole site. Each guide
explains what moves the number and commits to a range on request; `priceNote` is the single
place a band drops in if approved.

**Comparisons — 13.** Competitor pages are grounded in what the competitive research actually
established — distribution model, whether specs are published as HTML or locked in PDFs, site
scale, SERP presence — and in each competitor's own published claims. **No competitor
specification is reproduced anywhere**, because none has been verified; a comparison table of
second-hand figures is a credibility and legal risk that buys nothing. Every page says to get
their numbers from them and offers to run the part instead. Competitors are described fairly,
including where the honest answer is that the alternative suits the buyer better.

**Brands — 5.** QUICK, PANDA Robotics, TechMan, SEAMARK, OMRON. Claims limited to the
relationship and the catalogue — no installed-base or market-share figures, which would need
the manufacturer to confirm them.

**Landing pages — 8, all `noindex, nofollow`.** Minimal header, query-matched headline, three
proof points, three-field RFQ above the fold, one spec block, single repeated CTA, minimal
footer. Indexing them would put them in competition with the category pages they shadow.

**Search.** Client-side over a pre-built index of every model, part, category, article and key
page, ranked so an exact model-number match outranks everything. Model numbers, SKUs and spec
values are all searchable. Verified: "conveyor" 19 results, "screw driving" 15, "191AD" finds
the part, "9434" now finds the recovered robot.

**Model pages — FAQs and definitions.** Every model page carries a citable category definition
and up to six buying questions derived from its own published specifications, marked up as
FAQPage. FAQPage coverage went from 8 pages to 208. Nothing is asserted that is not already
visible on the page, which is both honest and the condition Google sets for the markup.

**News.** Real `author` data existed on all 17 articles and was never surfaced. Articles now
carry a visible byline and `NewsArticle` schema with `datePublished` and a publisher node.

## Still open

Unchanged, and all genuinely blocked:

| Item | Needs |
|---|---|
| ET8484 / ET8384 | The site's only duplicate title and description. Which machine is that page for? |
| `aggregateRating` | Real reviews. Cannot be fabricated. |
| `VideoObject` | The catalogue holds one video URL. |
| Testimonials, install-base number | Only PROMATION has them. |
| Price bands | Would unlock `price` on `Offer` and give the cost guides a figure. |
| GTM ID, Resend credentials | Accounts under PROMATION's control. |
| 33 thin pages | Mostly store parts; needs real compatibility data. |
| Events in nav | In the navigation but retired from the index. A business call. |

---

# Deck commitments — final verification

Checked against the client PDF (`audit/PROMATION-Website-Audit.pdf`) rather than against this
report, item by item, on a running production build.

## Slide 14 — Action plan

| # | Commitment | State |
|---|---|---|
| 01 | Viewport meta tag sitewide | ✅ every page |
| 02 | Consolidate the 4 TechMan pages | ✅ 4 URLs → one canonical |
| 03 | Standardise company data + disambiguate | ✅ one phone format in site chrome; `disambiguatingDescription` on the Organization node |
| 04 | Fix wrong-model copy and placeholder captions | ✅ 9733D description corrected; zero "Make it stand out" captions |
| C1 | tel: + phone + Request a Quote in a sticky header | ✅ |
| C1 | Cut the form to 5 fields | ⚠️ **deliberate deviation** — the 14-field form was rebuilt to parity at your instruction; a 3-field RFQ now sits above it |
| C3 | Install GA4 + conversion events | ⚠️ instrumented and inert — needs a container ID |
| C3 | Diagnose the Ads account | ✅ done in the audit (dark since Nov 2024) |
| 06 | Drop tag archives, merge dupes, retire "-copy" | ✅ 0 of each in the sitemap |
| 07 | aggregateRating | ❌ **blocked** — needs real reviews |
| 07 | LocalBusiness, BreadcrumbList, JobPosting | ✅ all three |
| 10 | Fix /store and /contact above the fold | ✅ in the CRO pass |
| — | 351-row redirect map, one hop, no chains | ✅ generated and resolved; 0 chains |

## Slide 15 / 20 — Schema sweep

The deck promised **Product + Offer + FAQ + VideoObject + BreadcrumbList**.

| Type | Pages |
|---|---|
| Product | 186 |
| Offer | 186 |
| FAQPage | 208 |
| **VideoObject** | **4** |
| BreadcrumbList | 236 |
| LocalBusiness / JobPosting / NewsArticle | 1 / 1 / 17 |

**VideoObject was the last one outstanding, and I had wrongly written it off.** I checked
`products.json`, found one video URL, and called it blocked. The site actually embeds four real
YouTube videos — the homepage laser-marking film and three press releases — and YouTube
publishes everything Google requires for the markup. All four now carry `VideoObject` with real
`name`, `description`, `uploadDate`, `duration` and thumbnails, captured once into
`src/lib/videos.ts` rather than scraped at build time.

One of them is the screw-driving video the deck singles out: *"pairing it with on-page embeds,
transcripts, and VideoObject schema converts that video visibility into page rankings."* Two of
those three are now done. Transcripts are not — that needs the caption file.

## Fixed while verifying

- **A CSP of mine was blocking every YouTube embed.** `frame-src` listed only
  googletagmanager, so all four videos rendered as "This content is blocked". Not a removed
  video — YouTube's oEmbed confirms all four are live. `frame-src` and `img-src` now allow
  youtube.com, youtube-nocookie.com and the thumbnail CDN.
- **The article byline rendered twice.** My earlier byline patch added one where the template
  already had one. Now renders once.
- **The byline separator measured 1.23:1.** `aria-hidden` exempts it from 1.4.3, but a
  separator that invisible is not doing its job either. Darkened.

Two of my own checkers were also wrong and are fixed: the CSP checker matched the bare word
"blocked" and reported 77 phantom problems that were Edge's tracking prevention, not CSP; and
the first CSP pass only watched the top of the page for 3.5 seconds, which is why it missed the
lazy-loaded video iframes entirely.

## Final measured state

| | |
|---|---|
| Pages crawled | 371 |
| Indexable | 268 |
| Broken links / redirect hops | **0** |
| Canonical coverage | **268/268** |
| Titles > 60 / descriptions > 160 | **0 / 0** |
| Duplicate titles | **0** |
| CSP violations | **0** |
| WCAG issues / contrast failures | **0 / 0** |

## Genuinely outstanding

Everything left needs PROMATION:

| Item | Needs |
|---|---|
| ET8484 / ET8384 | Which machine that page is for — clears the last duplicate |
| `aggregateRating` | Real reviews; cannot be fabricated |
| Video transcripts | Caption files for the four videos |
| Testimonials, install-base number | Only PROMATION has them |
| Price bands | Would unlock `price` on Offer and give the cost guides a figure |
| GTM container ID, Resend credentials | Accounts under their control |
| Events in nav | In the navigation but retired from the index — a business call |
| Phase 3 (application pages, case studies, awards page, directory listings, trade press) | Post-launch by the deck's own plan |

---

# ET8484 / ET8384 — resolved

The last open duplicate, decided on evidence rather than referred to the client.

**The model numbers encode the machine.** Across the ET dispensing range the digits are
positional: the third digit is the working area, the fifth is the axis count.

| Model | Axes | Working area |
|---|---|---|
| ET8383 | 3 | 300 × 300 × 100 |
| ET8384 | 4 | 300 × 300 × 100 |
| ET8483 | 3 | **400 × 400** × 100 |
| ET8484 | **4** | **400 × 400** × 100 |

The page in question publishes **4-axis** and **400 × 400 × 100**. That is the ET8484 on both
counts; the ET8384 is 4-axis but 300 × 300.

**The live page confirms it.** On promationusa.com the same page carries:

- `<h2>` — **"ET8484 Dispensing Robot"** ✅ the page's own visible heading
- `<title>` — "ET8384 Dispensing Robot" ❌

The page was duplicated inside Squarespace from the ET8384 and the title tag was never updated.
Our extraction took the title tag, which is how the wrong model number reached the catalogue —
and why the audit found the ranking URL was `/et8484-dispensing-robot-copy` while the clean
`/et8484-dispensing-robot` was a 404.

**Decision: the URL, the specifications and the on-page heading were right; the title was
wrong.** The catalogue title and the opening line of the description now read ET8484. The
sibling ET8384 page is untouched and still correct at 300 × 300.

Duplicate titles and duplicate descriptions are now **0**. There is no remaining duplicate
content anywhere on the site.

**Worth PROMATION confirming**, though nothing depends on it: the same title-tag error is still
live on their Squarespace site, so anyone checking the source there will see ET8384. If the
machine really is a 300 × 300 unit mislabelled with 400 × 400 specs, that is a different and
larger content problem — but every signal on the page points the other way.
