# SXO Audit: promationusa.com

Method: fetched/parsed live pages via `scripts/fetch_page.py` + `scripts/parse_html.py`
(SSRF-safe); SERP backwards analysis via WebSearch for 8 core keywords; classification
per `page-type-taxonomy.md`; scoring per `persona-scoring.md`.

## 1. Site Architecture Snapshot
- Homepage: 0 H1, 56 visible words (marketing shell + nav), 123 internal links, 3 schema
  blocks (WebSite, Organization, LocalBusiness — identical on every page site-wide).
- Product family pattern: one "at a glance" hub page per category
  (`robotic-soldering-glance`, `auto-dispensing-at-a-glance`, `auto-screw-driving-at-a-glance`,
  `laser-marking-at-a-glance`, `techman-collaborative-robots`/`tm-robot-usa`) linking out to
  dozens of thin individual SKU pages (e.g. `9n393w-hot-air-soldering-robot`, `et8283-dispensing-robot`,
  `et72h3ka`, `transfer-conveyors`).
- SKU pages: 0 H1 tags, 166-264 words, **zero `<table>` elements** (no spec tables), no
  Product/Offer schema, no price, only generic sitewide Organization/LocalBusiness JSON-LD.
- `tm-robot-usa` and `techman-collaborative-robots` are byte-identical in title/meta/H1
  count/word count — duplicate content cannibalizing the same intent.
- `panda-laser-marking` title tag reads "PANDA ROBOTICS USA" (no mention of laser marking) —
  URL/topic/title mismatch.
- `laser-marking-at-a-glance` meta description is a raw comma-separated keyword stuffing list
  ("promation inc, LP-410, promation usa, fayb laser, laser marking wisconsin, pro-mation...")
  — 2012-era spam pattern.
- No `datePublished`/`dateModified` schema anywhere — zero freshness signals.
- Pages ARE indexed (confirmed via `site:` search) — this is a relevance/depth problem, not
  a crawlability problem.

## 2. SERP Backwards Analysis (8 core keywords)

| Keyword | PROMATION visible in top 9? | SERP dominant page type | Consensus |
|---|---|---|---|
| robotic soldering machine | Yes, low position (~9th), `robotic-soldering-glance` | Manufacturer product/category pages (Fancort, TM Robotics, PentaLogix, Japan Unix) + 1 wiki + 1 marketplace | ~67% |
| soldering robot | Yes, low position (~7th), same page | Same as above | ~65% |
| PCB handling equipment | **No** | Manufacturer category/collection pages (Signode, SPEA, AdoptSMT, iTech, Manncorp, PCB Unlimited) | ~75% |
| PCB conveyor | **No** | Mixed: product/category pages (Signode Cimtrak, Nutek) + buying-guide articles (smtfactory, allpcb) | ~55% fragmented |
| robotic screw driving | **No** | Manufacturer product pages (Sumake, Mountz) + trade article (ASSEMBLY) + video (Universal Robots) | ~55% fragmented |
| automated dispensing robot | **No** | Industrial dispensing manufacturer pages (Nordson, ACRO, Dispense Works) mixed with unrelated pharma-dispensing results (term ambiguity) | ~55% (of relevant subset) |
| collaborative robot distributor | **No** | Distributor/reseller pages (NEFF Automation, Hartfiel, Electromate, BG-Technologies) + OEM homepages | ~55% |
| PCB laser marking machine | **No** | Manufacturer product pages (Hanslaser, Hymson, HGLASER, ASYS) + 1 buying guide | ~70%+ |

**Overall pattern:** 6 of 8 money keywords have zero PROMATION visibility in the sample.
Where SERP consensus is measurable, the dominant winning format is either (a) a dedicated
manufacturer product/spec page with a comparison-ready spec table, or (b) for
"collaborative robot distributor," a page explicitly positioned as an authorized
distributor with support/territory trust signals. PROMATION has neither: its SKU pages
are thin marketing blurbs with no spec table/schema, and its cobot page never frames
itself as a "distributor."

## 3. Page-Type Mismatch Detection

| Target page | Classified as | SERP expects | Severity |
|---|---|---|---|
| `robotic-soldering-glance` | Hybrid (Service+Content) hub | Product/Category page w/ specs | HIGH |
| `9n393w-hot-air-soldering-robot` (and all SKU pages) | Hybrid/thin Product stub (no schema, no table) | Product Page w/ Product schema + spec table | CRITICAL |
| `pcb-handling` | Weak Category page (397 words, 0 H1) | Category/Collection page w/ filters, depth | HIGH |
| `transfer-conveyors` / conveyor SKU pages | Fragmented single-SKU pages, no consolidating hub | Single authoritative Category/Guide page | HIGH |
| `tm-robot-usa` / `techman-collaborative-robots` | Hybrid, duplicate, never says "distributor" | Distributor/Reseller page (trust + territory + support) | CRITICAL |
| `laser-marking-at-a-glance` / `panda-laser-marking` | Hybrid, keyword-stuffed meta, title mismatch (Panda vs laser marking) | Manufacturer Product Page | CRITICAL |

## 4. User Stories (from SERP signals)

1. **As a process/manufacturing engineer** comparing soldering robots on specs, I want a
   side-by-side spec table (axes, repeatability, payload, cycle time), because I must
   justify the purchase to my boss, but I'm blocked by **information gap**: PROMATION SKU
   pages have zero `<table>` elements or Product schema, while Fancort/TM Robotics/PentaLogix
   product pages show structured specs. *(Source: dominant SERP type = manufacturer product pages)*

2. **As procurement/a plant manager** seeking a US-based collaborative robot distributor
   with local support, I want proof of authorized-distributor status, territory, and service
   response time, because uptime/support risk drives my vendor choice, but I'm blocked by
   **trust gap**: PROMATION's cobot page never uses the word "distributor" and is duplicated
   across two URLs, diluting authority. *(Source: SERP dominated by NEFF Automation, Hartfiel,
   Electromate, BG-Technologies — all framed explicitly as distributors)*

3. **As an EMS/contract-manufacturing owner** researching ROI before buying laser marking
   or dispensing equipment, I want a clear, single-topic page with buying criteria and case
   studies, because I need to justify capex, but I'm blocked by **trust/clarity gap**:
   `panda-laser-marking` is titled "PANDA ROBOTICS USA" (no laser-marking topic signal) and
   `laser-marking-at-a-glance`'s meta description is a raw keyword-stuffing list, both eroding
   credibility versus competitor guide content. *(Source: heatsign "Comprehensive Guide to PCB
   Laser Etching & Marking Solutions" ranks; ASYS positions ROI/quality benefits)*

## 5. Gap Analysis — SXO Gap Score: 33/100 (separate from SEO Health Score)

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (0-15) | 4/15 | Hybrid hub pages compete against dedicated product/category/distributor pages across 7 of 8 keywords |
| Content Depth (0-15) | 5/15 | SKU pages 166-264 words; hub pages 115-663 words; zero spec tables |
| UX Signals (0-15) | 5/15 | 0 H1 on most product pages; generic "Contact Us" CTA only; no staged CTAs by funnel |
| Schema Markup (0-15) | 3/15 | Only sitewide Organization/LocalBusiness/WebSite; no Product, Offer, or FAQ schema anywhere |
| Media Richness (0-15) | 8/15 | Decent image counts (6-25/page); no video; PDF downloads present but not spec-table replacements |
| Authority Signals (0-15) | 6/15 | "8-time award winner," "certified IPC experts" claims present but no case studies, customer logos, or reviews found |
| Freshness (0-10) | 2/10 | No dateModified/datePublished schema anywhere; identical duplicate templates suggest low maintenance |
| **Total** | **33/100** | |

## 6. Persona Scores (0-100, 4 dimensions x 25 pts)

| Persona | Page scored | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Process Engineer (spec comparator) | `9n393w-hot-air-soldering-robot` | 14/25 | 10/25 | 12/25 | 14/25 | **50/100** | Needs Work |
| Procurement / Plant Manager (distributor seeker) | `tm-robot-usa` | 12/25 | 8/25 | 10/25 | 12/25 | **42/100** | Needs Work |
| EMS Owner (ROI researcher) | `panda-laser-marking` / `laser-marking-at-a-glance` | 10/25 | 8/25 | 10/25 | 10/25 | **38/100** | Critical Mismatch |

**Weakest persona:** EMS Owner (38/100). Top issue: title/topic mismatch and keyword-stuffed
meta destroy first-impression clarity and trust before content is even read.

### Systemic issues
- Clarity is the lowest dimension across all three personas (0 H1 tags, no spec tables, no
  scannable structure) — a single fix (add H1 + spec table template) lifts all personas.
- Trust is capped everywhere by absent case studies/customer proof despite strong award claims.

## 7. Priority Actions
1. Build a real Product schema + spec-table template for every SKU page (fixes CRITICAL
   mismatch for soldering/dispensing/screw-driving/laser-marking keywords).
2. De-duplicate `tm-robot-usa` vs `techman-collaborative-robots`; rewrite as an explicit
   "Authorized TechMan Cobot Distributor — USA" page with territory/support trust signals.
3. Fix `panda-laser-marking` title/topic mismatch and strip keyword-stuffed meta on
   `laser-marking-at-a-glance`.
4. Add H1 tags sitewide (currently 0 on most product pages) and dateModified schema for
   freshness signals.
5. Consolidate scattered PCB conveyor/handling SKU pages under one authoritative category
   hub to compete with Signode/AdoptSMT/Manncorp collection pages.

## 8. Limitations
- WebSearch (not DataForSEO) was used; exact SERP rank positions, PAA questions, ad copy,
  and AI Overview content could not be captured precisely — consensus % are estimates from
  visible organic results (7-9 per query), not verified rank-tracked data.
- Only a representative sample of pages was fetched/parsed (home + 12 category/SKU pages),
  not the full site (100+ URLs).
- Mobile rendering, page speed, and JS-dependent content were not assessed.
- No access to Search Console data (impressions/clicks/actual rank) to confirm real-world
  ranking positions.

## Cross-skill recommendations
- Missing Product/Offer schema → `/seo schema`
- E-E-A-T / case-study gaps → `/seo content`
- Thin SKU pages → `/seo page`
- Full technical crawl/indexation check → `/seo technical`
