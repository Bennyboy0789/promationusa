# Page-Template Specs — New PROMATION USA Site

Date: 2026-08-10. Platform-agnostic build specs for the rebuild. Derived from: `details/sxo.md` (which page types win these SERPs), `details/conversion.md` (CTA/form requirements), `details/schema.md` (JSON-LD templates), `details/competitive-product-lines.md` (copy angles + content gaps). Every template below exists because the audit showed the page type either wins the SERP or converts the visitor — nothing here is decorative.

## Global rules (every page)

- **Head:** `<meta name="viewport" content="width=device-width, initial-scale=1">`; unique `<title>` ≤60 chars on the pattern `{Primary keyword} | PROMATION USA`; unique meta description 140–160 chars written as an answer, not a keyword list; self-referencing canonical; one `<h1>` that is real page-topic text — **never the logo alt**.
- **Header (sticky):** phone number as a `tel:` link + a "Request a Quote" button. These were absent sitewide and are the #1 conversion fix.
- **Schema baseline sitewide:** `Organization` (with logo, `sameAs`, `disambiguatingDescription` — four other "Promation" companies exist), `WebSite`, `BreadcrumbList` on every page below home. `https://schema.org` context (the old site used `http://`).
- **Trust strip (footer or band):** IPC-certified experts · Kenosha, WI training lab & US stock · Official QUICK & TechMan source · TITAN 2025 award. The counter to the Made-in-USA/tariff narrative — said explicitly, on every page.
- **Images:** descriptive alt text (no `IMG_4213.jpg`), explicit width/height, lazy-load below fold. No placeholder captions, ever.
- **No tag-archive pages.** News exists; `/news/tag/*` does not.

## 1. Category hub (×7: soldering, PCB handling, dispensing, screw driving, laser marking, cobots, X-ray)

Target intent: non-branded category queries ("robotic soldering machine", "PCB handling equipment supplier USA"). The audit found PROMATION loses every one of these to consolidated category pages.

- Above fold: H1 with category keyword + "US stock & support" qualifier; 2–3 sentence citable definition block (40–60 words, the `/robotic-soldering-glance` definition block was near-optimal — replicate that pattern); RFQ + "Book a demo at our Kenosha lab" CTAs.
- Body: product grid grouped by sub-type with spec-summary chips (not bare photos); comparison table of the models on the page; buying-guidance section with question-phrased H2s ("How much does a soldering robot cost?", "Which soldering robot for through-hole vs SMT?"); links to the category's buyer's guide, cost guide, and comparison pages.
- Schema: `ItemList` of products, `FAQPage` on the Q&A block.
- Copy rule: use the word **"distributor"** and name the brands ("authorized QUICK distributor — USA") — SXO analysis showed ranking pages literally say it.

## 2. Product / model page (~110 pages)

Target intent: model-number and machine-type transactional queries — the lane PROMATION already wins; protect and extend it.

- Above fold: H1 = model + machine type ("QUICK ET8484 Benchtop Dispensing Robot"); hero photo; 3–5 spec highlights; **RFQ form or button + tel: link visible without scrolling**.
- Body: full spec table (the single biggest page-type mismatch vs. everything that outranks the old pages); price band or "typical range" where possible (nobody in the competitive set publishes pricing — structural advantage); application photos; embedded video with transcript where one exists; per-model FAQ (3–5 questions); "works with" consumables cross-links into the store; related models + parent hub link.
- Schema: `Product` (brand = actual manufacturer: QUICK/PANDA/TechMan, not "PROMATION USA"), `Offer` or `AggregateOffer` where priced, `FAQPage`, `VideoObject` with transcript, `BreadcrumbList`.
- Copy rule: every model page unique — no shared boilerplate paragraphs (old ET8x83 pages were 88–91% identical and invisible). Kill the wrong-model copy errors (9733D/9433D) at migration.

## 3. Comparison page ("QUICK 9434 vs Thermaltronics TMT-R9800S", ~10 at launch+90d)

Target intent: "X vs Y" and brand-pair queries — verified empty SERPs in every category; first-mover asset.

- Structure: verdict-first summary ("choose X if… choose Y if…"), side-by-side spec table, 4–6 dimension sections (precision, throughput, support, price posture, consumables), honest treatment of the rival's strengths (credibility is the ranking asset), close with US-support differentiator + RFQ.
- Schema: `FAQPage` ("Is X better than Y for…"), `BreadcrumbList`. Consider `Product` for the PROMATION-carried model only.
- Copy rule: factual and sourced — these pages get AI-cited verbatim; overtly salesy comparisons don't.

## 4. Alternative page ("Japan Unix alternative", "Nordson E Series alternatives")

Target intent: switcher/churn queries (Apollo Seiko ownership change; Nutek's orphaned US install base needing parts/service).

- Structure: acknowledge the incumbent respectfully → 3–5 evaluation criteria → PROMATION option mapped to each → migration/trade-in path → US stock/service/demo close.
- Schema: `FAQPage`, `BreadcrumbList`.

## 5. Cost / pricing guide (one per category: "How much does a [X] robot cost?")

Target intent: cost queries with zero credible answers anywhere in the competitive set. Only a distributor can publish these.

- Structure: direct answer in the first 60 words with a real range; price-band table by machine class (entry benchtop / mid / inline); what moves the price (axes, vision, feeders, torque monitoring); TCO factors (consumables, service); "get an exact quote" RFQ close.
- Schema: `FAQPage`. Update annually — datestamp visible.

## 6. Buyer's-guide pillar (per category; screw driving first — the open position)

- Structure: decision framework (e.g., benchtop vs cobot vs custom cell matrix), throughput/spec selection tables, application examples, embedded videos + transcripts, FAQ block targeting People-Also-Ask, links to every model + comparison page in the category.
- Schema: `FAQPage`, `VideoObject`, `BreadcrumbList`.

## 7. Ad landing page (/lp/[category], noindex)

Per ACTION-PLAN A1. Not in sitemap, `noindex`, minimal nav (logo + phone only).

- Above fold: headline matching the ad's query verbatim; 3 proof points (US stock · Kenosha demo lab · IPC-certified support); **5-field max RFQ form** (name, company, email, phone, need — model number optional); tel: link.
- Body: one spec table or model trio, one video, 2–3 testimonials when available, single repeated CTA. Nothing else — no footer link farm.
- Measurement: GA4 event + Ads conversion on submit and tel-click, verified end-to-end before any spend (A4).

## 8. Trust / authority pages

- **/about + authority page:** "Official North American QUICK & TechMan Source" — mirror the exclusivity phrasing that earns Fancort verbatim AI citations; US stock, Kenosha lab, award story.
- **/awards:** NPI 2020 + TITAN 2025 consolidated (currently buried in dated press releases); `Award`-annotated Organization schema.
- **/demo-lab (Kenosha):** the proof-of-concept offer as a page with a booking CTA — "Submit your PCB for a free trial" exists today only as unlinked plain text.
- **/contact:** RFQ-titled 5-field form above the fold, tel:, map embed, NAP matching schema exactly (one canonical format everywhere).

## 9. News / article

- Named human author + date, `NewsArticle`/`Article` schema with `Person` author, no tag archives. Press releases allowed but the content program's center of gravity moves to guides/comparisons (the old blog was 100% press releases matching zero search intents).

## 10. Store product page (carried forward)

- Fix at migration: real titles (not bare part numbers), GTIN/MPN + true manufacturer brand, per-variant offers, availability as schema.org URL, `priceValidUntil`, shipping/returns fields, reviews enabled from day one, descriptive alts. Resolve the /store/quick title collision.
