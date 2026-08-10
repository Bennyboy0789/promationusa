# Local SEO Audit — PROMATION INC. USA (promationusa.com)
Audit date: 2026-08-08
Business: Hybrid (brick-and-mortar showroom/training lab + shipping HQ; also functions as SAB for Mexico/Canada/Europe)
Industry vertical: Home/Industrial Services & B2B Equipment Manufacturer/Distributor (electronics manufacturing automation equipment) — closest schema fit: `LocalBusiness` + `Organization`, arguably should also carry `Store`/`ProfessionalService` or industry-specific type; site is a Squarespace-built commerce/marketing site (see /store).

## LOCAL SEO SCORE: 33 / 100

| Dimension | Weight | Score (0-100) | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 35 | 8.75 |
| Reviews & Reputation | 20% | 30 | 6.0 |
| Local On-Page SEO | 20% | 25 | 5.0 |
| NAP Consistency & Citations | 15% | 40 | 6.0 |
| Local Schema Markup | 10% | 25 | 2.5 |
| Local Link & Authority Signals | 10% | 40 | 4.0 |
| **Total** | | | **32.25 ≈ 33** |

---

## 1. Business Type & Industry Detection
- **Type: Hybrid.** Physical address is displayed sitewide (footer, contact page), hours are posted (M–F 8AM–5PM CST), and the address is used as a real HQ/showroom — but there is **no Google Maps embed anywhere on the site**, no "get directions" link, and no visible NAP schema signaling brick-and-mortar to crawlers beyond plain text.
- Service-area language for Mexico, Canada, and Europe **does NOT actually exist as real content**. Every "Mexico"/"Canada"/"Europe" text match on Home, Contact, and What-We-Do pages traced back to a hidden Squarespace **phone-number country-code dropdown** (`{"name":"Mexico","code":"MX","phoneCode":"+52"}` etc.), not human-readable copy. There is zero dedicated content telling Google or users what PROMATION does for customers outside the US, no country/region landing pages, and no international shipping/support copy.
- Industry vertical: B2B industrial equipment (PCB handling, robotic soldering, laser marking, dispensing) — closest to "Home/Industrial Services + Manufacturer" hybrid. No industry-specific schema (e.g., no `Product`/`Store` schema on /store checked in depth) was found feeding the LocalBusiness block.

## 2. NAP Extraction & Consistency Audit

| Source | Name | Address | Phone | Email |
|---|---|---|---|---|
| Home footer (visible HTML) | PROMATION USA | "9900 58TH PL. STE.#100 KENOSHA, WI 53144" | 262.764.4832 | sales@promationusa.com |
| Contact page footer (visible HTML) | PROMATION USA | "9900 58th Pl. Ste.#100 Kenosha, WI 53144" | **1.262.764.4832** (footer) AND **262.764.4832** appear on same page | Sales@PROMATIONUSA.com |
| What-We-Do page (visible HTML) | PROMATION USA | "9900 58TH PL. STE.#100" | **262.764.4832** AND **(262) 764-4832** both present | — |
| JSON-LD `Organization` block (all pages) | "PROMATION INC.  USA" (double space) | "9900 58th Place  Suite#100\nKenosha, WI, 53144\nUnited States" (double space before "Suite") | **(262) 764-4832** | sales@promationusa.com |
| JSON-LD `LocalBusiness` block (all pages) | "PROMATION INC.  USA" | same as above | **MISSING — no telephone property at all** | — |

**Findings:**
- **4 distinct phone formats** appear across the live site and schema: `262.764.4832`, `1.262.764.4832`, `(262) 764-4832`, and one block with **no phone at all**. This is a textbook NAP-consistency failure that directly undermines citation matching and Google's confidence in the business identity.
- **Address string formatting is inconsistent** in punctuation/spacing (STE.# vs Ste.#100 vs Suite#100, double spaces, "PL." vs "Place") — cosmetically minor for humans but adds noise for structured-data parsers and citation-matching algorithms.
- Legal name rendered inconsistently: "PROMATION USA" (visible) vs "PROMATION INC.  USA" (schema, double space typo).

## 3. Third-Party Citation Check (Tier 1 + directories)
Search-engine scraping was partially blocked (Google/Bing returned CAPTCHA/error pages; direct Yelp/YellowPages/MapQuest fetches returned HTTP 403). Findings below are from DuckDuckGo HTML search-result snippets, which is a lower-confidence signal than a direct fetch — treat as directional, not fully verified.

| Directory | Status | Notes |
|---|---|---|
| **Yelp** | Listed — "Promation," Kenosha, WI | **Address shown as "9522 58th Pl, Kenosha, WI" — WRONG street number** (actual is 9900). This is a material NAP citation error on a Tier 1 directory and should be corrected/claimed immediately. Rating/review count not visible in snippet (could not verify due to 403 on direct fetch). |
| **BBB** | **Not found** for Kenosha, WI entity | Only an unrelated "Promation Systems Inc." (Minneapolis, MN, computer dealer) surfaced — different company. No BBB profile/accreditation confirmed for PROMATION USA. |
| **Yellow Pages** | Listed | yellowpages.com/kenosha-wi/mip/promation-usa-462140059 |
| **Superpages** | Listed | superpages.com/kenosha-wi/bpp/promation-usa-462140059 |
| **MapQuest** | Listed | mapquest.com/us/wisconsin/promation-usa-274375078 (content not independently verified — fetch returned empty) |
| **AllBiz** | Listed | Lists a named contact ("Gary Goldberg") and estimated revenue band — worth confirming this is still accurate/desired to have public |
| **Loc8NearMe, FindGLocal, Nextdoor** | Listed | Minor aggregators, not independently verified |
| **Thomasnet** | Could not verify | Direct fetch returned HTTP 403; given PROMATION is an industrial equipment supplier, Thomasnet is a high-value, industry-relevant citation/lead source and should be manually confirmed/claimed if not already present |
| **Google Business Profile** | Could not verify directly | Google search access blocked in this environment. Facebook page (323 likes, "19 were here") confirms real-world foot traffic/checkins consistent with a physical location, which is a strong proxy signal that a GBP listing likely exists, but star rating, category selection, Q&A, and Posts activity could not be confirmed. **Recommend manual verification of GBP primary category** — this is the #1 ranking factor per Whitespark 2026, and for a company like this it's easy to mis-categorize (e.g., generic "Corporate Office" instead of a more specific/relevant category). |

## 4. GBP Signals Detected on Site
- No Google Maps iframe/embed on Contact or any page (checked Home, Contact, What-We-Do).
- No "Get Directions" link.
- No review widget or aggregateRating schema pulling live GBP reviews.
- "5-Star" / "Award Winning" customer service language used as marketing copy on Contact page, but it is an unsubstantiated claim — no schema, no widget, no linked source.
- No GBP "posts" indicators, no Q&A embed, no photo-gallery tied to a place ID.
- **Net: essentially zero on-page GBP integration**, despite this being a real physical HQ with showroom/training lab — a significant missed opportunity.

## 5. LocalBusiness Schema Validation
Three JSON-LD blocks found (identical across Home/Contact/What-We-Do):
1. `WebSite` — fine, minimal.
2. `Organization` — has legalName, address (plain string, not `PostalAddress`), email, telephone `(262) 764-4832`, and `sameAs` (YouTube, Facebook, Instagram, LinkedIn) — good use of sameAs for entity disambiguation.
3. `LocalBusiness` — **critical issues**:
   - `address` is a **raw string**, not a structured `PostalAddress` object (missing `streetAddress`, `addressLocality`, `addressRegion`, `postalCode`, `addressCountry` as discrete properties) — reduces machine-readability and eligibility for rich results.
   - **No `telephone` property** on the LocalBusiness node at all (only Organization has one, and in yet another format).
   - **No `geo` coordinates** (no `GeoCoordinates`, let alone 5-decimal precision).
   - **No `url` property** on the LocalBusiness node.
   - **No `@id`**, so Organization and LocalBusiness nodes aren't explicitly linked/deduped as the same entity.
   - `openingHours` string is malformed: `"Mo 08:00-17:00, Tu 08:00-17:00, We 08:00-17:00, Th 08:00-17:00, Fr 08:00-17:00, , "` — trailing empty values; should use `openingHoursSpecification` array format and explicitly note Sat/Sun closed.
   - Generic `@type: LocalBusiness` used instead of a more specific/appropriate subtype (no industry-specific type such as `Store`, or a custom combination reflecting equipment distributor + showroom).
   - No `aggregateRating`, `priceRange`, or `image` object (raw CDN thumbnail URL used instead of an `ImageObject`).
   - No `areaServed` property despite claimed Mexico/Canada/Europe service — this is the schema-level fix that should pair with real page content.

## 6. Review Health Snapshot
- Could not directly pull live GBP star rating/count (search blocked).
- No `aggregateRating` in schema.
- No review widget embedded on-site.
- Facebook: 323 likes / 19 check-ins (from search snippet) — indicates some social proof but not translated into structured review signals.
- **Cannot assess review velocity** (the "18-day rule") without GBP API/manual access — flagged as a limitation. Recommend client pull this directly from their GBP dashboard.

## 7. Entity Confusion Risk — HIGH
Confirmed via direct fetch of promation.com:
- **"Promation"** — Oakville, Ontario, Canada (2767 Brighton Rd, Oakville, ON L6H 6J4). A robotics/automation **systems integrator** serving nuclear, automotive, life sciences, food & beverage, aerospace & defense — i.e., a genuinely adjacent industry (industrial automation/robotics) using the near-identical brand name "Promation."
- **"ProMation Engineering Inc"** (promationei.com) — a third, unrelated company supplying industrial electric actuators and motor-operated valves.
- All three entities share the "Promation" root name and overlapping industrial-automation positioning. This creates real risk of:
  - Google conflating or cross-linking knowledge panels/citations between PROMATION INC. USA (Kenosha, WI) and Promation (Oakville, ON), especially since PROMATION USA's own service-area claims include "Canada."
  - Customer/backlink/citation confusion (a directory or journalist citing "Promation" + "Canada/automation" could inadvertently link to or reference the wrong company).
  - Diluted brand-name search share in the SERPs and in AI-assistant answers (ChatGPT/AI Overviews), where entity disambiguation relies heavily on consistent NAP + schema `sameAs` + `areaServed`.
- **Mitigation not currently in place:** no `disambiguatingDescription`, no explicit "not affiliated with Promation (Oakville, ON) or ProMation Engineering" language, and no distinguishing full legal name usage ("PROMATION INC. USA") consistently reinforced in titles/meta/schema `name` fields (schema currently emits "PROMATION INC.  USA" with a typo-double-space, undermining exact-match consistency that would help disambiguation).

## 8. Local On-Page SEO / Location Page Quality
- Single generic Contact page serves as the only "location" page — no dedicated, unique location/service-area pages for Mexico, Canada, Europe (the #1 local-organic ranking factor per Whitespark 2026 is dedicated service pages, and this site has none beyond product pages).
- Title tags do not include geo-modifiers ("Kenosha," "Wisconsin," "USA") — Home title is just "PROMATION USA"; Contact title is "Contact Us Today! — PROMATION USA" (no geo-term); What-We-Do title is "About Us — PROMATION USA."
- Meta description on Contact page is a marketing CTA ("Experience our Award Winning 5-Star Customer Service...") with no address/geo content, missing an easy opportunity to reinforce location + service-area relevance.
- No embedded map to reinforce proximity/local relevance to crawlers or users.
- Not a multi-location business, so the doorway-page swap test / multi-location uniqueness check does not apply.

## 9. Limitations Disclaimer
- Live Google Business Profile data (primary category, star rating, review count/velocity, Posts activity, Q&A, photo count) could not be retrieved directly — Google Search and Google Maps fetches were blocked/CAPTCHA'd in this environment. **Recommend the client pull this data directly from their GBP dashboard or use DataForSEO/GBP API tooling for a follow-up pass.**
- Direct HTTP fetches to Yelp, YellowPages, MapQuest, and Thomasnet returned 403 Forbidden; citation data above is sourced from search-engine result snippets (lower confidence) rather than the citation pages themselves. **Recommend manual verification/claiming of each listing**, especially the Yelp address error.
- Proximity (55.2% of ranking-variance per Search Atlas ML study) is outside the scope of any on-page fix and not assessed here.
- No access to paid local-rank-tracking tools (e.g., local pack position by keyword/geo-grid) — this audit is based solely on on-page/schema/citation-snippet signals.
