# Competitive Analysis by Product Line — PROMATION USA

Date: 2026-08-10. Method: 6 parallel research passes — one per product line plus a cross-cutting digital benchmark — using ~35 live US SERP samples, direct fetches of competitor homepages/category pages, sitemap pulls, and raw-HTML JSON-LD inspection.

**Scope note:** This analysis covers the **client-named competitor list** (provided by PROMATION), organized by product line. It complements `competitive.md`, which profiled the *SERP-discovered* competitor set (Manncorp, Fancort, etc. — the distributors who actually win US searches). Read them as two layers: `competitive.md` = who wins the clicks; this file = the OEM landscape the client sees, reality-checked against live search data.

All six research tracks are complete, including the robotic soldering deep dive (section 3).

---

## 0. Executive summary

**The client's competitor list is mostly OEMs — and most of them barely rank in US search.** The live SERPs for PROMATION's categories are owned by a different cast: Chinese OEM content farms (I.C.T's smtfactory/smtmachine network, Vanstron, Hayawin), US/EU distributors with real content (Ellsworth, core-emt, inlinesmt, Manncorp), the cobot ecosystem (Universal Robots, Robotiq, OnRobot), and trade media (ASSEMBLY Magazine appears in almost every screwdriving SERP).

**Reality-check on the client's list:**

| Client claim | Verdict |
|---|---|
| YJ LINK (PCB handling + laser) | Real product competitor, **zero US organic presence** — Korean-only site, broken sitemap, no English SEO. Channel/trade-show threat, not an SEO threat. |
| NUTEK | Real competitor, but its exclusive Americas distributor's websites (nutek.com, nutekamericas.com) are **dead**. The US search shelf for Nutek-class queries is unguarded. |
| CTI Systems | Disambiguated to **ctisystems.net** (Goldston, NC — US SMT handling OEM). 67-page site, no schema, empty homepage title; appeared in **zero** sampled SERPs. Beatable on fundamentals. |
| FLEXLINK (PCB handling + laser) | The only client-named company doing real SEO (2,655 URLs, hreflang, ranks #2 for "PCB handling equipment"). But sells line-scale projects — doesn't compete on machine-level transactional queries. Laser marking is brand-new (2025 launch, news posts only — 12–18 month window). |
| HK Laser | HK America (hk-us.com, Bartlett IL — US arm of Korean HK Co.) centers on sheet-metal fiber/tube laser cutting; no PCB laser-marking products in its line, so minimal search overlap in this category. The PCB-marking SERP is led by ASYS and large laser OEMs (Han's Laser holds #1 for "PCB laser marking machine"). |
| Fisnar / Nordson / GPD (dispensing) | All real and all rank. Nordson EFD is unbeatable on head terms; GPD Global proves the winnable playbook (application pages + schema); Fisnar's parent **Ellsworth is in Germantown, WI — ~1 hour from Kenosha**. |
| Screw driving: the open field | **The biggest opportunity on the line card, and the read is directionally right.** Established players exist (Janome, ASG/Jergens, Sumake NA, Visumatic sell benchtop/turnkey systems; DEPRAG/WEBER/Robotiq/UR hold the broad SERPs), but none has claimed the benchtop *content* position — incumbents there are thin, dated, or low-trust. |

**The four structural openings that repeat across every category:**

1. **Comparison-SERP vacuum.** "[OEM] alternative" and "X vs Y" searches are effectively empty in all five categories. No OEM will name rivals; distributors haven't bothered. First-mover opportunity across the entire line card.
2. **Schema vacuum.** Of ~15 competitors inspected, only GPD Global runs deliberate Product/Offer/Review schema. Nordson ($2.7B) emits only BreadcrumbList. A full JSON-LD program puts PROMATION ahead of nearly the whole field.
3. **Pricing vacuum.** No manufacturer in any category publishes machine pricing. inlinesmt.com ranks in PCB handling largely *because* it lists prices ($3,250–$21,750). A distributor can publish price ranges; OEMs structurally can't.
4. **Distributor click-capture.** For every Asian OEM in the set, US clicks go to distributors and marketplaces (Fancort for Japan Unix, Murray Percival for Apollo Seiko, PCBASupplies for Thermaltronics, SMTnet/IBE for YJ LINK). PROMATION already proves it can play this game — it holds 7 of the top 10 results for "QUICK soldering robot distributor USA." The pattern just hasn't been extended to competitor-adjacent terms.

---

## 1. PCB Handling — YJ LINK, NUTEK, CTI Systems, FlexLink

### Competitor reality

| Competitor | US search reality |
|---|---|
| **YJ LINK** (yjlink.com, Daegu KR) | OEM with real breadth (loaders, conveyors, towers, NOVLUX marker) and a nominal LA office, but the site is Korean-first with a brand-only title, broken robots.txt/sitemap, and no stable English URLs. US channel = Repstronics, IBE SMT, Capital Equipment Solutions. English visibility exists only on third-party sites. **No JSON-LD.** |
| **NUTEK** (nutek-sg.com, Singapore) | 37-year OEM, 167-URL site that serves 0 bytes to non-browser agents. Exclusive Americas distributor (Nutek Americas, Longmont CO) has **no working website**; Nutek Europe (NL) and Danish reseller core-emt.com rank in *US* SERPs by default. |
| **CTI Systems** (ctisystems.net, Goldston NC) | US OEM, 35+ years, Made-in-USA story — but 67 URLs, ~3 blog posts, no schema, genericized titles ("Material Handling Solutions"), and invisible in all 7 sampled SERPs. Closest structural analog to PROMATION; beatable with ordinary on-page discipline. |
| **FlexLink** (flexlink.com, SE/Coesia) | The professional: 2,655 URLs, 9-locale hreflang, keyword-targeted PCB category page, ranks #2 for "PCB handling equipment," direct US subsidiary (Allentown PA). But enterprise line-scale focus — absent from machine-level transactional SERPs. |

### Who actually owns the US SERPs

Sampled: PCB magazine loader · SMT conveyor · PCB handling equipment · board handling automation · PCB loader unloader · PCB flipper · PCB buffer conveyor. Winners: **I.C.T's Chinese content network** (smtmachine.eu, smtfactory.com, smtmachineline.com), **Hayawin, Vanstron, S&M/chuxin-smt** (China), **core-emt** (DK), **Signode/Simplimatic** (#1 for the head term), **FlexLink** (#2), and US sellers **inlinesmt.com** (lists prices, add-to-cart), Manncorp, Anda US, PCB Unlimited. The client-named four are nearly absent.

### What PROMATION can win

- **Machine-level transactional terms + modifiers** the giants ignore: "PCB magazine loader price/USA/SMEMA," "SMT edge belt conveyor," "FIFO buffer SMT," "PCB inverter conveyor," "PCB handling equipment supplier USA."
- **Nutek-class and YJ-class brand-assist tails** ("Nutek loader equivalent/US support," "YJ Link magazine loader USA") — currently answered only by eBay, SMTnet classifieds, and EU resellers.
- **Guide content modeled on chuxin-smt's winners** (they rank in 4 of 7 SERPs with blog posts): loader buying guide, FIFO vs LIFO, when a line needs a flipper, SMEMA vs Hermes vs IPC-CFX — with the US-stock/support angle no Chinese site can claim.
- **Price transparency** — even "starting at $X" bands would differentiate from every OEM in the set (inlinesmt proves it ranks).
- Site basis already exists: the rebuild has 25 PCB-handling pages incl. the full loading/unloading/buffering/sorting taxonomy.

---

## 2. Laser Marking — YJ LINK, ASYS, FlexLink, HK Laser

### Competitor reality

- **ASYS Group** (asys-group.com, DE; Americas sub in Suwanee, GA) — **the real named-competitor benchmark.** INSIGNUM line (models 1000–6000), exact-match benefit-led titles, hub-and-spoke architecture, and the only client-named company ranking for "PCB laser marking machine" (2 results, top ~6). Weaknesses: no US-specific content, aggressive WAF blocks non-browser crawlers (a GEO/AI-citation liability), no comparison/educational layer.
- **Han's Laser** (us.hanslaser.net #1 for the head term; hanslaserus.com with 135 products + ~1,400 editorial URLs, San Jose CA + Katy TX) — not on the client's list, but the dominant organic player in this category and therefore analyzed alongside it. Chinese OEM trust gap in defense/medical accounts is the lever against them. No Product schema despite the content volume.
- **FlexLink** — entered PCB laser marking at IPC APEX 2025 (GENIUS 1-LV/1-LD). Currently only news posts + exhibition pages — **no product page in their sitemap**. One SEO-style article already ranks top-6 for "PCB traceability laser marking" on domain authority alone. Expect real product pages within 12–18 months; move before APEX 2026.
- **YJ LINK (NOVLUX)** — real hardware (dual-sided flip-station marking) but zero US web presence; see §1.
- **HK Laser** (HK America, hk-us.com / hk-global.com — Bartlett IL, US arm of Korean HK Co.; 350+ North American installs) — an established US laser operation, but its line is sheet-metal fiber/tube laser *cutting* (verified against the live product catalog Aug 2026); it carries no PCB laser-marking machines, so there is minimal keyword overlap with PANDA's marking line and no SEO counter-programming needed in this category.

Also active in this SERP: Hymson, HGLaser, HiSpeed, Vanstron, Flason (CN OEMs), HeatSign/Thunder Laser/NextPCB (content-led guides), Keyence/Trumpf/Trotec/Brady-MECCO (general marking giants on the broader term), CMS Laser, IPTE, core-emt.

### PROMATION baseline — the worst page in the comparison

`/panda-laser-marking` is titled "PANDA ROBOTICS USA" with a **robotic-soldering meta description**, no Product schema, no specs. It cannot rank for anything non-branded as-is. The rebuild has only 4 laser-marking pages — the thinnest category.

### What PROMATION can win

1. **"Inline PCB laser marking machine" / "inline laser marking SMT"** — currently owned by low-authority Chinese sites; no US-supported vendor owns it. Retitle and rebuild the PANDA page as a real product page (models, CO2/fiber/UV heads, cycle time, SMEMA/Hermes, 1D/2D/DPM marks).
2. **Traceability cluster** — IPC-1782 requirements, data-matrix serialization, laser vs labels. FlexLink proved one article ranks; core-emt holds two slots with modest pages.
3. **Laser-head selection content** — "fiber vs CO2 vs UV for PCB marking"; nobody answers it well (a generic HeatSign guide ranks).
4. **US-support differentiation vs Han's** — "PCB laser marking machine USA," ITAR-friendly framing for defense/medical EMS buyers.
5. **Comparisons**: "PANDA vs ASYS INSIGNUM," "Han's PCB100 alternative with US support," "double-sided PCB laser marking" (claim the term — YJ/FlexLink's flip-station feature, unclaimed in US search).
6. **Schema + GEO**: not one competitor emits Product schema; ASYS blocks bots and Han's content is machine-translated — clean citable spec content wins AI answers by default.

---

## 3. Robotic Soldering — Japan Unix, Apollo Seiko, Thermaltronics

### SERP ownership (7 US queries sampled, Aug 2026)

| Query | Top domains | PROMATION present? |
|---|---|---|
| soldering robot | electromaker.io, kurtzersa.com, pcbunlimited.com, **fancort.com**, **japanunix.com** | Yes — /robotic-soldering-glance ~#6-7 |
| robotic soldering system | standardbots.com, hakkousa.com, kurtzersa.com, fancort.com — **5 of 10 results are USPTO patent PDFs** | No |
| laser soldering robot | fancort.com #1, kuka.com, apolloseiko.com | **No — panda-usa.com absent on its flagship-adjacent term** |
| automated soldering machine | apolloseiko.com, ictrobot.com — **top 5 dominated by patent PDFs; only 2 commercial results** | No |
| soldering robot price | eBay, pcbunlimited, hakkousa, Alibaba | Yes — /robotic-soldering-glance ~#9 |
| desktop soldering robot | robotdigg, fancort.com ×2, apolloseiko (tag page), pcbunlimited | No |
| soldering robot for through-hole | eevblog forum, keyirobot, standardbots, tmrobotics, hakko.com (HU-200) | No |

**Readout:** Fancort appears in 4 of 7 SERPs (often twice) — the strongest commercial presence. Thermaltronics: **zero of 7**. PROMATION: 2 of 7, both via the single `/robotic-soldering-glance` page; panda-usa.com 0 of 7. Recurring third parties: pcbunlimited.com (4/7), the ictrobot "Top 10 Desktop Soldering Robots" listicle (4/7), Hakko (3/7). Critically, "robotic soldering system" and "automated soldering machine" SERPs are half-filled with USPTO patent PDFs — Google has almost no commercial pages to rank, so **one strong page can take top-3 on each**.

### Content-depth spot checks

- **Japan Unix EN category page**: keyword-stacked title that ranks, but a hub with **no on-page specs**, no authority proof (the "first soldering robot, 1985" claim is buried in a column article), and no US conversion path — a Japanese phone number and inquiry form only. US intent leaks to Fancort *by design*.
- **Apollo Seiko J-CAT LYRA**: **specs exist only as a JPG image + PDF** — invisible to search engines and AI. No application notes, no video, no quote CTA on the product page. Descriptive shells despite the site's JSON-LD.
- **Thermaltronics TMT-R9800S**: better on-page than expected (~850 words, real HTML spec table, TUV CE/ESD/RoHS badges, Curie Heat Technology story) — but one CTA (PDF download), no form, no schema, and it ranks only for its own model number.
- **Fancort robotic soldering hub**: wins on page count and conversion architecture ("Quote Now" throughout, **free sample-soldering application form**, US+Mexico phones, laser/desktop/software subpages) — but has **no spec tables and no install-base numbers**. They out-merchandise, not out-spec.
- **Authority-signal gap across the whole category: nobody publishes install-base numbers.** The first vendor to state "X,XXX systems installed in North America" owns an uncontested trust signal.

### How PROMATION defends and extends the soldering lead

**Defend (already owned — lock it):**
- The "QUICK 9434" SERP is a PROMATION monopoly: 3 promationusa.com URLs + 2 PROMATION YouTube videos in the top 8. **Replicate this sweep formula (product page + vision-variant page + 2 videos) for every QUICK/PANDA model number.** Add a "QUICK = ETNEO 9434" FAQ line — EU used-equipment sellers brand it ETNEO, and that naming confusion + used-vs-new intent is interceptable.
- **Brand-drift warning:** "PANDA laser soldering robot" still returns panda-usa.com #1, but PROMATION's newer results for the brand are all laser-*marking* pages. Build a dedicated PANDA laser-soldering product page before the brand term gets semantically re-anchored to marking.

**Extend (weak-owner category terms, priority order):**
1. **"robotic soldering system" / "automated soldering machine"** — patent-PDF-filled SERPs; one 1,500-word buyer's-guide page each with real HTML spec tables (the thing Apollo hides in JPGs and Japan Unix hides behind clicks) can take top-3.
2. **"soldering robot price"** — already ~#9 with a glance page against an eBay/Alibaba SERP; a transparent "$5K–$50K by configuration" pricing guide is the highest-intent quick win in the category.
3. **"soldering robot for through-hole"** — owned by a forum thread; QUICK's THT strength + an IPC J-STD hole-fill explainer takes it.
4. **"desktop soldering robot"** — Fancort holds two slots with spec-free pages; a spec-table comparison page beats them.

**Comparison pages (SERP-verified empty):**
- **"QUICK vs Japan Unix"** — zero comparison content exists anywhere; first real head-to-head wins by default.
- **"Apollo Seiko alternative"** — the SERP is 100% Apollo's own properties plus a Chinese tip-cartridge maker; no alternatives page exists. The ownership-change continuity concern is the copy hook.
- **"QUICK 9434 vs Thermaltronics TMT-R9800S"** — no comparison exists, and since Thermaltronics has zero generic SERP presence, PROMATION's page would become the de facto second result for TMT-R9800S research. Their own spec table hands us the comparison axes (CHT vs closed-loop 150W control; 6-axis dual-arm vision vs 9434+Vision at lower price; PDF-only page vs live US support).
- Secondary: "QUICK vs Hakko HU-200" (Hakko ranks on 3 of 7 category terms).

**Laser soldering positioning:** the "laser soldering robot" SERP is Fancort #1 (Japan Unix 45–130W diode units, 0.25–0.6mm spot), KUKA, and Apollo's L-CAT category — PANDA is absent. Build a PANDA laser-soldering hub with an on-page HTML spec table matching Fancort's exact spec vocabulary (wattage, spot size, camera) for line-by-line comparability; frame "designed & engineered in the USA" + Smart Factory ecosystem against Japan Unix's Japan-only support chain and Apollo's post-acquisition uncertainty; copy Fancort's proven converter (free sample-soldering application form — no OEM offers it on their own domain); and target "laser vs iron-tip soldering" educational queries where only KUKA and medical-research noise rank.

---

## 4. Robotic Dispensing — Fisnar, Nordson, GPD Global

### Competitor reality

| | Fisnar | Nordson EFD | GPD Global |
|---|---|---|---|
| Scale | **134 URLs** (tiny vs brand weight) | **11,838 URLs** (~2,368 EN; 352 EFD product pages) | **437 URLs** |
| HQ | Germantown, **WI** (owned by Ellsworth Adhesives — same town, ~1 hr from Kenosha) | East Providence, RI ($2.7B NASDAQ parent) | Grand Junction, CO (private, SMB) |
| SEO engine | Domain authority + exact product naming; thin category copy | Keyword-targeted titles, selector tool, hreflang; owns "automated fluid dispensing robot" family (4 top slots on some queries) | **12 dedicated application pages + 55 videos + full Product/Offer/Review schema** — outranks giants at 1/25th the size |
| Schema | WebSite/SearchAction only | **BreadcrumbList only** | Best in the entire competitive set |
| Conversion | Quote + catalog + **free video trial** (they film your fluid dispensing) | **Free application-lab test** — signature asset; Buy Online for consumables | Quote + case studies |
| Blind spot | No application long-tail | No pricing/cost content, no comparisons, blocks CCBot (AI-corpus gap) | Premium/regulated niches only — **entry-level benchtop segment unaddressed** |

Ellsworth.com (Fisnar's parent/channel) takes the transactional slots (#2 "benchtop dispensing robot") — the Fisnar ecosystem occupies two SERP positions per query. Also present: Techcon (via resellers), Henkel LOCTITE RB40, FANUC, Assembly Magazine (#1 for "benchtop dispensing robot" — editorial pages win here).

### PROMATION-specific findings

- On PROMATION's **own branded** "QUICK ET8484 dispensing robot" SERP: promationusa.com takes 6 slots but **Nordson takes 3** — and PROMATION's ranking URL is the **`/et8484-dispensing-robot-copy`** duplicate slug, not the canonical page.
- The ET8x83 series pages are 88–91% boilerplate (per content audit) — no per-model differentiation for Google to rank.

### Where PROMATION can realistically compete

**Don't spend on:** "dispensing robot," "fluid dispensing robot," "adhesive dispensing system" — Nordson holds 3–4 slots each.

1. **Own the QUICK brand lane completely**: fix the `-copy` slug/canonical mess, differentiate the ET model pages, add Product schema. Nobody contests "QUICK dispensing robot USA" — except Nordson is already intruding on the branded SERP.
2. **Cost/price content**: "benchtop dispensing robot price," "how much does a glue dispensing robot cost," "dispensing robot under $5,000" — unserved by every manufacturer and by Ellsworth.
3. **Comparisons manufacturers will never write**: "QUICK ET8484 vs Fisnar F4200N.2," "Nordson E Series alternatives," "LOCTITE RB40 alternative."
4. **Application pages downmarket of GPD**: potting, form-in-place gasketing, glue dots, UV adhesive, epoxy for small manufacturers — one page per application linking to the fitting ET model.
5. **Entry-level positioning**: "affordable/entry-level dispensing robot," "dispensing robot for small business" — no strong owner.
6. **Conversion parity, cheaply**: "send us your fluid, we'll film your part dispensed on a QUICK ET" — clones the Fisnar video-trial and Nordson lab-test hooks at distributor cost.
7. **Midwest local angle**: "dispensing robot supplier Wisconsin/Milwaukee/Chicago" — unclaimed, and Fisnar/Ellsworth are literally in-state.

---

## 5. Robotic Screw Driving — the biggest open opportunity

### The landscape

PROMATION's read on this category is directionally right: **nobody owns it with content.** Mapping who is actually in the market makes the position defensible rather than assumed.

- **The broad automated/robotic screwdriving SERPs are contested** by established players: DEPRAG (70+ yrs, AI partnerships, whitepapers), WEBER (US manufacturing since 1956, active blog), Visumatic (Lexington KY — ranks organically, UR+ certified), Robotiq #1 for "robotic screwdriving system," OnRobot, the Universal Robots marketplace on nearly every query, and Atlas Copco/Desoutter content hubs — with **ASSEMBLY Magazine in almost every SERP** as kingmaker. PROMATION has **no non-branded rankings across the 9 commercial queries sampled**, which is exactly the gap this plan fills.
- **The benchtop/desktop turnkey segment is genuinely open.** Competitors exist (Janome JR3000ST ranks for "desktop"; ASG AX-03/10/15 pre-engineered US tabletop cells; Sumake NA SDA series; Chinese importers and Amazon anchoring prices at $1k–6k) — but none has locked the SERP with strong content: Janome's pages are thin and dated, ASG's are buried inside a larger catalog, importers carry little trust. **The market has players; the content position is unclaimed.**
- PROMATION already owns QUICK brand+model queries (sweeps "QUICK ET7383K" etc.) and its YouTube video surfaces in branded web results — a real asset. View counts should be pulled from YouTube Studio (they aren't externally measurable). The site doesn't yet convert that video visibility into rankings: no embed strategy, no VideoObject schema, no transcript.

### The winnable position

**"Turnkey benchtop screwdriving robot under ~$15k, US stock, US support, applications lab."** Chinese importers can't offer the support; DEPRAG/WEBER won't play at the price point; Janome/ASG aren't investing in content.

Keyword priorities: benchtop/desktop screw driving robot & machine → cost/price questions (nobody credible answers them) → tabletop/3-axis/SCARA variants → torque-monitoring and feeder terms → comparison layer ("Janome JR3000 alternative," "benchtop robot vs cobot screwdriver") → defensive QUICK model sweeps.

Content plan: rebuild `/auto-screw-driving-at-a-glance` as a true buyer's-guide pillar (cost ranges, benchtop-vs-cobot-vs-custom decision matrix, throughput, M-size coverage, FAQ); de-duplicate model pages; VideoObject schema + transcripts pairing the YouTube asset; pitch ASSEMBLY Magazine; get listed on Metoree/DirectIndustry/IQS/Thomasnet (all rank, PROMATION absent from all); add a quote form and applications-testing landing page.

---

## 6. Cross-cutting benchmark table

| Competitor | Domain | Type | US presence | Measured scale | Blog | JSON-LD | Pricing |
|---|---|---|---|---|---|---|---|
| YJ LINK | yjlink.com | OEM (KR) | LA corp (no site) | no sitemap; small | min | ✗ | ✗ |
| NUTEK | nutek-sg.com | OEM (SG) | Longmont CO (dead sites) | 167 | weak | ✗ | ✗ |
| CTI Systems | ctisystems.net | OEM (US) | Goldston NC direct | 67 | ~3 posts | ✗ | ✗ |
| FlexLink | flexlink.com | OEM (SE/Coesia) | Allentown PA sub | 2,655 | ✓ | Org only | ✗ |
| Japan Unix | japanunix.com | OEM (JP) | none — Fancort | ~564 | ✓ strong | ✓ | ✗ |
| Apollo Seiko | apolloseiko.com | OEM (JP) | via Murray Percival | 116 | some | ✓ | ✗ |
| Thermaltronics | thermaltronics.com | OEM (US brand) | via PCBASupplies | no sitemap | ✗ | ✗ | ✗ |
| ASYS | asys-group.com | OEM (DE) | Suwanee GA sub | 132 EN | ✓ | ✓ | ✗ |
| Han's Laser (SERP leader, laser marking) | hanslaserus.com | OEM (CN) | San Jose + Katy TX | 135 products + ~1,400 articles | ✓ huge | Yoast defaults | ✗ |
| Fisnar | fisnar.com | OEM (US/Ellsworth) | Germantown WI | 134 | ✓ | minimal | via Ellsworth |
| Nordson EFD | nordson.com | OEM (US, $2.7B) | East Providence RI | 11,838 (2,368 EN) | ✓ extensive | Breadcrumb only | consumables only |
| GPD Global | gpd-global.com | OEM (US) | Grand Junction CO | 437 | ✓ | **✓ full program** | ✗ |
| *PROMATION (baseline)* | promationusa.com | Distributor | Kenosha WI | **348** | press releases only | platform default | parts store only |

**Digital-maturity tiers:**
- **Tier 1 — fight them for rankings:** Nordson EFD, Fisnar/Ellsworth, FlexLink, GPD Global, ASYS, Apollo Seiko, Han's Laser.
- **Tier 2 — OEMs whose distributors are the real SERP rivals:** Japan Unix→Fancort, YJ LINK→IBE/Repstronics/SMTnet, NUTEK→(vacuum), Thermaltronics→PCBASupplies/SW Systems, Apollo Seiko (partially)→Murray Percival.
- **Tier 3 — low search overlap:** CTI Systems, Thermaltronics, HK Laser (sheet-metal cutting focus — different SERPs than PROMATION's categories).

No evidence any of the 12 are PROMATION partners/suppliers (the lone "nutek" match on the site is "Danutek Hungary," a false positive).

---

## 7. Priority moves from this analysis

Ordered by leverage; items 1–3 overlap with `competitive.md` recommendations and reinforce them.

1. **Comparison/alternatives program (new, highest first-mover value).** Empty SERPs in every category. Build order: ① "QUICK vs Japan Unix soldering robots" + "Japan Unix alternative" (Fancort has nothing to defend with) ② "QUICK vs Apollo Seiko J-CAT" (+ ownership-change timing) ③ "QUICK 9434 vs Thermaltronics TMT-R9800S" ④ "QUICK ET8484 vs Fisnar F4200N.2" / "Nordson E Series alternatives" ⑤ "PANDA vs ASYS INSIGNUM" ⑥ soldering-robot comparison hub capturing the listicle intent ictrobot currently owns.
2. **Pricing/cost content program (new).** "How much does a [soldering|dispensing|screwdriving] robot cost" + price-band pages. Zero credible answers exist in any category; only a distributor can publish them.
3. **Schema sweep** (reinforces existing rec): Product+Offer, FAQPage, VideoObject, BreadcrumbList. Only GPD does this today across ~15 competitors inspected.
4. **Fix the self-inflicted branded-SERP leaks:** `-copy` slug ranking for ET8484; laser page with soldering meta; Nordson intruding on QUICK branded SERPs; QUICK model-page boilerplate.
5. **Category plays in priority order:** ① screw driving benchtop pillar (open content position, existing video asset) ② laser marking inline/traceability cluster (before FlexLink builds product pages, deadline ≈ APEX 2026) ③ PCB handling machine-level + guide content (Nutek vacuum, beatable incumbents) ④ dispensing applications downmarket of GPD ⑤ soldering defense (pending deep dive).
6. **Directory/PR layer:** Metoree, DirectIndustry, IQS, Thomasnet listings (rank everywhere, PROMATION absent); pitch ASSEMBLY Magazine (appears in nearly every screwdriving/dispensing SERP).
7. **Client follow-ups:** pull real YouTube view counts from YouTube Studio; confirm whether any YJ LINK/NUTEK channel relationship exists or is desired.
