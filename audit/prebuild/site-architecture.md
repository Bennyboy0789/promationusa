# PROMATION USA — Target Site Architecture (New Build)

Date: 2026-08-10. Status: pre-build blueprint, platform-agnostic.
Evidence base: `audit/details/competitive-product-lines.md` (CPL), `audit/details/competitive.md` (COMP), `audit/details/cluster.md` (CLU), `audit/details/sxo.md` (SXO), `audit/details/conversion.md` (CRO), `audit/ACTION-PLAN.md` (AP). Model inventory: `src/content/products.json` (existing rebuild extraction of the live site).

Every section cites its source doc. This file defines URLs, page types, targeting, linking rules, and build order — no page copy.

---

## 0. Architecture principles (derived from the audits)

1. **One hub per product line, dedicated product page per model** — the SERP-winning page type in 7 of 8 sampled money keywords is a manufacturer product/category page with a spec table (SXO §2–3). No more "at a glance" hybrid pages competing against real product pages.
2. **One URL per intent.** The old site's authority-splitting duplicates are consolidated at migration: 4 TechMan cobot pages → 1 hub (AP #2); 2 laser-marking pillar candidates → 1 hub + 1 product page (CLU §5-D); `-copy` slugs (`et8484-dispensing-robot-copy`, `et8593-dispensing-robot-copy`), `/et7383kc` pair, `/complimentary-services` pair → canonical slugs with 301s (AP #12, #24; CPL §4).
3. **Comparison, cost, and guide content are first-class sections** (`/compare/`, `/guides/`) — the three structural vacuums no competitor fills: comparison SERPs, pricing, schema (CPL §0 openings 1–3).
4. **RFQ is a global pattern, not a page you hunt for**: "Request a Quote" button in sticky header, RFQ block on every product/category page, `tel:` links sitewide, 5-field form (CRO §1–3; AP C1–C4).
5. **No tag archives, no thin shells.** News exists without `/news/tag/*` (101 thin pages, 29% of old sitemap — AP #6; CLU §7). Ad landing pages are noindex and sitemap-excluded (AP A1).
6. **Every historical URL that ranks or ever appeared as an Ads final URL gets a 301 to its new home** (AP A3; COMP §1 SERP note — the QUICK model pages currently on page 1 are the crown jewels of the migration map).

---

## 1. URL tree

### 1.1 Core & conversion

| URL | Page type | Notes | Source |
|---|---|---|---|
| `/` | Home | Leads with authority story: "Official North American QUICK & TechMan source · US stock · Kenosha, WI demo lab · TITAN-award PANDA line"; links to all 7 hubs | COMP §4, §6.5; AP K4–K5 |
| `/contact` | Contact + RFQ | Form titled "Request a Quote," 5 fields (Name, Company, Email, Phone, Message; model # optional), phone + form above the fold, response-time promise; global header CTA targets this | CRO §2, recs 1–2; AP C1–C2, C4 |
| `/pcb-trial` | Offer / proof-of-concept | "Send us your board" free PCB trial form — the buried plain-text offer turned into a linked conversion asset; also hosts the "send us your fluid, we'll film it dispensed" variant | CRO §7; CPL §4.6; AP K2 |
| `/demo-lab` | Trust + booking | Kenosha, WI demo/training lab page with embedded scheduler (virtual session + in-person demo booking) | COMP §4.1; CRO §10 rec 7; AP K5 |
| `/why-promation` | Authority page | US-stock/US-support authority page: official QUICK + TechMan distributor status, territory, service response, IPC-certified staff — the answer to Fancort's exclusivity stack and the Made-in-USA tariff attack | COMP §5.3, §6.5; AP K4 |
| `/about` | Trust | Company story, team, 20 years, service area (US/Mexico/Canada/Europe + `areaServed`) | COMP §4; AP #23 |
| `/awards` | Trust | Consolidates NPI 2020 + TITAN 2025 with named awards (replaces the unlabeled trophy photo) | AP #22; CRO §4 |
| `/careers` | Trust/HR | Jobs with dedicated mailto/upload form + JobPosting schema | CRO §9; AP #10 |
| `/store` | E-commerce hub | On-domain parts/consumables store (tips, belts, filters, feed tubes) — the only real transactional pricing in the competitive set; product reviews enabled, policies at checkout | COMP §4.5; CRO §5; AP #7, #11 |
| `/store/[part-slug]` | Product (purchasable) | Existing catalog migrates (`src/content/store.json`); descriptive titles replace raw part numbers | CRO §5 |
| `/news` | News index | Press releases + new editorial; **no tag archives** (5–8 curated topic filters max, noindex or nav-only); old `/events` content folds in as archived posts | AP #6, #29; CLU §7 |
| `/news/[post-slug]` | Article | Named authors + Person schema; dateModified signals | AP #25; SXO §1 |
| `/sitemap.xml`, `/404` | Technical | LPs and any thin filters excluded from sitemap | AP A1 |

### 1.2 The seven category hubs

Pattern: `/[category]` is a true category/collection page (intro, comparison-ready model table, FAQ block, RFQ block, links to every model page, guides, and comparisons in its cluster). Model pages live at `/[category]/[model-slug]` with H1, spec table, Product+Offer schema, PDF spec sheet (gated download), RFQ CTA top and bottom. (SXO §3, §7.1; AP #15, K1; CPL §0 opening 2.)

| Hub URL | Replaces (301 sources) | Source |
|---|---|---|
| `/robotic-soldering` | `/robotic-soldering-glance`, `/soldering-robot-central` (central becomes the hub's model-index section) | CLU §5-A; SXO §3 |
| `/pcb-handling` | `/pcb-handling` (rebuilt as real category page; conveyor SKUs consolidated under it) | SXO §7.5; CPL §1 |
| `/dispensing` | `/auto-dispensing-at-a-glance` | SXO §1; CPL §4 |
| `/screw-driving` | `/auto-screw-driving-at-a-glance` (page itself rebuilt as buyer's-guide pillar — see §1.5) | CPL §5 |
| `/laser-marking` | `/laser-marking-at-a-glance` + `/panda-laser-marking` + `/panda-robotics*` (consolidation of the cannibalizing pair; educational hub + PANDA product page as top spoke) | CLU §5-D; SXO §3; CPL §2 |
| `/cobots` | `/techman-collaborative-robots`, `/tm-robot-usa`, `/tm-robots-at-a-glance`, `/techman-usa-1` (four-way merge); page explicitly framed "Authorized TechMan Cobot Distributor — USA" | AP #2; SXO §7.2 |
| `/x-ray-inspection` | `/xray-at-a-glance` (SEAMARK USA) | products.json inventory |

### 1.3 Model pages under each hub — `/[category]/[model-slug]`

Inventory derives from `src/content/products.json` (the extracted live catalog), de-duplicated per AP #2/#12/#24. Representative slugs shown; full list = products.json minus the duplicates noted.

**`/robotic-soldering/…`** (~18 pages) — QUICK PRO models `quick-9544cj`, `quick-9733d`, `quick-9744cj`, `quick-9434`; specialty `9n393w-hot-air`, `9r393t-molten-drop`; series pages `eco-series`, `e-series`, `n-series`, `m-series`, `f-series`, `hot-bar`, `inline-custom` (incl. S100-P4/S100-T4 inline soldering robots, re-homed from the dispensing category where they're currently misfiled); `panda-soldering`; integration/safety `soldering-integration-kits`, `heated-nitrogen-kit`, `robot-safety-enclosures`; one `accessories` index (fume extraction, ionizing fans, solder pots — each cross-sold to `/store`). These pages already hold page-1 branded rankings and must 301 cleanly. (COMP §1 SERP note; CPL §3, §7.4)

**`/pcb-handling/…`** (~24 pages) — `magazine-line-loader`, `magazine-line-unloader`, `vertical-buffer-conveyor`, `transfer-conveyors`, `dual-lane-conveyors`, `flat-belt-conveyors`, `edge-belt` variants, `turning-stations`, `shuttle-gate`, `pcb-inverter-stations`, `inspection-conveyors`, `barcode-scanning-conveyor`, `vacuum-loader`, `destacker`, `wave-loading`, `wave-unloading`, `post-aoi-sorting`, `post-spi-sorting`, `post-aoi-sorting-buffer`, `accumulation-stations`, `lead-frame-handlers`, `slide-line-conveyors`, `workstations`, `large-platform-led`. Machine-level + modifier targeting is the winnable lane here. (CPL §1)

**`/dispensing/…`** (~13 pages) — ET8x series `et8253n`, `et8283`, `et8353n`, `et8383`, `et8384`, `et8393sf`, `et8483`, **`et8484`** (canonical page replacing the ranking `-copy` slug — 301 required), `et8493sf`, `et8583ya`, `et8593`, plus `qs-800` inline. Each ET page must be differentiated (currently 88–91% boilerplate). (CPL §4; AP #12)

**`/screw-driving/…`** (~13 pages) — `et72h3ka`, `et7383k`, `et7383kc` (pair de-duped), `et7483kxzc` (+ legacy `/7483kxz` 301), `et7583k`, `et7583kya`, `et7583kyac`, `et7683kya`, `sn7353k`, `sn7453ka`, `c100-inline`, `accessories`, `feeders-torque-monitoring`. VideoObject schema + transcripts pair the existing YouTube asset with these pages. (CPL §5; AP #24)

**`/laser-marking/…`** (2–3 pages) — `panda-laser-marking` rebuilt as a true product page (models, CO2/fiber/UV heads, cycle time, SMEMA/Hermes, 1D/2D/DPM marks — targeting "inline PCB laser marking machine"); optional `double-sided-laser-marking` feature/config page to claim that unowned term. Thinnest category today (4 confused pages); becomes the tightest. (CPL §2)

**`/cobots/…`** (~9 pages) — `tm5-700`, `tm5-900`, `tm12`, `tm14`, `tm16`, `tm20`, plus mobile-robot sub-line `tm-amr` (`amr-magazine-line-loader`, `amr-magazine-line-unloader` — cross-linked to `/pcb-handling`). (products.json; AP #2)

**`/x-ray-inspection/…`** (2–3 pages) — SEAMARK X-ray counting/inspection models incl. `xc-1000` component counter. (products.json; AP K1 names X-ray as the 7th hub)

### 1.4 Comparison & alternatives program — `/compare/`

The highest first-mover value in the entire audit: "[OEM] alternative" and "X vs Y" SERPs are effectively empty in all five researched categories (CPL §0 opening 1, §7.1). Build order below matches CPL §7.1 ①–⑥ plus the category-section named pages.

| URL | Target | Source |
|---|---|---|
| `/compare/soldering-robots` | Comparison hub capturing the listicle intent ictrobot currently owns | CPL §7.1-⑥ |
| `/compare/quick-vs-japan-unix` | "QUICK vs Japan Unix soldering robots" — Fancort has nothing to defend with | CPL §7.1-① |
| `/compare/japan-unix-alternative` | "Japan Unix alternative" | CPL §7.1-① |
| `/compare/quick-vs-apollo-seiko-j-cat` | "QUICK vs Apollo Seiko J-CAT" — timed to Apollo's ownership change | CPL §7.1-②, §3 |
| `/compare/quick-9434-vs-thermaltronics-tmt-r9800s` | Model-level vs page | CPL §7.1-③ |
| `/compare/quick-et8484-vs-fisnar-f4200n2` | Dispensing model vs page | CPL §7.1-④, §4.3 |
| `/compare/nordson-e-series-alternatives` | Alternatives page | CPL §7.1-④, §4.3 |
| `/compare/loctite-rb40-alternative` | Alternatives page (Henkel LOCTITE RB40) | CPL §4.3 |
| `/compare/panda-vs-asys-insignum` | Laser marking vs page | CPL §7.1-⑤, §2.5 |
| `/compare/hans-pcb100-alternative` | "Han's PCB100 alternative with US support" | CPL §2.5 |
| `/compare/janome-jr3000-alternative` | Screw-driving alternatives | CPL §5 keyword priorities |
| `/compare/benchtop-robot-vs-cobot-screwdriver` | Category-level decision comparison | CPL §5 |
| `/compare/nutek-alternative` | "Nutek loader equivalent / US support" — the unguarded shelf (dead US distributor) | CPL §1 |

### 1.5 Guides — `/guides/` (cost guides + buyer's-guide pillars + cluster spokes)

**Cost/pricing guides — one per category.** Zero credible answers exist in any category; only a distributor can publish price bands (CPL §0 opening 3, §7.2; inlinesmt proof in CPL §1).

| URL | Source |
|---|---|
| `/guides/soldering-robot-cost` | CPL §7.2; CLU §3 "soldering robot cost" |
| `/guides/dispensing-robot-cost` | CPL §4.2 |
| `/guides/screwdriving-robot-cost` | CPL §5, §7.2 |
| `/guides/pcb-handling-equipment-cost` | CPL §1 ("PCB magazine loader price") |
| `/guides/laser-marking-cost` | CLU §3 "laser marking cost vs inkjet cost" |
| `/guides/cobot-roi` | CLU §5-C3 "Cobot Safety & ROI for Small-Batch Assembly Lines" |

**Buyer's-guide pillars & cluster spokes** (hub-and-spoke architecture validated by SERP-overlap sampling in CLU §4–5):

| URL | Cluster | Source |
|---|---|---|
| `/guides/robotic-vs-hand-soldering-roi` | Soldering A1 (merged ROI + vs-hand gap) | CLU §5-A1; AP #16 |
| `/guides/how-to-choose-a-soldering-robot` | Soldering A2 | CLU §5-A2; AP #16 |
| `/guides/selective-soldering-defects` | Soldering A3 | CLU §5-A3 |
| `/guides/solder-tip-maintenance` | Soldering A4 (→ store tips cross-sell) | CLU §5-A4 |
| `/guides/benchtop-screwdriving-robots` | **Screw-driving pillar** — the rebuilt "at-a-glance" as a true buyer's guide: cost ranges, benchtop-vs-cobot-vs-custom matrix, throughput, M-size coverage, FAQ | CPL §5 content plan |
| `/guides/pcb-conveyor-buffer-guide` | PCB B1 | CLU §5-B1; AP #16 |
| `/guides/pcb-handling-equipment-types` | PCB B2 | CLU §5-B2 |
| `/guides/smt-line-layout` | PCB B3 (SERP-validated same cluster as B1) | CLU §4, §5-B3 |
| `/guides/pcb-magazine-loader-buying-guide` | PCB (modeled on chuxin-smt's ranking playbook) | CPL §1 |
| `/guides/fifo-vs-lifo-buffering` | PCB | CPL §1 |
| `/guides/smema-vs-hermes-vs-ipc-cfx` | PCB (incl. "when a line needs a flipper" section) | CPL §1 |
| `/guides/pcb-laser-marking-traceability` | **Laser traceability pillar**: IPC-1782, data-matrix serialization, laser vs labels — beat FlexLink before APEX 2026 | CPL §2.2; CLU §5-D3 |
| `/guides/fiber-vs-co2-vs-uv-laser-marking` | Laser D2 ("nobody answers it well") | CPL §2.3 |
| `/guides/laser-vs-inkjet-pcb-marking` | Laser D1 | CLU §5-D1 |
| `/guides/cobots-vs-industrial-robots` | Cobots C1 | CLU §5-C1 |
| `/guides/cobot-use-cases-electronics` | Cobots C2 | CLU §5-C2 |

### 1.6 Application pages (Phase 3) — `/dispensing/applications/[slug]`

One page per application, downmarket of GPD Global's 12-application playbook, each linking to the fitting ET model (CPL §4.4): `potting`, `form-in-place-gasketing`, `glue-dots`, `uv-adhesive`, `epoxy`, plus screw-driving application variants as data warrants. (~5–6 pages.)

### 1.7 Ad landing pages — `/lp/` (noindex, excluded from sitemap)

One per product line, purpose-built for the Google Ads relaunch: headline matching the ad query, spec table, "starting at" price anchor, RFQ form above the fold, `tel:` link, demo/PCB-trial CTA (AP A1). Model-level LPs added per the historical search-terms export (AP A2 decides priority).

`/lp/robotic-soldering` · `/lp/screw-driving` · `/lp/dispensing` · `/lp/pcb-handling` · `/lp/laser-marking` · `/lp/cobots` (+ up to ~6 model/query LPs from A2 data)

Every historical ad final URL 301s to its LP or nearest product page (AP A3). LPs never relaunch until the A4 gate passes (billing resolved, GA4 live, conversion actions verified).

---

## 2. Per-page-type targeting

Query families and example keywords are pulled verbatim from the research docs — none invented.

| Page type | Primary query family | Example keywords (source) |
|---|---|---|
| Home | Branded + distributor-entity | "promationusa"; "QUICK soldering robot distributor USA" (CPL §0.4; CLU §3 navigational) |
| Category hub | Non-branded category head + "supplier/distributor USA" modifier | "robotic soldering machine", "PCB handling equipment supplier USA", "benchtop dispensing robot", "PCB laser marking machine USA" (SXO §2; CPL §1, §2.4, §4) |
| Model page | Branded model + model-class transactional | "QUICK 9544CJ PRO", "QUICK ET8484 dispensing robot", "QUICK ET7383K", "SMT edge belt conveyor", "PCB inverter conveyor" (CPL §4 findings, §5, §1; CLU §3 navigational) |
| Comparison / alternatives | "[OEM] alternative", "X vs Y" | "Japan Unix alternative", "QUICK ET8484 vs Fisnar F4200N.2", "Nordson E Series alternatives", "PANDA vs ASYS INSIGNUM" (CPL §7.1) |
| Cost guide | "how much / cost / price" per category | "how much does a glue dispensing robot cost", "dispensing robot under $5,000", "PCB magazine loader price", "soldering robot cost" (CPL §4.2, §1; CLU §3) |
| Buyer's-guide pillar | Commercial-investigation "how to choose / vs / best" | "how to choose a soldering robot", "robotic soldering vs hand soldering", "benchtop screw driving robot", "cobot vs industrial robot electronics" (CLU §3, §5; CPL §5) |
| Informational spoke | Process/maintenance/standards | "solder tip maintenance guide", "FIFO vs LIFO", "SMEMA vs Hermes vs IPC-CFX", "IPC-1782 traceability", "fiber vs CO2 vs UV for PCB marking" (CLU §3; CPL §1, §2) |
| Application page | "[application] dispensing robot" | "potting", "form-in-place gasketing", "glue dots", "UV adhesive" for small manufacturers (CPL §4.4) |
| Authority page (`/why-promation`) | Distributor-trust queries | "collaborative robot distributor", "authorized TechMan distributor USA", "official QUICK source North America" (SXO §2, §4.2; COMP §6.5) |
| Local/trust (`/demo-lab`) | Regional supplier queries | "dispensing robot supplier Wisconsin/Milwaukee/Chicago" (CPL §4.7) |
| Store product | Part-number + consumable transactional | soldering tips, conveyor belts, filters — Product schema + Merchant Center feed (COMP §4.5; AP #11, #21) |
| LP (noindex) | Paid query match only — mirrors historical Ads search terms | per AP A2 export |

---

## 3. Internal-linking rules

1. **Hub → spoke (mandatory, bidirectional).** Each hub links every model page in its category plus its cluster's guides and comparisons; every guide/spoke links back to its pillar hub. Every spoke gets ≥3 inbound links (pillar + 2 sibling spokes); no orphans; no page is a spoke of two clusters. (CLU §6)
2. **Model → consumables (store).** Every equipment page links its consumables (tips, feed tubes, belts, filters) in `/store` — revenue loop currently missing. (CRO rec 11; AP #26)
3. **Comparison → model.** Every `/compare/` page links the PROMATION model(s) it features (primary CTA) and its parent hub; hubs link their comparison pages from a "Compare" block. Comparison pages inherit the internal-link seeds noted for the old `/news/tag/thermaltronics` and `apollo soldering` tags. (CPL §3)
4. **Guide → hub (+ model).** Cost guides and buyer's guides link their hub and the 2–3 fitting models; cross-cluster links only where CLU §6 flags them (A2↔C1 equipment-selection; B3↔A/D pillars as line stations).
5. **Every product/category/guide page → RFQ.** Primary-styled "Request a Quote" block top and bottom, `tel:` link, plus contextual secondary CTA: `/pcb-trial` on soldering/dispensing pages, `/demo-lab` on cobot/screw-driving pages, gated spec-sheet download on model pages. (CRO recs 1–4, 6–7; AP C1–C4, K2)
6. **Home → 7 hubs + `/why-promation` + `/store`.** `/why-promation` is linked from footer sitewide (distributor-trust signal on every page). (COMP §6.5)
7. **News → hubs/models.** Each post links the relevant hub or model; topic filters replace tag archives (5–8 curated, noindex). (CLU §7)
8. **LPs link out only to RFQ/tel** (no nav, noindex, not linked from any indexable page). (AP A1)

---

## 4. Priority build order

### Phase 1 — must exist at launch (protect what ranks + open the RFQ lane)

1. **301 migration map first**: all QUICK soldering/dispensing/screw-driving model URLs currently holding page-1 branded results (COMP §1 SERP note; CPL §4–5), every historical Ads final URL (AP A3), and all duplicate/`-copy`/legacy slugs to their canonicals (AP #12, #24).
2. All 7 category hubs + all ~82 model pages with H1, spec table, Product+Offer+BreadcrumbList schema, gated PDF spec sheets (SXO §7.1; AP #15, K1, #9, #11).
3. Conversion layer: `/contact` (5-field RFQ), sticky-header phone + RFQ button, `tel:` sitewide, RFQ block on every product/category page, `/pcb-trial`, `/demo-lab` with scheduler (CRO recs 1–7; AP C1–C4, K2).
4. `/why-promation`, `/about`, home with authority story (AP K4–K5; COMP §6.5).
5. `/store` migration with reviews enabled, policies, fixed titles (AP #7, #11, #21; CRO §5).
6. `/news` migration (17 posts, authors, no tag archives), `/careers`, sitemap, GA4 + GTM verified before anything else ships (AP #6, C3).

### Phase 2 — first 90 days

1. **Comparison program** in CPL §7.1 order: soldering set (①–③ + hub) → dispensing (④: ET8484 vs Fisnar, Nordson E Series alternatives, LOCTITE RB40) → laser (⑤: PANDA vs INSIGNUM, Han's PCB100) → screw-driving (Janome JR3000, benchtop-vs-cobot) → `nutek-alternative`.
2. **Cost guides ×6** (CPL §7.2).
3. **Screw-driving buyer's-guide pillar** `/guides/benchtop-screwdriving-robots` — the open content position with the existing video asset (CPL §7.5-①).
4. **Laser traceability cluster** (`pcb-laser-marking-traceability`, `fiber-vs-co2-vs-uv`, `laser-vs-inkjet`) — deadline ≈ APEX 2026, before FlexLink ships product pages (CPL §2.2, §7.5-②).
5. Soldering cluster spokes A1–A4 and PCB guides B1–B3 + loader/FIFO/SMEMA guides (AP #16; CLU §5; CPL §1).
6. `/lp/` pages ×6+ built from the A2 search-terms export; Ads relaunch only after the A4 gate.

### Phase 3 — following quarter

1. Dispensing application pages ×5–6 (CPL §4.4).
2. Testimonials/case-studies program: 4–6 with names/logos, placed on hubs and near RFQ blocks (AP K3; COMP §6.3; SXO §6 trust cap).
3. `/awards` page with award schema + link asks (Horizon Sales, globalsmt.net) (AP #22).
4. Remaining cobot spokes (C1–C3 if not shipped in P2), Midwest-local dispensing angle, directory/PR layer (Metoree, DirectIndustry, IQS, Thomasnet, ASSEMBLY Magazine pitch) (CPL §4.7, §7.6).

---

## 5. Page-count summary

| Section | URLs | Indexable | Phase | Source |
|---|---|---|---|---|
| Core & conversion (home, contact, pcb-trial, demo-lab, why-promation, about, awards, careers) | 8 | 8 | P1 (awards P3) | CRO; AP C1–C4, K2–K5, #22 |
| Category hubs | 7 | 7 | P1 | AP K1; SXO §3 |
| Model pages — robotic soldering | ~18 | ~18 | P1 | products.json; COMP §1; CPL §3 |
| Model pages — PCB handling | ~24 | ~24 | P1 | products.json; CPL §1 |
| Model pages — dispensing | ~13 | ~13 | P1 | products.json; CPL §4 |
| Model pages — screw driving | ~13 | ~13 | P1 | products.json; CPL §5 |
| Model pages — laser marking | 2–3 | 2–3 | P1 | CPL §2 |
| Model pages — cobots (incl. AMR) | ~9 | ~9 | P1 | products.json; AP #2 |
| Model pages — X-ray inspection | 2–3 | 2–3 | P1 | products.json; AP K1 |
| Comparison / alternatives (`/compare/`) | 13 | 13 | P2 | CPL §7.1, §1–§5 |
| Cost guides (`/guides/`) | 6 | 6 | P2 | CPL §7.2 |
| Buyer's guides & cluster spokes (`/guides/`) | 16 | 16 | P2 | CLU §5; CPL §1–§5; AP #16 |
| Application pages | 5–6 | 5–6 | P3 | CPL §4.4 |
| Ad landing pages (`/lp/`) | 6–12 | **0 (noindex)** | P2 | AP A1–A4 |
| Store (hub + parts catalog) | 1 + existing catalog (~50–80 parts) | all | P1 | store.json; COMP §4.5 |
| News (index + migrated posts; no tag archives) | 1 + ~17 | ~18 (0 tag pages vs 101 today) | P1 | AP #6; CLU §7 |
| **Total indexable (excl. store parts)** | | **≈ 160** | | |
| **Total incl. store catalog & LPs** | | ≈ 215–250 URLs, ≈ 210–240 indexable | | |

Old site baseline for contrast: 348 URLs with 101 thin tag archives and 4-way duplicates (CPL §6; AP #6). The new tree is smaller, with every URL owning exactly one intent.
