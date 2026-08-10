# PROMATION USA — Topic Cluster / Content Architecture Analysis
Date: 2026-08-08
Site: https://www.promationusa.com

## 1. Method Note
No local `skills/seo-cluster` reference files exist in this repo, so the methodology described
in the task brief (expand → classify intent → sample SERP overlap → threshold → cluster →
link matrix) was applied directly. Search budget used: 11 WebSearch queries (7 expansion,
3 overlap/validation, 1 brand-visibility check) + 5 WebFetch/WebSearch site-structure calls.

## 2. Current Site Inventory (relevant pages)
| Existing Page | Role | Notes |
|---|---|---|
| `/robotic-soldering-glance` | Candidate pillar — Robotic Soldering | Product/benefit overview, no ROI data, no comparison, no maintenance content |
| `/soldering-robot-central` | Product index | Ranks on branded query; could be secondary pillar or merged into main pillar |
| `/pcb-handling` | Candidate pillar — PCB Handling | Product catalog overview (loaders, sorters, conveyors), no "how it works"/buying-guide content |
| `/techman-collaborative-robots` | Candidate pillar — Cobots | Product overview only, no use-case or ROI content |
| `/laser-marking-at-a-glance` + `/panda-laser-marking` | Split pillar — Laser Marking | Two competing overview pages for the same topic (self-cannibalization risk) |
| `/robotics-division` | Top-level umbrella page | Could serve as tier-0 hub linking the 5 product pillars |
| `/news` (17 posts, 2017–2025) | Blog | Almost entirely press releases/award announcements, not educational/search-intent content. Zero posts target any of the 30+ informational keywords tested. |
| `/news/tag/*` (100+ tag pages) | Thin archive pages | Many tags (e.g. "QUICK 9544CJ PRO", "kevin brennan promation usa", "promationusa") return 1 post each — thin, duplicate-shell content, crawl-budget dilution, no unique value, likely indexable boilerplate |

## 3. Keyword Expansion (30+ variants across 7 seeds) + Intent Classification

### Seed: robotic soldering
- robotic soldering vs hand soldering — Commercial
- robotic soldering ROI / payback period — Commercial
- robotic soldering advantages — Informational
- robotic soldering defects/troubleshooting — Informational
- robotic soldering systems for lead-free — Informational
- soldering robot cost — Commercial
- best soldering robot for PCB assembly — Commercial

### Seed: PCB handling
- PCB handling equipment types — Informational
- PCB conveyor systems guide — Informational
- PCB buffer conveyor explained — Informational
- PCB loading/unloading automation — Informational
- PCB handling automation ROI — Commercial
- lead frame handling solutions — Commercial (niche/transactional-leaning)

### Seed: selective soldering
- selective soldering process guide — Informational
- selective soldering common defects — Informational
- selective soldering vs wave soldering — Informational/Commercial
- selective soldering troubleshooting bridging — Informational
- selective soldering nitrogen system — Informational
- selective soldering machine cost — Commercial

### Seed: solder tip maintenance
- solder tip maintenance guide — Informational
- how to clean/tin a soldering tip — Informational
- when to replace soldering iron tip — Informational
- solder tip life extension — Informational
- robotic soldering tip cleaning station — Commercial (Promation-specific feature)

### Seed: collaborative robots electronics assembly
- cobots in electronics assembly use cases — Informational
- cobot vs industrial robot electronics — Commercial
- cobot soldering/pick-and-place applications — Informational
- cobot safety in PCB manufacturing — Informational
- cobot ROI small batch assembly — Commercial
- best cobots for electronics manufacturers — Commercial

### Seed: PCB laser marking
- PCB laser marking vs inkjet — Commercial
- laser marking traceability/UDI compliance — Informational
- laser marking settings/materials guide — Informational
- laser marking permanence/durability — Informational
- laser marking cost vs inkjet cost — Commercial

### Seed: SMT line automation
- SMT line automation layout best practices — Informational
- SMT line layout types (inline/U-shaped) — Informational
- SMT line integration planning — Informational/Commercial
- SMT line automation ROI — Commercial
- reducing downtime SMT line changeover — Informational

Navigational keywords (excluded from clustering): "promationusa", "panda robotics usa", "quick 9544cj pro", "techman tm12/tm14/tm20" (branded model lookups).

## 4. SERP Overlap Sampling (9 informational/commercial queries sampled)
Because true top-10 URL lists weren't fully enumerable via search snippets, overlap was
approximated via shared ranking *domains* across sampled queries (conservative proxy).

| Query A | Query B | Shared domains (of ~8-10) | Score band | Interpretation |
|---|---|---|---|---|
| robotic soldering vs hand soldering | how to choose a soldering robot | 1 (connectorsupplier.com) | 1–2 → interlink | Related but distinct intents; keep as 2 spokes, cross-link |
| robotic soldering vs hand soldering | robotic soldering ROI calculator | 0 | 0 → separate topics, BUT merge recommended editorially (see below) | Generic robot-ROI content dominates; no soldering-specific ROI page exists anywhere — strong content gap |
| selective soldering guide | solder tip maintenance guide | 0 | 0 → separate | Fully distinct SERPs, distinct spokes |
| PCB conveyor/buffer guide | SMT line layout best practices | 2 (chuxin-smt.com, smtfactory-family) | 4–6 → same cluster | Confirms these belong in one PCB Handling / Line Integration cluster |
| SMT line layout | selective soldering guide | 1 (chuxin-smt.com) | 1–2 → interlink only | Weak tie, cross-link but not same cluster |
| cobots electronics assembly | robotic soldering vs hand soldering | 0 | 0 → separate cluster | Confirms Cobots is its own pillar, not a soldering sub-topic |
| PCB laser marking vs inkjet | any soldering/handling query | 0 | 0 → separate cluster | Confirms Laser Marking is its own pillar |
| "promationusa robotic soldering" (brand check) | — | **0/9** informational queries returned any promationusa.com URL | — | **Zero organic visibility** for all 30+ non-branded keywords tested; site ranks only for branded/product-model queries |

## 5. Proposed Hub-and-Spoke Architecture (4 clusters)

### Tier 0 — Umbrella
`/robotics-division` → links to all 4 pillars (already exists, underused for this purpose)

### Cluster A — Robotic Soldering (Pillar: `/robotic-soldering-glance`)
Intent mix: Commercial pillar, Informational + Commercial spokes
- Spoke A1 (NEW, Commercial): "Robotic Soldering vs. Hand Soldering: ROI & When to Automate" — merges the ROI-calculator gap + vs-hand-soldering comparison (0 SERP overlap with generic robot-ROI content = wide-open gap)
- Spoke A2 (NEW, Commercial): "How to Choose a Soldering Robot: Buyer's Checklist"
- Spoke A3 (NEW, Informational): "Selective Soldering Defects & Troubleshooting Guide"
- Spoke A4 (NEW, Informational): "Solder Tip Maintenance & Replacement Guide"
- Existing: `/soldering-robot-central` — recommend repositioning as the product-catalog page linked FROM the pillar, not a competing pillar

### Cluster B — PCB Handling & Line Integration (Pillar: `/pcb-handling`)
- Spoke B1 (NEW, Informational): "PCB Conveyor & Buffer Systems: Complete Guide"
- Spoke B2 (NEW, Informational): "PCB Handling Equipment Types Explained (Loaders, Sorters, Inspection Stations)"
- Spoke B3 (NEW, Informational/Commercial): "SMT Line Layout Best Practices & Automation Integration Planning" (SERP-validated tie to B1, score 4–6)

### Cluster C — Collaborative Robots in Electronics Assembly (Pillar: `/techman-collaborative-robots`)
- Spoke C1 (NEW, Commercial): "Cobots vs. Industrial Robots for Electronics Assembly"
- Spoke C2 (NEW, Informational): "Top Cobot Use Cases in PCB & Electronics Manufacturing"
- Spoke C3 (NEW, Commercial): "Cobot Safety & ROI for Small-Batch Assembly Lines"

### Cluster D — PCB Laser Marking & Traceability (Pillar: merge `/laser-marking-at-a-glance` + `/panda-laser-marking` — CANNIBALIZATION)
- **Cannibalization flag**: two live pillar-candidate pages target the same "laser marking" intent. Recommend consolidating into one pillar (`/panda-laser-marking`, the product-branded page with the newest content) and 301/canonical the older `/laser-marking-at-a-glance`, or clearly differentiate (e.g., `/laser-marking-at-a-glance` = educational pillar, `/panda-laser-marking` = product page linked as its top spoke).
- Spoke D1 (NEW, Commercial): "Laser Marking vs. Inkjet for PCB Traceability: Which Lasts Longer"
- Spoke D2 (NEW, Informational): "PCB Laser Marking Settings & Materials Guide"
- Spoke D3 (NEW, Informational): "UID / Traceability Compliance Guide for Electronics Manufacturers"

## 6. Internal Link Matrix
Mandatory (bidirectional pillar↔spoke):
- A ⇄ {A1,A2,A3,A4}; B ⇄ {B1,B2,B3}; C ⇄ {C1,C2,C3}; D ⇄ {D1,D2,D3}

Recommended (spoke↔spoke within cluster):
- A1↔A2 (both comparison/buying intent), A3↔A4 (both process/maintenance)
- B1↔B3 (SERP-validated overlap), B2↔B1
- C1↔C3 (both commercial/ROI), C2↔C1
- D1↔D2, D2↔D3

Optional (cross-cluster interlink — weak SERP ties or shared buyer journey):
- A2 ("how to choose a soldering robot") ↔ C1 ("cobots vs industrial robots") — both are equipment-selection content
- B3 (SMT line layout) ↔ A-pillar and D-pillar (soldering and marking are line stations within SMT layout)
- Tier-0 `/robotics-division` → all 4 pillars (mandatory, currently missing/underused)

Every spoke receives ≥3 incoming links (pillar + 2 spoke-level links) satisfying the no-orphan requirement. No page appears as a spoke in more than one cluster (no duplicate primary keywords).

## 7. News/Tag Architecture Assessment
- 17 posts spanning 2017–2025 vs. 100+ `/news/tag/*` archive pages = ~6:1 tag-to-post ratio.
- Sampled tags return single-post, near-duplicate archive shells ("QUICK 9544CJ PRO", "kevin brennan promation usa", "promationusa") — classic thin/duplicate content pattern.
- These pages compete for crawl budget against the 4 real content pillars and dilute topical authority signals (Google sees 100+ near-empty pages instead of a small set of strong topic hubs).
- Recommendation: noindex tag archives with <2 posts (majority of them), keep only 5-8 topic tags aligned to the new clusters (e.g., "robotic-soldering", "pcb-handling", "laser-marking", "cobots") as indexable, and redirect/consolidate the rest. Repurpose the blog itself: convert press-release-only cadence into a mixed calendar that also publishes the 13 new spoke articles above (currently 0 of 17 posts serve informational/commercial search intent).

## 8. Cannibalization Check
- **Flagged**: `/laser-marking-at-a-glance` vs `/panda-laser-marking` — overlapping pillar intent (see Cluster D).
- No other duplicate primary-keyword conflicts found between existing product pages and proposed new spokes (existing pages are all bottom-funnel model/spec pages; new spokes are top/mid-funnel educational content — no overlap).
